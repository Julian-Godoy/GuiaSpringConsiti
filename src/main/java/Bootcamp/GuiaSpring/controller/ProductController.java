package Bootcamp.GuiaSpring.controller;

import Bootcamp.GuiaSpring.dto.ProductCreationDTO;
import Bootcamp.GuiaSpring.dto.ProductDTO;
import Bootcamp.GuiaSpring.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/list")
    public List<ProductDTO> getAllProduct(){
        return productService.getAllProductDTO();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id ){
        ProductDTO productDTO = productService.getProductDTO(id);
        return ResponseEntity.ok(productDTO);
    }

    @GetMapping("/create")
    public ResponseEntity<String> createProd(@RequestBody ProductCreationDTO productCreationDTO){
        return productService.createProd(productCreationDTO);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }
}
