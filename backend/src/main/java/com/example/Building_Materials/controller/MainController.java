package com.example.Building_Materials.controller;

import com.example.Building_Materials.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @Autowired
    private DatabaseService databaseService;
}
