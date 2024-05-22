package edu.menueasy.adso.domain.user;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @NotNull Page<User> findAll(Pageable pageable);

    Boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

}
