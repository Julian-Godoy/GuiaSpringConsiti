package Bootcamp.GuiaSpring.models;

import Bootcamp.GuiaSpring.models.enums.Roles;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name, last_name, email, password;
    private Roles rol = Roles.USUARIO;

    public Users(String name, String last_name, String email, String password) {
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}
