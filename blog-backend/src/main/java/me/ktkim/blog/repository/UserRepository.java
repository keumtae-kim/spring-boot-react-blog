package me.ktkim.blog.repository;

import me.ktkim.blog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Keumtae Kim
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneById(Long id);
    Optional<User> findOneByLogin(String login);
    Optional<User> findOneByLoginOrEmail(String login, String email);
    Optional<User> findOneWithAuthoritiesByLogin(String login);
    Optional<User> findOneByEmail(String email);
}