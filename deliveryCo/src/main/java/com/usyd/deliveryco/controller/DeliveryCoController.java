package com.usyd.deliveryco.controller;

import com.usyd.deliveryco.model.DeliveryStatus;
import com.usyd.deliveryco.model.Order;
import lombok.Getter;
import lombok.Setter;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.web.client.RestTemplate;

import org.springframework.amqp.core.Queue;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryCoController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private Queue myQueue;

    private List<Long> cancelList = new CopyOnWriteArrayList<>();

    private final ExecutorService executorService = Executors.newFixedThreadPool(10);
    private final Random random = new Random();

    private static final String QUEUE_NAME = "orderStatusQueue";

    @PostMapping("/start")
    public String startDelivery(@RequestBody Order order) {

        // 异步模拟配送流程
        executorService.submit(() -> deliveryProcess(order));
        return "Delivery process started for Order ID: " + order.getOrderId();
    }

    private void deliveryProcess(Order order) {
        try {
            Thread.sleep(5000);
            if (cancelList.contains(order.getOrderId())) {
                System.out.println("Package is cancelled");
                sendMessage(order.getOrderId() + ":CANCELLED:" + order.getUserId());
                changeStatus(order.getOrderId(),"CANCELLED");
                return;
            }

            // 模拟接收配送请求
            updateStatus(order, DeliveryStatus.REQUEST_RECEIVED);
            sendMessage(order.getOrderId() + ":REQUEST_RECEIVED:" + order.getUserId());
            changeStatus(order.getOrderId(),"REQUEST_RECEIVED");
            if (cancelList.contains(order.getOrderId())) {
                System.out.println("Package can not be canceled and money is returned");
            }

            // 模拟5秒后的状态更新
            Thread.sleep(5000);

            if (random.nextDouble() > 0.05) {
                updateStatus(order, DeliveryStatus.PICKED_UP);
                sendMessage(order.getOrderId() + ":PICKED_UP:" + order.getUserId());
                changeStatus(order.getOrderId(),"PICKED_UP");
            } else {
                changeStatus(order.getOrderId(),"LOST");
                sendMessage(order.getOrderId() + ":LOST:" + order.getUserId());
                returnMoney(order.getOrderId());
                System.out.println("Package lost at PICKED_UP stage and money is returned.");
                return;
            }

            // 模拟5秒后的状态更新
            Thread.sleep(5000);
            if (random.nextDouble() > 0.05) {
                changeStatus(order.getOrderId(),"ON_THE_WAY");
                sendMessage(order.getOrderId() + ":ON_THE_WAY:" + order.getUserId());
                updateStatus(order, DeliveryStatus.ON_THE_WAY);
            } else {
                changeStatus(order.getOrderId(),"LOST");
                sendMessage(order.getOrderId() + ":LOST:" + order.getUserId());
                returnMoney(order.getOrderId());
                System.out.println("Package lost at ON_THE_WAY stage and money is returned.");
                return;
            }

            // 模拟5秒后的状态更新
            Thread.sleep(5000);
            if (random.nextDouble() > 0.05) {
                changeStatus(order.getOrderId(),"DELIVERED");
                sendMessage(order.getOrderId() + ":DELIVERED:" + order.getUserId());
                updateStatus(order, DeliveryStatus.DELIVERED);
            } else {
                changeStatus(order.getOrderId(),"LOST");
                sendMessage(order.getOrderId() + ":LOST:" + order.getUserId());
                returnMoney(order.getOrderId());
                System.out.println("Package lost at DELIVERED stage and money is returned.");
            }

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/cancel")
    public void cancel(@RequestBody long orderid) {
        cancelList.add(orderid);
        String updateCoUrl = "http://localhost:8083/api/updateStock";
        return;
    }

    private void updateStatus(Order order, DeliveryStatus status) {
        order.setStatus(status.name());
        System.out.println("Order ID: " + order.getOrderId() + " - Status: " + status);
    }

    @Getter
    @Setter
    public static class UpdateStatusRequestBody {
        private long orderID;
        private String status;
    }

    private void changeStatus(Long id,String status){
        String updateCoUrl = "http://localhost:8080/orders/updateStatus";
        UpdateStatusRequestBody updateStatusRequestBody = new UpdateStatusRequestBody();
        updateStatusRequestBody.setOrderID(id);
        updateStatusRequestBody.setStatus(status);
        restTemplate.postForObject(updateCoUrl, updateStatusRequestBody, void.class);
    }

    private void returnMoney(Long id){
        String updateCoUrl = "http://localhost:8080/orders/returnMoney";
        restTemplate.postForObject(updateCoUrl, id, void.class);
    }

    public void sendMessage(String message) {
        rabbitTemplate.convertAndSend(myQueue.getName(), message);
    }

}
