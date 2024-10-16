package com.IeI.PlayGame.auth;

import com.IeI.PlayGame.bean.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private String token;
    private String firstname;
    private String lastname;
    private Role role;
}