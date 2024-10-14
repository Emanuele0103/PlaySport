package com.IeI.PlayGame.services.user.impl;

import com.IeI.PlayGame.services.JwtService;
import com.IeI.PlayGame.bean.user.User;
import com.IeI.PlayGame.bean.user.UserRepository;
import com.IeI.PlayGame.services.user.UserService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
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
    public Optional<User> saveUser(User user) {

        if (user != null) {

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                log.error("Cannot create user, email [{}] already exist", user.getEmail());
                return Optional.empty();
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            try {
                return Optional.of(userRepository.save(user));
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }

        return Optional.empty();
    }

    public String login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtService.generateToken(userDetails); // Genera e restituisce il token JWT
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


}
