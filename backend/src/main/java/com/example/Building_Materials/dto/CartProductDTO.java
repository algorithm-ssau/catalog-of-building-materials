package com.example.Building_Materials.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartProductDTO {
    private long productId;
    private int quantity;
}
