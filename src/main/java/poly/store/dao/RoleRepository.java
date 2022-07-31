package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.store.entity.Role;

public interface RoleRepository extends JpaRepository<Role, String> {
}