package com.vy.chase.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vy.chase.entity.Document;
import com.vy.chase.entity.User;
import com.vy.chase.repository.DocumentRepository;
import com.vy.chase.repository.UserRepository;
import com.vy.chase.service.Extraction;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final Extraction extractionService;
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;

    public DocumentController(Extraction extractionService,
                            UserRepository userRepository, DocumentRepository documentRepository) {
        this.extractionService = extractionService;
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            String username = authentication.getName();

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String extractedText = extractionService.extractText(file);

            Document document = new Document();
            document.setExtractedSkills(extractedText);
            document.setUser(user);
            documentRepository.save(document);

            return ResponseEntity.ok(Map.of("extractedText", extractedText));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}