package com.vy.chase.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint{
    
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2) 
    throws IOException {

      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "401 Unauthorized");
      
   }
    
}
//handle unauth request 