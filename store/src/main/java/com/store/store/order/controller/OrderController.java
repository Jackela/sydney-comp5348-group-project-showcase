package com.store.store.order.controller;

import com.store.store.error.ErrorException;
import com.store.store.order.DTO.OrderDTO;
import com.store.store.order.model.Order;
import com.store.store.order.repository.OrderRepository;
import com.store.store.order.service.OrderService;
import com.store.store.order.service.WarehouseService;
import com.bank.bank.service.BankServiceOuterClass;
import com.bank.bank.service.BankServiceGrpc;
import com.store.store.user.DTO.UserDTO;
import com.store.store.user.service.PaymentService;
import com.store.store.user.service.UserService;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.store.store.user.DTO.PaymentDTO;

import com.store.store.config.GrpcConfig;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private BankServiceGrpc.BankServiceBlockingStub bankServiceBlockingStub;

    @Autowired
    private OrderService orderService;

    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private PaymentService payService;


    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderDTO getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        double totalprice;
        //check enough money
        totalprice = paymentService.getUnitPrice(orderDTO.getProductId())*orderDTO.getNumber();
        if (totalprice>userService.getUserById(orderDTO.getUserId()).getBalance()) throw new ErrorException(409, "Insufficient balance");

        // find unit price
        double unitPrice = payService.getUnitPrice(orderDTO.getProductId());
        if (unitPrice == -1){
            throw new ErrorException(404, "Product Not Found");
        }

        //check enough product
        List<WarehouseUpdate> warehouses;
        String deliveryCoUrl = "http://localhost:8083/api/checkStock";
        warehouses = restTemplate.postForObject(deliveryCoUrl, orderDTO, List.class);
        if (warehouses!=null && !warehouses.isEmpty()) {
            logger.info("Received warehouses data: {}", warehouses);
        } else {
            throw new ErrorException(409, "Insufficient stock");
        }

        //pay money
        BankServiceOuterClass.DeductAmountRequest grpcRequest = BankServiceOuterClass.DeductAmountRequest.newBuilder()
                .setOrderId(-1)
                .setUserId(orderDTO.getUserId())
                .setAmount(totalprice)
                .build();

        BankServiceOuterClass.DeductAmountResponse grpcResponse = bankServiceBlockingStub.deductAmount(grpcRequest);
        if (!grpcResponse.getSuccess()) {
            throw new ErrorException(409, "Failed to deduct amount");
        }

        //update stock
        String updateCoUrl = "http://localhost:8083/api/updateStock";
        UpdateStockRequestBody requestBody = new UpdateStockRequestBody();
        requestBody.setProductId(orderDTO.getProductId());
        requestBody.setWarehouses(warehouses);
        boolean flag = Boolean.TRUE.equals(restTemplate.postForObject(updateCoUrl, requestBody, boolean.class));
        if (flag) {
            logger.info("Update stock");
        } else {
            //refund money
            BankServiceOuterClass.DeductAmountRequest grpcRequestRf = BankServiceOuterClass.DeductAmountRequest.newBuilder()
                    .setOrderId(-1)
                    .setUserId(orderDTO.getUserId())
                    .setAmount(totalprice)
                    .build();

            BankServiceOuterClass.DeductAmountResponse grpcResponseRf = bankServiceBlockingStub.deductAmount(grpcRequestRf);
            if (!grpcResponseRf.getSuccess()) {
                throw new ErrorException(409, "Failed to refund amount");
            }
            throw new ErrorException(409, "Insufficient stock when updating");
        }

        orderDTO.setStatus("PAID");
        OrderDTO newOrder = orderService.createOrder(orderDTO);
        newOrder.setTotal(Optional.of(unitPrice * newOrder.getNumber()));
        newOrder.setWarehouses(Optional.ofNullable(warehouses));

        //create payment
        PaymentDTO mpayment = new PaymentDTO();
        mpayment.setUserId(newOrder.getUserId());
        mpayment.setOrderId(newOrder.getOrderId());
        mpayment.setAmount(totalprice);
        paymentService.createPayment(mpayment);

        String deliveryCoUrl2 = "http://localhost:8083/api/delivery/start";
        restTemplate.postForObject(deliveryCoUrl2, newOrder, String.class);

        return newOrder;
    }

    @PostMapping("/updateStatus")
    public OrderDTO updateStatus(@RequestBody UpdateStatusRequestBody updateStatusRequestBody) {
        return orderService.updateOrderStatus(updateStatusRequestBody.getOrderID(),updateStatusRequestBody.getStatus());
    }

    @PostMapping("/returnMoney")
    public void returnMoney(@RequestBody Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        double returnMoney = paymentService.getUnitPrice(order.getProductId())*order.getNumber();
        userService.addBalance(order.getUserId(),returnMoney);
    }

    @PostMapping("/cancel")
    public void cancelOrder(@RequestBody CancelRequestBody cancelRequestBody) {
        String updateCoUrl = "http://localhost:8083/api/delivery/cancel";
        restTemplate.postForObject(updateCoUrl, cancelRequestBody.getOrderID(), void.class);

        // Refund the amount to the user
        Order order = orderRepository.findById(cancelRequestBody.getOrderID()).orElse(null);
        if (order.getStatus()!="PAID" && order.getStatus()!="CREATED"){
            logger.info("Product is under deliverying");
            return;
        }
        UserDTO user = userService.getUserById(cancelRequestBody.getUserID());
        if (user != null) {
            user.setBalance(user.getBalance() + cancelRequestBody.getAmount());
            userService.updateUser(user.getUserId(), user);
        } else {
            throw new RuntimeException("User not found");
        }

        // Update the inventory for each warehouse
        for (WarehouseUpdate warehouseUpdate : cancelRequestBody.getWarehouses()) {
            warehouseService.updateWarehouseInventory(warehouseUpdate.getWarehouseId(), cancelRequestBody.productId,warehouseUpdate.getQuantity());
        }

        logger.info("Order cancelled and inventory updated successfully");
    }

    @Getter
    @Setter
    public static class WarehouseUpdate {
        private Long warehouseId;
        private Integer quantity;
    }

    @Getter
    @Setter
    public static class UpdateStockRequestBody {
        private long productId;
        private List<WarehouseUpdate> warehouses;
    }

    @Getter
    @Setter
    public static class CancelRequestBody {
        private  long orderID;
        private long userID;
        private double amount;
        private long productId;
        private List<WarehouseUpdate> warehouses;
    }

    @Getter
    @Setter
    public static class UpdateStatusRequestBody {
        private long orderID;
        private String status;
    }


    @PutMapping("/{id}")
    public OrderDTO updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        return orderService.updateOrder(id, orderDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }
}
