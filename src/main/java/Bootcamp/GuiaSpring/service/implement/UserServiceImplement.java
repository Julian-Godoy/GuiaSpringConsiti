package Bootcamp.GuiaSpring.service.implement;

import Bootcamp.GuiaSpring.dto.UserCreationDTO;
import Bootcamp.GuiaSpring.dto.UserDTO;
import Bootcamp.GuiaSpring.models.Users;
import Bootcamp.GuiaSpring.repository.UserRepository;
import Bootcamp.GuiaSpring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserServiceImplement implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Users findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void saveUser(Users users) {
        userRepository.save(users);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<UserDTO> getAllUserDTO() {
        return getAllUsers().stream().map(UserDTO::new).collect(Collectors.toList());
    }


    @Override
    public ResponseEntity<String> register(UserCreationDTO userCreationDTO) {
        // Validaciones para el registro
        if (existsByEmail(userCreationDTO.getEmail())) {
            return new ResponseEntity<>("El email ya está en uso", HttpStatus.FORBIDDEN);
        }
        if (userCreationDTO.getName().isBlank()) {
            return new ResponseEntity<>("El nombre no puede estar vacio", HttpStatus.FORBIDDEN);
        }
        if (userCreationDTO.getLastname().isBlank()) {
            return new ResponseEntity<>("El apellido no puede estar vacio", HttpStatus.FORBIDDEN);
        }

        if (userCreationDTO.getEmail().isBlank()) {
            return new ResponseEntity<>("El email no puede estar vacio", HttpStatus.FORBIDDEN);
        }
        if (userCreationDTO.getPassword().isBlank()) {
            return new ResponseEntity<>("La contraseña no puede estar vacia", HttpStatus.FORBIDDEN);
        }

        Users users = new Users(userCreationDTO.getName(),userCreationDTO.getLastname(), userCreationDTO.getEmail(),
                passwordEncoder.encode(userCreationDTO.getPassword()));
        saveUser(users);

        return new ResponseEntity<>("Successfully registered user", HttpStatus.CREATED);
    }
}
