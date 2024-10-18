package com.IeI.PlayGame.controller.user;

import com.IeI.PlayGame.auth.LoginRequest;
import com.IeI.PlayGame.auth.LoginResponse;
import com.IeI.PlayGame.auth.RegisterRequest;
import com.IeI.PlayGame.bean.user.Role;
import com.IeI.PlayGame.bean.user.User;
import com.IeI.PlayGame.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {

        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);

        Optional<User> response = userService.saveUser(user);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.unprocessableEntity().build());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequest request) {
        LoginResponse response = userService.authenticate(request.getEmail(), request.getPassword());
        return response.getToken() != null ? ResponseEntity.ok(response)
                : ResponseEntity.status(401).body(response);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
        Optional<User> updatedUserOpt = userService.updateUser(email, updatedUser);

        return updatedUserOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestParam String email, @RequestParam String currentPassword, @RequestParam String newPassword) {
        boolean isChanged = userService.changePassword(email, currentPassword, newPassword);
        if (isChanged) {
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password. Please check your current password.");
        }
    }

}
