package com.example.Building_Materials.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_attribute")
@Data
@NoArgsConstructor
public class ProductAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_attribute_id")
    private Long id;

    private String name;
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
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
}
