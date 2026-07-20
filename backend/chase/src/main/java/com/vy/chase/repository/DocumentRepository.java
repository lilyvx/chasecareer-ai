package com.vy.chase.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vy.chase.entity.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
