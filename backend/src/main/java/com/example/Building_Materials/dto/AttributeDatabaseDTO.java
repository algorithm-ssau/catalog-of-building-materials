package com.example.Building_Materials.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttributeDatabaseDTO {
    private Long productId;
    private String name;
    private String value;
}
