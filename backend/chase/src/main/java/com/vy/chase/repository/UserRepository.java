package com.vy.chase.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vy.chase.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
