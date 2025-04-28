package com.example.Building_Materials.controller;

import com.example.Building_Materials.dto.ProductsDTO;
import com.example.Building_Materials.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
