package dev.javahackathon.hackathon.controller;

import dev.javahackathon.hackathon.model.Plant;
import dev.javahackathon.hackathon.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/plants")
public class PlantController {

    @Autowired
    private PlantService plantService;

    @GetMapping
    public List<Plant> getAllPlants(
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String region,
        @RequestParam(required = false) String use,
        @RequestParam(required = false) String search
    ) {
        return plantService.filterPlants(type, region, use, search);
    }

    @GetMapping("/{id}")
    public Optional<Plant> getPlantById(@PathVariable String id) {
        return plantService.getPlantById(id);
    }

    @PostMapping
    public Plant addPlant(@RequestBody Plant plant) {
        return plantService.addPlant(plant);
    }

    @PutMapping("/{id}")
    public Plant updatePlant(@PathVariable String id, @RequestBody Plant plant) {
        return plantService.updatePlant(id, plant);
    }

    @DeleteMapping("/{id}")
    public void deletePlant(@PathVariable String id) {
        plantService.deletePlant(id);
    }
}
