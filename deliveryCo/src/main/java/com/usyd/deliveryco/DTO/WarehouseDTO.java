package com.usyd.deliveryco.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class WarehouseDTO {

    private Long warehouseId;
    private String name;
    private String location;
    private Map<Long, Integer> inventory;


}
