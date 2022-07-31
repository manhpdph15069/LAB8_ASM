package poly.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import poly.store.service.OrderService;

@Controller
public class OrderController {
    @Autowired
    OrderService orderService;

    @RequestMapping("order/checkout")
    public String checkout() {
        return "order/checkout";
    }
 @RequestMapping("order/list")
    public String list() {
        return "order/list";
    }
 @RequestMapping("order/detail/{id}")
    public String detail(Model model, @PathVariable("id")Long id) {
    model.addAttribute("order",orderService.findById(id));
        return "order/detail";
    }

}
