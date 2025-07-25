package dev.javahackathon.hackathon.repository;

import dev.javahackathon.hackathon.model.Plant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlantRepository extends MongoRepository<Plant, String> {
    List<Plant> findByPlantType(String plantType);
    List<Plant> findByRegion(String region);
    List<Plant> findByMedicinalUsesContaining(String medicinalUse);
    List<Plant> findByBotanicalNameContainingIgnoreCaseOrCommonNamesContainingIgnoreCase(String botanicalName, String commonName);
}
    