package com.vy.chase.controller;

import com.vy.chase.dto.LoginReq;
import com.vy.chase.dto.RegisterReq;
import com.vy.chase.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;



@RestController
@RequestMapping("/api/auth")
public class AuthController {

     private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterReq request) {

        try {

            String token = authService.register(request);
            return ResponseEntity.ok(Map.of("token", token));
        } 
        catch (RuntimeException e) {
            
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));

        }

    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq request) {

        try {
            String token = authService.login(request);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
        
    }
    
}
