package Bootcamp.GuiaSpring.service;

import Bootcamp.GuiaSpring.dto.ProductCreationDTO;
import Bootcamp.GuiaSpring.dto.ProductDTO;
import Bootcamp.GuiaSpring.models.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    List<Product> getAllProduct();
    List<ProductDTO> getAllProductDTO();
    ProductDTO getProductDTO(Long id);
    boolean existByProduct(Long id);
    Product findById(Long id);
    ResponseEntity<String> createProd(ProductCreationDTO productCreationDTO);
    void saveProduct (Product product);
    void deleteProduct(Long id);


}
