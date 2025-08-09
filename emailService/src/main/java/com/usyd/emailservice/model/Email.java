package com.usyd.emailservice.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Represents an Email entity with sender, receiver, and order status.
 * This model is used to manage email notifications throughout the order lifecycle.
 */
@Getter
@Setter
public class Email {
    private String sender;  // Email address of the sender
    private String receiver;// Email address of the receiver

    /**
     * Represents the status of the order process.
     * Possible values:
     * - CREATED: Order has been created.
     * - PAID: Order has been paid.
     * - PROCESSING: Order is being processed.
     * - PICKED_UP: Goods have been picked up from the warehouse.
     * - SHIPPED: Goods are on the way to the customer.
     * - DELIVERED: Goods have been delivered to the customer.
     * - CANCELLED: Order has been cancelled.
     */
    private String status;

    public Email(String sender, String receiver, String status) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }
}
