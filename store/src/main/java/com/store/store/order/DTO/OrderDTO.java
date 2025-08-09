package com.store.store.order.DTO;

import com.store.store.order.controller.OrderController;
import com.store.store.order.model.Warehouse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class OrderDTO {

    private Long orderId;
    private Long userId;
    private String status;
    private int number;
    private Long productId;
    private Optional<Double> total = Optional.empty();
    private Optional<List<OrderController.WarehouseUpdate>> warehouses = Optional.empty();
}
