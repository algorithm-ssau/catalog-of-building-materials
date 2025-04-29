package com.example.Building_Materials.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDatabaseDTO {
    private String name;
    private double price;
    private String description;
    private long manufacturerId;
    private int stockQuantity;
    private long categoryId;
    private String imageURL;
}
