package Bootcamp.GuiaSpring.controller;

import Bootcamp.GuiaSpring.dto.UserCreationDTO;
import Bootcamp.GuiaSpring.dto.UserDTO;
import Bootcamp.GuiaSpring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public List<UserDTO> getAllUser(){
        return userService.getAllUserDTO();
    }
    @PostMapping("/register")
    public ResponseEntity<String> userRegister(@RequestBody UserCreationDTO userCreationDTO){
        return userService.register(userCreationDTO);
    }
}
