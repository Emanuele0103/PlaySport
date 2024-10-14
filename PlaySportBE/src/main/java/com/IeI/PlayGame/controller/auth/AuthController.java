package com.IeI.PlayGame.controller.auth;

import com.IeI.PlayGame.auth.AuthenticationRequest;
import com.IeI.PlayGame.auth.AuthenticationResponse;
import com.IeI.PlayGame.auth.RegisterRequest;
import com.IeI.PlayGame.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {


        Optional<AuthenticationResponse> response = authenticationService.register(request);
        return response.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.unprocessableEntity().build());

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {

        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
