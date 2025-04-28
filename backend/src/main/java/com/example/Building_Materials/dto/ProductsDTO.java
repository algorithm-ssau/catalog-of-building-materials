package com.example.Building_Materials.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class ProductsDTO {
    ArrayList<ProductDTO> products;
}
