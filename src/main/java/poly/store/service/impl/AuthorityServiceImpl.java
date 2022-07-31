package poly.store.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.store.dao.AccountRepository;
import poly.store.dao.AuthorityRepository;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.service.AuthorityService;

import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {
    @Autowired
    AuthorityRepository authorityRepository;
    @Autowired
    AccountRepository accountRepository;
    @Override
    public List<Authority> findAuthoritiesOfAdmin() {
        List<Account> accounts = accountRepository.getAdmin();
        return authorityRepository.authorities(accounts);
    }

    @Override
    public List<Authority> findAll() {
        return authorityRepository.findAll();
    }

    @Override
    public Authority create(Authority authority) {
        return authorityRepository.save(authority);
    }

    @Override
    public void delete(Integer id) {
        authorityRepository.deleteById(id);
    }
}
