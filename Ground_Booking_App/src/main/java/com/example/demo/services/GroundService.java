package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Ground;
import com.example.demo.repositories.CityRepository;
import com.example.demo.repositories.GroundRepository;
import com.example.demo.repositories.SportRepository;
import com.example.demo.repositories.UserRepository;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import java.util.List;
import java.util.Optional;

@Service
public class GroundService {

	private final GroundRepository groundRepository;
    private final CityRepository cityRepository;
    private final UserRepository userRepository;
    private final SportRepository sportRepository;

    @Autowired
    public GroundService(GroundRepository groundRepository, CityRepository cityRepository, UserRepository userRepository,
                         SportRepository sportRepository) {
        this.groundRepository = groundRepository;
        this.cityRepository = cityRepository;
        this.userRepository = userRepository;
        this.sportRepository = sportRepository;
    }

    public List<Ground> getAllGrounds() {
        return groundRepository.findAll();
    }

    public Optional<Ground> getGroundById(Integer id) {
        return groundRepository.findById(id);
    }
    
    public List<Ground> getGroundsByOwnerId(Integer ownerId) {
        return groundRepository.findByUser_uId(ownerId);
    }

    public void deleteGround(Integer id) {
        groundRepository.deleteById(id);
    }
    
    @Value("${image.upload-dir}")
    private String uploadDir;
    
    // Updated addGround method
    public Ground addGround(Ground ground) {
        // Step 1: Extract Base64 image data and temporarily set the gImages field to null.
        String base64Image = ground.getgImages();
        ground.setgImages(null);
        
        // Step 2: Save the ground object without the image data to get the generated ID.
        Ground savedGround = groundRepository.save(ground);

        try {
            if (base64Image != null && base64Image.contains(",")) {
                // Get the file extension and the base64 data part
                String[] parts = base64Image.split(",");
                String mimeType = parts[0];
                String base64Data = parts[1];

                String fileExtension = ".jpg";
                if (mimeType.contains("image/png")) {
                    fileExtension = ".png";
                } else if (mimeType.contains("image/jpeg")) {
                    fileExtension = ".jpeg";
                }

                // Step 3: Construct the new filename using the ground's generated ID.
                String uniqueFileName = "GroundImage_" + savedGround.getgId() + fileExtension;
                
                // Step 4: Define the file path and save the image to the file system.
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                
                byte[] imageBytes = Base64.getDecoder().decode(base64Data);
                Path filePath = uploadPath.resolve(uniqueFileName);
                Files.write(filePath, imageBytes);

                // Step 5: Update the saved ground object with the new file name and save it again.
                savedGround.setgImages(uniqueFileName);
                groundRepository.save(savedGround);
            }
        } catch (Exception e) {
            // Handle exceptions (e.g., file saving errors).
            throw new RuntimeException("Could not save image file: " + e.getMessage(), e);
        }
    	
        return savedGround;
    }
}