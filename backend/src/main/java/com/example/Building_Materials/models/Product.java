package com.example.Building_Materials.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_id")
    private Long id;

    private String name, description;
    @Column(name = "image_url")
    private String imageURL;
    @Column(name = "stock_quantity")
    private Integer stockQuantity;
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manufacturer_id", referencedColumnName = "manufacturer_id")
    private Manufacturer manufacturer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductAttribute> productAttributes = new ArrayList<>();


    public Product(String name, Manufacturer manufacturer, Category category, Double price) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.category = category;
        this.price = price;
    }

    public void updateManufacturer(Manufacturer manufacturer){
        this.manufacturer.getProducts().remove(this);
        this.manufacturer = manufacturer;
        this.manufacturer.getProducts().add(this);
    }

    public void updateCategory(Category category){
        this.category.getProducts().remove(this);
        this.category = category;
        this.category.getProducts().add(this);
    }
}
