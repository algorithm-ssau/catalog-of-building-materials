package com.example.Building_Materials.service;

import com.example.Building_Materials.dto.*;
import com.example.Building_Materials.models.Category;
import com.example.Building_Materials.models.Manufacturer;
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
            if(product.getStockQuantity() == 0) continue;
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

    public boolean buyProducts(CartProductsDTO dto){
        for(CartProductDTO productDTO: dto.getProducts()){
            Product product = productRepository.findById(productDTO.getProductId()).orElseThrow();
            if(productDTO.getQuantity() > product.getStockQuantity()) return false;
        }
        for(CartProductDTO productDTO: dto.getProducts()){
            Product product = productRepository.findById(productDTO.getProductId()).orElseThrow();
            product.setStockQuantity(product.getStockQuantity() - productDTO.getQuantity());
            productRepository.save(product);
        }
        return true;
    }

    public void addCategory(CategoryDTO dto){
        if(categoryRepository.existsByName(dto.getName())) return;
        if(dto.getParentId() == null) categoryRepository.save(new Category(dto.getName()));
        else{
            Category category = categoryRepository.findById(dto.getParentId()).orElseThrow();
            categoryRepository.save(new Category(dto.getName(), category));
        }
    }

    public void addManufacturer(ManufacturerDTO dto){
        if(manufacturerRepository.existsByName(dto.getName())) return;
        manufacturerRepository.save(new Manufacturer(dto.getName(), dto.getCountry()));
    }

    public void addAttribute(AttributeDatabaseDTO dto){
        Product product = productRepository.findById(dto.getProductId()).orElseThrow();
        for(ProductAttribute attribute: product.getProductAttributes()){
            if(attribute.getName().equals(dto.getName())) return;
        }
        productAttributeRepository.save(new ProductAttribute(product, dto.getName(), dto.getValue()));
    }

    public void addProduct(ProductDatabaseDTO dto){
        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow();
        Manufacturer manufacturer = manufacturerRepository.findById(dto.getManufacturerId()).orElseThrow();
        productRepository.save(new Product(
                dto.getName(),
                dto.getDescription(),
                manufacturer,
                category,
                dto.getPrice(),
                dto.getStockQuantity(),
                dto.getImageURL()
        ));
    }

    public ProductDTO getProduct(long productId){
        Product product = productRepository.findById(productId).orElseThrow();
        ArrayList<ProductAttributeDTO> attributeDTOS = new ArrayList<>();
        for(ProductAttribute attribute: product.getProductAttributes()){
            attributeDTOS.add(new ProductAttributeDTO(attribute.getName(), attribute.getValue()));
        }
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getManufacturer().getName(),
                product.getStockQuantity(),
                product.getCategory().getName(),
                product.getImageURL(),
                attributeDTOS
        );
    }

    public ProductsDTO getProductsById(ProductIdListDTO dto){
        ArrayList<ProductDTO> result = new ArrayList<>();
        for(long id: dto.getList()){
            Product product = productRepository.findById(id).orElseThrow();
            if(product.getStockQuantity() == 0) continue;
            String category = product.getCategory().getName();
            String manufacturer = product.getManufacturer().getName();
            result.add(new ProductDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getDescription(),
                    manufacturer,
                    product.getStockQuantity(),
                    category,
                    product.getImageURL(),
                    null
            ));
        }
        return new ProductsDTO(result);
    }
}
