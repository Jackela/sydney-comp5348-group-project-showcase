package com.store.store.order.service;

import com.store.store.order.DTO.DeliveryDTO;
import com.store.store.order.model.Delivery;
import com.store.store.order.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    public List<DeliveryDTO> getAllDeliveries() {
        return deliveryRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public DeliveryDTO getDeliveryById(Long deliveryId) {
        return deliveryRepository.findById(deliveryId).map(this::convertToDTO).orElse(null);
    }

    public DeliveryDTO createDelivery(DeliveryDTO deliveryDTO) {
        Delivery delivery = new Delivery();
        delivery.setOrderId(deliveryDTO.getOrderId());
        delivery.setStatus(deliveryDTO.getStatus());
        delivery.setTrackingNumber(deliveryDTO.getTrackingNumber());
        delivery = deliveryRepository.save(delivery);
        return convertToDTO(delivery);
    }

    public DeliveryDTO updateDelivery(Long deliveryId, DeliveryDTO deliveryDTO) {
        Delivery delivery = deliveryRepository.findById(deliveryId).orElse(null);
        if (delivery != null) {
            delivery.setOrderId(deliveryDTO.getOrderId());
            delivery.setStatus(deliveryDTO.getStatus());
            delivery.setTrackingNumber(deliveryDTO.getTrackingNumber());
            delivery = deliveryRepository.save(delivery);
            return convertToDTO(delivery);
        }
        return null;
    }

    public void deleteDelivery(Long deliveryId) {
        deliveryRepository.deleteById(deliveryId);
    }

    private DeliveryDTO convertToDTO(Delivery delivery) {
        DeliveryDTO deliveryDTO = new DeliveryDTO();
        deliveryDTO.setDeliveryId(delivery.getDeliveryId());
        deliveryDTO.setOrderId(delivery.getOrderId());
        deliveryDTO.setStatus(delivery.getStatus());
        deliveryDTO.setTrackingNumber(delivery.getTrackingNumber());
        return deliveryDTO;
    }
}
