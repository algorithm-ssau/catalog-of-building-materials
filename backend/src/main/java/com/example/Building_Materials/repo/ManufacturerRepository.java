package com.example.Building_Materials.repo;

import com.example.Building_Materials.models.Manufacturer;
import org.springframework.data.repository.CrudRepository;

public interface ManufacturerRepository extends CrudRepository<Manufacturer, Long> {
    boolean existsByName(String name);
}
