package com.IeI.PlayGame.services.user;

import com.IeI.PlayGame.auth.LoginResponse;
import com.IeI.PlayGame.bean.user.User;

import java.util.Optional;

public interface UserService {

    Optional<User> saveUser(User user);

    LoginResponse authenticate(String username, String password);

    Optional<User> findUserByEmail(String email);

    Optional<User> updateUser(String email, User updatedUser);

    boolean changePassword(String email, String currentPassword, String newPassword);

    User getAuthenticatedUser();

    Optional<User> findById(Long id);
}
