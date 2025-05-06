package com.example.Building_Materials.controller;

import com.example.Building_Materials.dto.*;
import com.example.Building_Materials.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MainController {
    @Autowired
    private DatabaseService databaseService;

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(){
        try{
            ProductsDTO productsDTO = databaseService.getProducts();
            return ResponseEntity.ok(productsDTO);
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping("/cart")
    public ResponseEntity<?> cart(@RequestBody ProductIdListDTO dto){
        try{
            ProductsDTO productsDTO = databaseService.getProductsById(dto);
            return ResponseEntity.ok(productsDTO);
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable long productId){
        try{
            ProductDTO productDTO = databaseService.getProduct(productId);
            return ResponseEntity.ok(productDTO);
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PatchMapping("/buy-products")
    public ResponseEntity<?> buyProducts(@RequestBody CartProductsDTO dto){
        try{
            boolean result = databaseService.buyProducts(dto);
            return ResponseEntity.ok(result);
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping("/add-category")
    public ResponseEntity<?> addCategory(@RequestBody CategoryDTO dto){
        try{
            databaseService.addCategory(dto);
            return ResponseEntity.ok().build();
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping("/add-manufacturer")
    public ResponseEntity<?> addManufacturer(@RequestBody ManufacturerDTO dto){
        try{
            databaseService.addManufacturer(dto);
            return ResponseEntity.ok().build();
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping("/add-attribute")
    public ResponseEntity<?> addAttribute(@RequestBody AttributeDatabaseDTO dto){
        try{
            databaseService.addAttribute(dto);
            return ResponseEntity.ok().build();
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping("/add-product")
    public ResponseEntity<?> addProduct(@RequestBody ProductDatabaseDTO dto){
        try{
            databaseService.addProduct(dto);
            return ResponseEntity.ok().build();
        }
        catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }
}
