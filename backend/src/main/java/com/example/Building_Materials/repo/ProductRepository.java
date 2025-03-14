package com.example.Building_Materials.repo;

import com.example.Building_Materials.models.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
