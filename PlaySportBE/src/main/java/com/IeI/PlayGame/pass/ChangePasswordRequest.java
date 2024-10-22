package com.IeI.PlayGame.pass;

import lombok.Data;

@Data
public class ChangePasswordRequest {

    private String email;

    private String currentPassword;

    private String newPassword;
}
