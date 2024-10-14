package com.IeI.PlayGame.controller.user;

import com.IeI.PlayGame.auth.LoginRequest;
import com.IeI.PlayGame.auth.LoginResponse;
import com.IeI.PlayGame.auth.RegisterRequest;
import com.IeI.PlayGame.bean.user.Role;
import com.IeI.PlayGame.bean.user.User;  // Assicurati di importare il tuo User
import com.IeI.PlayGame.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);

        Optional<LoginResponse> response = userService.saveUser(user);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.unprocessableEntity().body(LoginResponse.builder().token(null).build()));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequest request) {
        LoginResponse response = userService.authenticate(request.getEmail(), request.getPassword());
        return response.getToken() != null ? ResponseEntity.ok(response)
                : ResponseEntity.status(401).body(response); // 401 Unauthorized
    }
}
