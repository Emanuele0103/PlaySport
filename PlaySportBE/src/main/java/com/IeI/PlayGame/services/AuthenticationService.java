package com.IeI.PlayGame.services;

import com.IeI.PlayGame.auth.AuthenticationRequest;
import com.IeI.PlayGame.auth.AuthenticationResponse;
import com.IeI.PlayGame.auth.RegisterRequest;
import com.IeI.PlayGame.services.user.UserService;
import com.IeI.PlayGame.bean.user.Role;
import com.IeI.PlayGame.bean.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public Optional<AuthenticationResponse> register(RegisterRequest request) {

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        Optional<User> userSaved = userService.saveUser(user);


        if (userSaved.isPresent()) {
            var jwtToken = jwtService.generateToken(userSaved.get());
            return Optional.of(AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build());
        }
        return Optional.empty();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userService.findUserByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}

