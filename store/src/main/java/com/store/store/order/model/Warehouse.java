package com.store.store.order.model;

import jakarta.persistence.*;
import java.util.Map;

@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @ElementCollection
    @CollectionTable(name = "warehouse_inventory", joinColumns = @JoinColumn(name = "warehouse_id"))
    @MapKeyColumn(name = "product_id")
    @Column(name = "quantity")
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
