package poly.store.rest.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import poly.store.entity.Order;
import poly.store.service.OrderService;

@CrossOrigin("*")
@PreAuthorize("isAuthenticated()")
@RestController
public class OrderRestController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/rest/orders")
    public Order getOne(@RequestBody JsonNode orderData) {
        return orderService.create(orderData);
    }
}
