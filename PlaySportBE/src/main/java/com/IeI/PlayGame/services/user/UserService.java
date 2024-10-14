package com.IeI.PlayGame.services.user;

import com.IeI.PlayGame.auth.LoginResponse;
import com.IeI.PlayGame.bean.user.User;

import java.util.Optional;

public interface UserService {

    Optional<LoginResponse> saveUser(User user);

    LoginResponse authenticate(String username, String password);

    Optional<User> findUserByEmail(String email);
}
