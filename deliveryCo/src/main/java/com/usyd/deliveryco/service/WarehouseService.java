package com.usyd.deliveryco.service;

import com.usyd.deliveryco.DTO.WarehouseDTO;
import com.usyd.deliveryco.model.Warehouse;
import com.usyd.deliveryco.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import java.util.Map;

@Service
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<WarehouseDTO> getAllWarehouses() {
        return warehouseRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public WarehouseDTO getWarehouseById(Long warehouseId) {
        return warehouseRepository.findById(warehouseId).map(this::convertToDTO).orElse(null);
    }

    public WarehouseDTO createWarehouse(WarehouseDTO warehouseDTO) {
        Warehouse warehouse = new Warehouse();
        warehouse.setName(warehouseDTO.getName());
        warehouse.setLocation(warehouseDTO.getLocation());
        warehouse.setInventory(warehouseDTO.getInventory());
        warehouse = warehouseRepository.save(warehouse);
        return convertToDTO(warehouse);
    }

    public WarehouseDTO updateWarehouse(Long warehouseId, WarehouseDTO warehouseDTO) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElse(null);
        if (warehouse != null) {
            warehouse.setName(warehouseDTO.getName());
            warehouse.setLocation(warehouseDTO.getLocation());
            warehouse.setInventory(warehouseDTO.getInventory());
            warehouse = warehouseRepository.save(warehouse);
            return convertToDTO(warehouse);
        }
        return null;
    }

    public void deleteWarehouse(Long warehouseId) {
        warehouseRepository.deleteById(warehouseId);
    }

    public void updateWarehouseInventory(Long warehouseId, Long productId, int quantity) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElse(null);
        if (warehouse != null) {
            Map<Long, Integer> inventory = warehouse.getInventory();
            if (inventory.containsKey(productId)) {
                int currentStock = inventory.get(productId);
                int newStock = currentStock - quantity;
                if (newStock < 0) {
                    throw new IllegalArgumentException("Insufficient stock for product ID: " + productId + " in warehouse ID: " + warehouseId);
                }
                inventory.put(productId, newStock);
                warehouse.setInventory(inventory);
                warehouseRepository.save(warehouse);
            } else {
                throw new IllegalArgumentException("Product ID: " + productId + " not found in warehouse ID: " + warehouseId);
            }
        } else {
            throw new IllegalArgumentException("Warehouse ID: " + warehouseId + " not found");
        }
    }

    private WarehouseDTO convertToDTO(Warehouse warehouse) {
        WarehouseDTO warehouseDTO = new WarehouseDTO();
        warehouseDTO.setWarehouseId(warehouse.getWarehouseId());
        warehouseDTO.setName(warehouse.getName());
        warehouseDTO.setLocation(warehouse.getLocation());
        warehouseDTO.setInventory(warehouse.getInventory());
        return warehouseDTO;
    }
}
