package com.example.Building_Materials.models;

import jakarta.persistence.*;

@Entity
@Table(name = "product_attribute")
public class ProductAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_attribute_id")
    private Long id;

    @Column(name = "product_id")
    private Long productId;
    private String name;
    private String value;

    public ProductAttribute(Long productId, String attributeName, String attributeValue) {
        this.productId = productId;
        this.name = attributeName;
        this.value = attributeValue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String attributeName) {
        this.name = attributeName;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String attributeValue) {
        this.value = attributeValue;
    }
}
