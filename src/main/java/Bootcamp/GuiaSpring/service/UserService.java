package Bootcamp.GuiaSpring.service;

import Bootcamp.GuiaSpring.dto.UserCreationDTO;
import Bootcamp.GuiaSpring.dto.UserDTO;
import Bootcamp.GuiaSpring.models.Users;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    Users findById(Long id);
    Users findByEmail(String email);
    void saveUser(Users users);
    boolean existsByEmail(String email);
    List<Users> getAllUsers();
    List<UserDTO> getAllUserDTO();
    ResponseEntity<String> register(UserCreationDTO userCreationDTO); // Método de registro
}
