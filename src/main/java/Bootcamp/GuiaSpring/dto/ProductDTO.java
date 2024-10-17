package Bootcamp.GuiaSpring.dto;

import Bootcamp.GuiaSpring.models.Product;
import Bootcamp.GuiaSpring.models.enums.ProductStatus;

public class ProductDTO {
    private long id;
    private String name, description;
    private double price;
    private int stock;
    private ProductStatus productStatus;

    public ProductDTO (Product product){
        id = product.getId();
        name = product.getName();
        description = product.getDescription();
        price = product.getPrice();
        stock = product.getStock();
        productStatus = product.getProductStatus();
    }
}
