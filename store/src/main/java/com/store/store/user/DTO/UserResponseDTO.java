package com.store.store.user.DTO;

import lombok.Data;

@Data
public class UserResponseDTO {
    private Long userId;
    private String userName;
    private String email;
}
