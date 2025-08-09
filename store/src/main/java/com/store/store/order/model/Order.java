package com.store.store.order.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "orders")
@Entity
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderid")
    private Long orderId;

    @Column(name = "userid")
    private Long userId;

    @Column(name = "status")
    private String status;

    @Column(name = "number")
    private int number;

    @Column(name = "productid")
    private Long productId;

}
