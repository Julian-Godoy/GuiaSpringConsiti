package Bootcamp.GuiaSpring.dto;

import Bootcamp.GuiaSpring.models.Users;
import Bootcamp.GuiaSpring.models.enums.Roles;

public class UserDTO {
    private long id;
    private String name, last_name, email, password;
    private Roles rol;

    public UserDTO(Users users){
        id = users.getId();
        name = users.getName();;
        last_name = users.getLast_name();
        email = users.getEmail();
        password = users.getPassword();
        rol = users.getRol();
    }

}
