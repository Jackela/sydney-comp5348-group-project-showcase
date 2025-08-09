package com.bank.bank.service;

import com.bank.bank.DTO.UserDTO;
import com.bank.bank.model.User;
import com.bank.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public UserDTO getUserById(Long userId) {
        return userRepository.findById(userId).map(this::convertToDTO).orElse(null);
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setPassword("123456");
        user.setEmail(userDTO.getEmail());
        user.setBalance(userDTO.getBalance());
        user = userRepository.save(user);
        return convertToDTO(user);
    }

    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setUserName(userDTO.getUserName());
            user.setEmail(userDTO.getEmail());
            user.setBalance(userDTO.getBalance());
            user = userRepository.save(user);
            return convertToDTO(user);
        }
        return null;
    }

    public UserDTO addBalance(Long userId, double balance) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setBalance(user.getBalance() + balance);
            user = userRepository.save(user);
            return convertToDTO(user);
        }
        return null;
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setUserName(user.getUserName());
        userDTO.setEmail(user.getEmail());
        userDTO.setBalance(user.getBalance());
        return userDTO;
    }
}
