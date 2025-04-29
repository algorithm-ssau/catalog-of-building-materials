package com.example.Building_Materials.repo;

import com.example.Building_Materials.models.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {
    Optional<Category> findByName(String name);
    boolean existsByName(String name);
}
