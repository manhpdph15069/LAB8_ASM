package poly.store.service;

import com.fasterxml.jackson.databind.JsonNode;
import poly.store.entity.Order;

import java.util.List;

public interface OrderService {
    Order create(JsonNode orderData);

    Object findById(Long id);

    List<Order> findByCus(String name);
}
