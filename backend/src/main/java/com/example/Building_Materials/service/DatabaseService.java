package com.example.Building_Materials.service;

import com.example.Building_Materials.dto.ProductAttributeDTO;
import com.example.Building_Materials.dto.ProductDTO;
import com.example.Building_Materials.dto.ProductsDTO;
import com.example.Building_Materials.models.Product;
import com.example.Building_Materials.models.ProductAttribute;
import com.example.Building_Materials.repo.CategoryRepository;
import com.example.Building_Materials.repo.ManufacturerRepository;
import com.example.Building_Materials.repo.ProductAttributeRepository;
import com.example.Building_Materials.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class DatabaseService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductAttributeRepository productAttributeRepository;
    @Autowired
    private ManufacturerRepository manufacturerRepository;

    public ProductsDTO getProducts(){
        Iterable<Product> products = productRepository.findAll();
        ArrayList<ProductDTO> productDTOS = new ArrayList<>();
        for(Product product: products){
            String category = product.getCategory().getName();
            String manufacturer = product.getManufacturer().getName();
            ArrayList<ProductAttributeDTO> attributeDTOS = new ArrayList<>();
            for(ProductAttribute attribute: product.getProductAttributes()){
                attributeDTOS.add(new ProductAttributeDTO(attribute.getName(), attribute.getValue()));
            }
            productDTOS.add(new ProductDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getDescription(),
                    manufacturer,
                    product.getStockQuantity(),
                    category,
                    product.getImageURL(),
                    attributeDTOS
            ));
        }
        return new ProductsDTO(productDTOS);
    }
}
