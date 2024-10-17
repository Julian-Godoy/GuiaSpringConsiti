package Bootcamp.GuiaSpring.dto;

import lombok.Getter;

@Getter
public class ProductCreationDTO {
    private String name, description;
    private float price;
    private int stock;
}
