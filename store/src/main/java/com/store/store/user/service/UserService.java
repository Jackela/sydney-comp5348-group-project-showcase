package com.store.store.user.service;

import com.store.store.user.DTO.LoginDTO;
import com.store.store.user.DTO.RegisterDTO;
import com.store.store.user.DTO.UserDTO;
import com.store.store.user.DTO.UserResponseDTO;
import com.store.store.user.model.User;
import com.store.store.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.mindrot.jbcrypt.BCrypt;

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

    public UserResponseDTO registerUser(RegisterDTO registerDTO) throws Exception {
        // 检查用户名或电子邮件是否已存在
        if (userRepository.findByUserName(registerDTO.getUserName()).isPresent()) {
            throw new Exception("Username already taken");
        }
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new Exception("Email already in use");
        }

        // 使用 jBCrypt 对密码进行哈希加密
        String hashedPassword = BCrypt.hashpw(registerDTO.getPassword(), BCrypt.gensalt());

        // 创建并保存用户
        User user = new User();
        user.setUserName(registerDTO.getUserName());
        user.setPassword(hashedPassword);
        user.setEmail(registerDTO.getEmail());
        user.setBalance(0.0); // 初始化余额或按需设置

        User savedUser = userRepository.save(user);
        return convertToUserResponseDTO(savedUser);
    }

    public UserResponseDTO loginUser(LoginDTO loginDTO) throws Exception {
        Optional<User> optionalUser = userRepository.findByUserName(loginDTO.getUserName());
        if (!optionalUser.isPresent()) {
            throw new Exception("User not found");
        }

        User user = optionalUser.get();

        if (!BCrypt.checkpw(loginDTO.getPassword(), user.getPassword())) {
            throw new Exception("Invalid password");
        }

        return convertToUserResponseDTO(user);
    }

    // 辅助方法：将 User 实体转换为 UserResponseDTO
    private UserResponseDTO convertToUserResponseDTO(User user) {
        UserResponseDTO responseDTO = new UserResponseDTO();
        responseDTO.setUserId(user.getUserId());
        responseDTO.setUserName(user.getUserName());
        responseDTO.setEmail(user.getEmail());
        return responseDTO;
    }
}
