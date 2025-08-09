package com.store.store.order.controller;

import com.store.store.order.DTO.WarehouseDTO;
import com.store.store.order.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouses")
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    @GetMapping
    public List<WarehouseDTO> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    @GetMapping("/{id}")
    public WarehouseDTO getWarehouseById(@PathVariable Long id) {
        return warehouseService.getWarehouseById(id);
    }

    @PostMapping
    public WarehouseDTO createWarehouse(@RequestBody WarehouseDTO warehouseDTO) {
        return warehouseService.createWarehouse(warehouseDTO);
    }

    @PutMapping("/{id}")
    public WarehouseDTO updateWarehouse(@PathVariable Long id, @RequestBody WarehouseDTO warehouseDTO) {
        return warehouseService.updateWarehouse(id, warehouseDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteWarehouse(@PathVariable Long id) {
        warehouseService.deleteWarehouse(id);
    }
}
