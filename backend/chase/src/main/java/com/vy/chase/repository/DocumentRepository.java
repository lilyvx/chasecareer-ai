package com.vy.chase.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.vy.chase.entity.Document;
import com.vy.chase.entity.User;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findTopByUserOrderByIdDesc(User user);
}
