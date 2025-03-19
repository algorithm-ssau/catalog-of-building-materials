package com.example.Building_Materials.models;

import jakarta.persistence.*;

@Entity
@Table(name = "product_attribute")
public class ProductAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_attribute_id")
    private Long id;

    private String name;
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    public ProductAttribute(Product product, String attributeName, String attributeValue) {
        this.product = product;
        this.name = attributeName;
        this.value = attributeValue;
    }

    public void updateProduct(Product product){
        this.product.getProductAttributes().remove(this);
        this.product = product;
        this.product.getProductAttributes().add(this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
