package dev.javahackathon.hackathon.service;

import dev.javahackathon.hackathon.model.Plant;
import dev.javahackathon.hackathon.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    public Optional<Plant> getPlantById(String id) {
        return plantRepository.findById(id);
    }

    public Plant addPlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public Plant updatePlant(String id, Plant plant) {
        plant.setId(id);
        return plantRepository.save(plant);
    }

    public void deletePlant(String id) {
        plantRepository.deleteById(id);
    }

    public List<Plant> filterPlants(String plantType, String region, String medicinalUse, String search) {
        if (plantType != null && !plantType.isEmpty()) return plantRepository.findByPlantType(plantType);
        if (region != null && !region.isEmpty()) return plantRepository.findByRegion(region);
        if (medicinalUse != null && !medicinalUse.isEmpty()) return plantRepository.findByMedicinalUsesContaining(medicinalUse);
        if (search != null && !search.isEmpty()) {
            return plantRepository.findByBotanicalNameContainingIgnoreCaseOrCommonNamesContainingIgnoreCase(search, search);
        }
        return plantRepository.findAll();
    }
}
