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

    public String error = "User not found for email [{}]";

    @Transactional
    public Optional<User> saveUser(User user) {
        if (user == null) {
            return Optional.empty();
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            log.error("Cannot create user, email [{}] already exists", user.getEmail());
            return Optional.empty();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        try {
            User savedUser = userRepository.save(user);
            return Optional.of(savedUser);
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

                Optional<User> userOpt = findUserByEmail(email);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    return LoginResponse.builder()
                            .token(jwtToken)
                            .firstname(user.getFirstname())
                            .lastname(user.getLastname())
                            .role(user.getRole())
                            .build();
                }
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

    @Transactional
    @Override
    public Optional<User> updateUser(String email, User updatedUser) {
        // Verifica se l'utente esiste
        Optional<User> existingUserOpt = userRepository.findByEmail(email);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            // Aggiornare solo i campi desiderati
            if (updatedUser.getFirstname() != null) {
                existingUser.setFirstname(updatedUser.getFirstname());
            }

            if (updatedUser.getLastname() != null) {
                existingUser.setLastname(updatedUser.getLastname());
            }

            if (updatedUser.getEmail() != null && !updatedUser.getEmail().equals(existingUser.getEmail())) {
                // Controllo se l'email è già in uso
                if (userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {
                    log.error("Cannot update user, email [{}] already exists", updatedUser.getEmail());
                    return Optional.empty();
                }
                existingUser.setEmail(updatedUser.getEmail());
            }

            userRepository.save(existingUser);
            return Optional.of(existingUser);
        } else {
            log.error(error, email);
            return Optional.empty();
        }
    }


    @Transactional
    @Override
    public boolean changePassword(String currentPassword, String newPassword, String token) {
        String email = jwtService.extractUsername(token); // Estrai l'email dal token
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(currentPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true; // Password cambiata con successo
            } else {
                log.error("Current password is incorrect for user [{}]", email);
                return false; // Password attuale errata
            }
        } else {
            log.error("User not found for email [{}]", email);
            return false;
        }
    }

}
