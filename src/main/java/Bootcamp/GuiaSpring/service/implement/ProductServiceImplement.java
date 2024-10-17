package Bootcamp.GuiaSpring.service.implement;

import Bootcamp.GuiaSpring.dto.ProductCreationDTO;
import Bootcamp.GuiaSpring.dto.ProductDTO;
import Bootcamp.GuiaSpring.exception.ProductNotFoundException;
import Bootcamp.GuiaSpring.exception.ProductUnavailableException;
import Bootcamp.GuiaSpring.models.Product;
import Bootcamp.GuiaSpring.models.enums.ProductStatus;
import Bootcamp.GuiaSpring.repository.ProductRepository;
import Bootcamp.GuiaSpring.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImplement implements ProductService {

    @Autowired
    private ProductRepository productRepository;


    @Override
    public void saveProduct(Product product) {
         productRepository.save(product);
    }
    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }
    @Override
    public List<ProductDTO> getAllProductDTO(){
        return getAllProduct().stream().map(product -> new ProductDTO(product)).collect(Collectors.toList());
    }

    @Override
    public boolean existByProduct(Long id) {
        return productRepository.existsById(id);
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public ProductDTO getProductDTO(Long id){
        Product product = productRepository.findById(id).orElse(null);
        if(product==null){
            return null;
        }
        ProductDTO productDTO = new ProductDTO(product);
        product.getName();
        product.getDescription();
        product.getStock();
        product.getProductStatus();
        product.getPrice();

        return productDTO;
    }
    @Override
    public ResponseEntity<String> createProd(ProductCreationDTO productCreationDTO) {

        Product product = new Product(productCreationDTO.getName()
                ,productCreationDTO.getDescription(),productCreationDTO.getPrice(),productCreationDTO.getStock());

        productRepository.save(product);
        return new ResponseEntity<>("Product Created", HttpStatus.CREATED);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            // Lanzamos una excepción para manejar el error
            throw new ProductNotFoundException("Product with id " + id + " not found.");
        }

        if(product.getProductStatus() == ProductStatus.UNAVAILABLE){
            throw new ProductUnavailableException("Product with id " + id + " is not available.");
        }


        product.setProductStatus(ProductStatus.UNAVAILABLE);
        productRepository.save(product);
    }


}
