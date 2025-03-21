package com.example.Building_Materials;

import com.example.Building_Materials.models.Category;
import com.example.Building_Materials.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BuildingMaterialsApplication {
		public static void main(String[] args) {
		SpringApplication.run(BuildingMaterialsApplication.class, args);
	}
}
