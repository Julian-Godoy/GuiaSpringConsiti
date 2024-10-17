package Bootcamp.GuiaSpring.models;

import Bootcamp.GuiaSpring.models.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name, description;
    private double price;
    private int stock;
    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus = ProductStatus.AVAILABLE;

    public Product(String name, String description, float price, int stock) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}
