package com.example.Building_Materials.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class ProductDTO {
    private long id;
    private String name;
    private double price;
    private String description;
    private String manufacturer;
    private int stockQuantity;
    private String category;
    private String imageURL;
    private ArrayList<ProductAttributeDTO> attributes;
}
