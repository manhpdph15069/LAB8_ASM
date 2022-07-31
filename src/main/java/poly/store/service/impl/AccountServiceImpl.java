package poly.store.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.store.dao.AccountRepository;
import poly.store.entity.Account;
import poly.store.service.AccountService;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;

    @Override
    public Account findById(String username) {
        return accountRepository.findById(username).get();
    }

    @Override
    public List<Account> getAdmin() {
        return accountRepository.getAdmin();
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }
}
