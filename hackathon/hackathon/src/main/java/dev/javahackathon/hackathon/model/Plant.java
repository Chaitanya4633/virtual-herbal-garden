package dev.javahackathon.hackathon.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "plants")
public class Plant {
    @Id
    private String id; // Or use ObjectId if you want
    private String botanicalName;
    private List<String> commonNames;
    private String description;
    private String region;
    private String plantType;
    private List<String> medicinalUses;
    private List<String> imageUrls;
    private String model3DUrl;
    private List<String> videoUrls;
    private String audioUrl;
    private String habitat;
    private String cultivation;

    public Plant() {}

    public Plant(String id, String botanicalName, List<String> commonNames, String description, String region,
                 String plantType, List<String> medicinalUses, List<String> imageUrls, String model3DUrl,
                 List<String> videoUrls, String audioUrl, String habitat, String cultivation) {
        this.id = id;
        this.botanicalName = botanicalName;
        this.commonNames = commonNames;
        this.description = description;
        this.region = region;
        this.plantType = plantType;
        this.medicinalUses = medicinalUses;
        this.imageUrls = imageUrls;
        this.model3DUrl = model3DUrl;
        this.videoUrls = videoUrls;
        this.audioUrl = audioUrl;
        this.habitat = habitat;
        this.cultivation = cultivation;
    }

    // Getters and Setters for all fields

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBotanicalName() { return botanicalName; }
    public void setBotanicalName(String botanicalName) { this.botanicalName = botanicalName; }

    public List<String> getCommonNames() { return commonNames; }
    public void setCommonNames(List<String> commonNames) { this.commonNames = commonNames; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getPlantType() { return plantType; }
    public void setPlantType(String plantType) { this.plantType = plantType; }

    public List<String> getMedicinalUses() { return medicinalUses; }
    public void setMedicinalUses(List<String> medicinalUses) { this.medicinalUses = medicinalUses; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    public String getModel3DUrl() { return model3DUrl; }
    public void setModel3DUrl(String model3DUrl) { this.model3DUrl = model3DUrl; }

    public List<String> getVideoUrls() { return videoUrls; }
    public void setVideoUrls(List<String> videoUrls) { this.videoUrls = videoUrls; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    public String getHabitat() { return habitat; }
    public void setHabitat(String habitat) { this.habitat = habitat; }

    public String getCultivation() { return cultivation; }
    public void setCultivation(String cultivation) { this.cultivation = cultivation; }
}