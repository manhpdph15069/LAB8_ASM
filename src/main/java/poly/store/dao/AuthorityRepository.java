package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import poly.store.entity.Account;
import poly.store.entity.Authority;

import java.util.List;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    @Query("SELECT DISTINCT a from  Authority a where a.account in ?1")
    List<Authority> authorities(List<Account> accounts);
}