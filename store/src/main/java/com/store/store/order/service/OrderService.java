package com.store.store.order.service;

import com.store.store.order.DTO.OrderDTO;
import com.store.store.order.model.Order;
import com.store.store.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long orderId) {
        return orderRepository.findById(orderId).map(this::convertToDTO).orElse(null);
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setUserId(orderDTO.getUserId());
        order.setStatus(orderDTO.getStatus());
        order.setNumber(orderDTO.getNumber());
        order.setProductId(orderDTO.getProductId());
        order = orderRepository.save(order);
        return convertToDTO(order);
    }

    public OrderDTO updateOrder(Long orderId, OrderDTO orderDTO) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setUserId(orderDTO.getUserId());
            order.setStatus(orderDTO.getStatus());
            order.setNumber(orderDTO.getNumber());
            order.setProductId(orderDTO.getProductId());
            order = orderRepository.save(order);
            return convertToDTO(order);
        }
        return null;
    }

    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            order = orderRepository.save(order);
            return convertToDTO(order);
        }
        return null;
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getOrderId());
        orderDTO.setUserId(order.getUserId());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setProductId(order.getProductId());
        orderDTO.setNumber(order.getNumber());
        return orderDTO;
    }
}
