package com.bank.bank.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private Long userId;
    private String userName;
    private String password;
    private String email;
    private Double balance;
}

