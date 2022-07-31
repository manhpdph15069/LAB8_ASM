package poly.store.service;

import com.fasterxml.jackson.databind.JsonNode;
import poly.store.entity.Order;

public interface OrderService {
    Order create(JsonNode orderData);

    Object findById(Long id);
}
