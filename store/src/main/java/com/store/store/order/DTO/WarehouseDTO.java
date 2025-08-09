package com.store.store.order.DTO;

import java.util.Map;

public class WarehouseDTO {

    private Long warehouseId;
    private String name;
    private String location;
    private Map<Long, Integer> inventory;

    // Getters and Setters
    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Map<Long, Integer> getInventory() {
        return inventory;
    }

    public void setInventory(Map<Long, Integer> inventory) {
        this.inventory = inventory;
    }
}
