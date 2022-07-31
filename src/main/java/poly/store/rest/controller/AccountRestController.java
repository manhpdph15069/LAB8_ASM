package poly.store.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import poly.store.entity.Account;
import poly.store.entity.Role;
import poly.store.service.AccountService;
import poly.store.service.RoleService;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/accounts")
public class AccountRestController {
    @Autowired
    AccountService accountService;

    @GetMapping
    public List<Account> getAll(@RequestParam("admin")Optional<Boolean> admin){
        if (admin.orElse(false)){
            return accountService.getAdmin();
        }
        return accountService.findAll();
    }
}
