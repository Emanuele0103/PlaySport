package com.IeI.PlayGame.services.user.impl;

import com.IeI.PlayGame.auth.LoginResponse;
import com.IeI.PlayGame.services.JwtService;
import com.IeI.PlayGame.bean.user.User;
import com.IeI.PlayGame.bean.user.UserRepository;
import com.IeI.PlayGame.services.user.UserService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Transactional
    public Optional<LoginResponse> saveUser(User user) {
        if (user == null) {
            return Optional.empty();
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            log.error("Cannot create user, email [{}] already exists", user.getEmail());
            return Optional.empty();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        try {
            userRepository.save(user);
            return Optional.of(LoginResponse.builder()
                    .token(jwtService.generateToken(user))
                    .build());
        } catch (Exception e) {
            log.error("Error saving user: {}", e.getMessage());
        }

        return Optional.empty();
    }

    public LoginResponse authenticate(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                String jwtToken = jwtService.generateToken(userDetails);
                return LoginResponse.builder()
                        .token(jwtToken)
                        .build();
            }
        } catch (BadCredentialsException e) {
            log.error("Login failed for user [{}]: Invalid credentials", email);
        } catch (Exception e) {
            log.error("An error occurred during login: {}", e.getMessage());
        }

        return LoginResponse.builder().token(null).build();
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
