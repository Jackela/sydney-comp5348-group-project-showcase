package com.usyd.deliveryco.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {

    private Long orderId;
    private Long userId;
    private String status;
    private int number;
    private Long productId;

}
