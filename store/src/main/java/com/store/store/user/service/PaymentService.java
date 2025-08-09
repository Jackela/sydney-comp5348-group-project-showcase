package com.store.store.user.service;

import com.store.store.order.DTO.ProductDTO;
import com.store.store.order.service.ProductService;
import com.store.store.order.service.WarehouseService;
import com.store.store.user.DTO.PaymentDTO;
import com.store.store.order.DTO.WarehouseDTO;
import com.store.store.user.model.Payment;
import com.store.store.user.repository.PaymentRepository;
import com.store.store.user.model.User;
import com.store.store.user.repository.UserRepository;
import com.store.store.order.model.Order;
import com.store.store.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.AbstractMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WarehouseService warehouseService;
    @Autowired
    private ProductService productService;

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public PaymentDTO getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId).map(this::convertToDTO).orElse(null);
    }

    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        User user = userRepository.findById(paymentDTO.getUserId()).orElse(null);
        Order order = orderRepository.findById(paymentDTO.getOrderId()).orElse(null);
        if (user != null && order != null) {
            payment.setUserId(user.getUserId());
            payment.setOrderId(order.getOrderId());
            payment.setAmount(paymentDTO.getAmount());
            payment = paymentRepository.save(payment);
            return convertToDTO(payment);
        }
        return null;
    }

    public PaymentDTO updatePayment(Long paymentId, PaymentDTO paymentDTO) {
        Payment payment = paymentRepository.findById(paymentId).orElse(null);
        if (payment != null) {
            User user = userRepository.findById(paymentDTO.getUserId()).orElse(null);
            Order order = orderRepository.findById(paymentDTO.getOrderId()).orElse(null);
            if (user != null && order != null) {
                payment.setUserId(user.getUserId());
                payment.setOrderId(order.getOrderId());
                payment.setAmount(paymentDTO.getAmount());
                payment = paymentRepository.save(payment);
                return convertToDTO(payment);
            }
        }
        return null;
    }

    public void deletePayment(Long paymentId) {
        paymentRepository.deleteById(paymentId);
    }

    private PaymentDTO convertToDTO(Payment payment) {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setPaymentId(payment.getPaymentId());
        paymentDTO.setUserId(payment.getUserId());
        paymentDTO.setOrderId(payment.getOrderId());
        paymentDTO.setAmount(payment.getAmount());
        return paymentDTO;
    }

    public double getUnitPrice(Long productId){
        List<ProductDTO> allProducts = productService.getAllProducts();

        for (ProductDTO product : allProducts) {
            if (product.getProductId().equals(productId)) return product.getPrice();
        }
        return -1;
    }
}
