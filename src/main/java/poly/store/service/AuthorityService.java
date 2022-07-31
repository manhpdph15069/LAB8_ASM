package poly.store.service;

import poly.store.entity.Authority;

import java.util.List;

public interface AuthorityService {
    List<Authority> findAuthoritiesOfAdmin();

    List<Authority> findAll();

    Authority create(Authority authority);

    void delete(Integer id);
}
