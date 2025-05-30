package com.IeI.PlayGame.controller.user;

import com.IeI.PlayGame.pass.ChangePasswordRequest;
import com.IeI.PlayGame.auth.LoginRequest;
import com.IeI.PlayGame.auth.LoginResponse;
import com.IeI.PlayGame.bean.user.Role;
import com.IeI.PlayGame.bean.user.User;
import com.IeI.PlayGame.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestPart("firstname") String firstname,
            @RequestPart("lastname") String lastname,
            @RequestPart("email") String email,
            @RequestPart("password") String password,
            @RequestPart("phoneNumber") String phoneNumber,
            @RequestPart("role") String roleStr, // <-- AGGIUNTO
            @RequestPart(value = "avatar", required = false) MultipartFile avatar
    ) {
        String avatarUrl = null;

        if (avatar != null && !avatar.isEmpty()) {
            try {
                avatarUrl = userService.uploadAvatarTemporary(avatar);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore nel salvataggio immagine.");
            }
        }

        Role role;
        try {
            role = Role.valueOf(roleStr.toUpperCase());
            if (!(role == Role.USER || role == Role.OWNER)) {
                return ResponseEntity.badRequest().body("Ruolo non consentito.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Ruolo non valido. Usa USER o OWNER.");
        }

        User user = new User();
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setEmail(email);
        user.setPassword(password);
        user.setPhoneNumber(phoneNumber);
        user.setRole(role);
        user.setAvatarUrl(avatarUrl);

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

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Optional<User> updatedUserOpt = userService.updateUser(email, updatedUser);

        return updatedUserOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/users/{id}/avatar")
    public ResponseEntity<?> uploadUserAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        // Verifica che l’utente loggato corrisponda all’id
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedEmail = auth.getName();

        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isEmpty() || !userOpt.get().getEmail().equals(loggedEmail)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Non autorizzato");
        }

        try {
            String avatarUrl = userService.uploadUserAvatar(id, file);
            return ResponseEntity.ok(avatarUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore nel caricamento avatar");
        }
    }




    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/change_password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        boolean isChanged = userService.changePassword(request.getCurrentPassword(), request.getNewPassword(), email);

        if (isChanged) {
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password.");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Optional<User> userOpt = userService.findUserByEmail(email);
        return userOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
