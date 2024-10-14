package com.IeI.PlayGame.services.user;

import com.IeI.PlayGame.bean.user.User;

import java.util.Optional;

public interface UserService {

    Optional<User> saveUser(User user);

    String login(String username, String password);


    Optional<User> findUserByEmail(String email);
}
