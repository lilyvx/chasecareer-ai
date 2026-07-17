package com.vy.chase.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "document")
public class Document{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String extractedSkills;

    @Column(columnDefinition = "TEXT")
    private String extractedWorkExperience;

    @Column(columnDefinition = "TEXT")
    private String extractedProjects;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getExtractedSkills() { return extractedSkills; }
    public void setExtractedSkills(String extractedSkills) { this.extractedSkills = extractedSkills; }

    public String getExtractedWorkExperience() { return extractedWorkExperience; }
    public void setExtractedWorkExperience(String extractedWorkExperience) { this.extractedWorkExperience = extractedWorkExperience; }

    public String getExtractedProjects() { return extractedProjects; }
    public void setExtractedProjects(String extractedProjects) { this.extractedProjects = extractedProjects; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}