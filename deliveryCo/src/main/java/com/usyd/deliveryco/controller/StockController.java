package com.usyd.deliveryco.controller;

import com.usyd.deliveryco.DTO.OrderDTO;
import com.usyd.deliveryco.DTO.WarehouseDTO;
import com.usyd.deliveryco.service.WarehouseService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class StockController {
    @Autowired
    private WarehouseService warehouseService;

    @PostMapping("/checkStock")
    public List<Map.Entry<Long, Integer>> checkStock(@RequestBody OrderDTO orderDTO) {
        int hasfind = 0;
        int enough = 0;
        List<Map.Entry<Long, Integer>> warehouses = new ArrayList<>();
        int number = orderDTO.getNumber();
        long productId = orderDTO.getProductId();

        List<WarehouseDTO> allWarehouses = warehouseService.getAllWarehouses();

        for (WarehouseDTO warehouse : allWarehouses) {
            Integer availableStock = warehouse.getInventory().get(productId);
            if (availableStock == null) {
                continue;
            }
            if (availableStock + hasfind < number){
                hasfind = hasfind+availableStock;
                warehouses.add(new AbstractMap.SimpleEntry<>(warehouse.getWarehouseId(), availableStock));
                continue;
            }
            if (availableStock + hasfind >= number) {
                warehouses.add(new AbstractMap.SimpleEntry<>(warehouse.getWarehouseId(), number - hasfind));
                enough =1;
                break;
            }
        }
        if (enough == 0) return null;
        else return warehouses;
    }

    @PostMapping("/updateStock")
    public boolean updateStock(@RequestBody UpdateStockRequestBody request) {
        List<WarehouseDTO> allWarehouses = warehouseService.getAllWarehouses();

        for (WarehouseDTO warehouse : allWarehouses) {
            for (Map.Entry<Long, Integer> updateWarehouse : request.getWarehouses()) {
                if (Objects.equals(warehouse.getWarehouseId(), updateWarehouse.getKey())) {
                    try {
                        warehouseService.updateWarehouseInventory(warehouse.getWarehouseId(), request.getProductId(), updateWarehouse.getValue());
                    } catch (IllegalArgumentException e) {
                        System.err.println(e.getMessage());
                        return false;
                    }
                }
            }
        }
        return true;
    }

    @Getter
    @Setter
    public static class UpdateStockRequestBody {
        private long productId;
        private List<Map.Entry<Long, Integer>> warehouses;
    }

}
