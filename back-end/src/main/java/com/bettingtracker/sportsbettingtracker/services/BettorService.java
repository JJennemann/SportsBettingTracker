package com.bettingtracker.sportsbettingtracker.services;

import com.bettingtracker.sportsbettingtracker.dtos.CreateNewBettorDTO;
import com.bettingtracker.sportsbettingtracker.dtos.ReturnBettorDTO;
import com.bettingtracker.sportsbettingtracker.dtos.UpdatedBettorDTO;
import com.bettingtracker.sportsbettingtracker.models.Bettor;
import com.bettingtracker.sportsbettingtracker.repositories.BettorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BettorService {

    private static final String CREATE_BETTOR_FAILED = "Failed to create new bettor";
    private static final String NO_BETTORS_FOUND = "No bettor(s) matching your criteria were found";
    private static final String RETURN_BETTORS_FAILED = "Something went wrong. Failed to retrieve bettor(s). Try again";
    private static final String BETTOR_DELETED_SUCCESS = "Bettor was successfully deleted";
    private static final String BETTOR_DELETED_FAILED = "Failed to delete the bettor";
    private static final String BETTOR_UPDATE_FAILED = "Failed to update bettor";


    @Autowired
    private BettorRepository bettorRepository;

    public ResponseEntity<?> createNewBettor(CreateNewBettorDTO createNewBettorDTO) {
        try {
            Bettor newBettor = new Bettor(createNewBettorDTO.getFirstName(), createNewBettorDTO.getLastName(),
                    createNewBettorDTO.getEmail(), createNewBettorDTO.getAvatar());

            Bettor savedBettor = bettorRepository.save(newBettor);

            ReturnBettorDTO newBettorResponseDTO = new ReturnBettorDTO(savedBettor);

            return new ResponseEntity<>(newBettorResponseDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(CREATE_BETTOR_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> returnAllBettors() {
        try {
            List<Bettor> allBettors = (List<Bettor>) bettorRepository.findAll();
            if (allBettors.isEmpty()) {
                return new ResponseEntity<>(NO_BETTORS_FOUND, HttpStatus.NOT_FOUND);
            } else {
                List<ReturnBettorDTO> allBettorDTOs = allBettors.stream()
                        .map(bettor -> new ReturnBettorDTO(bettor))
                        .collect(Collectors.toList());

                return new ResponseEntity<>(allBettorDTOs, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(RETURN_BETTORS_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> returnBettorById(Integer bettorId) {
        try {
            Optional<Bettor> returnedOptionalBettor = bettorRepository.findById(bettorId);
            if (returnedOptionalBettor.isEmpty()) {
                return new ResponseEntity<>(NO_BETTORS_FOUND, HttpStatus.NOT_FOUND);
            } else {
                Bettor returnedBettor = returnedOptionalBettor.get();
                ReturnBettorDTO returnedBettorDTO = new ReturnBettorDTO(returnedBettor);

                return new ResponseEntity<>(returnedBettorDTO, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(RETURN_BETTORS_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateBettor(Integer bettorId, UpdatedBettorDTO updatedBettorDTO) {
        try {
            Optional<Bettor> returnedOptionalBettor = bettorRepository.findById(bettorId);
            if (returnedOptionalBettor.isEmpty()) {
                return new ResponseEntity<>(NO_BETTORS_FOUND, HttpStatus.NOT_FOUND);
            } else {
                Bettor bettorToUpdate = returnedOptionalBettor.get();

                bettorToUpdate.setFirstName(updatedBettorDTO.getFirstName());
                bettorToUpdate.setLastName(updatedBettorDTO.getLastName());
                bettorToUpdate.setEmail(updatedBettorDTO.getEmail());
                bettorToUpdate.setAvatar(updatedBettorDTO.getAvatar());

                bettorRepository.save(bettorToUpdate);

                ReturnBettorDTO returnedUpdatedBettorDTO = new ReturnBettorDTO(bettorToUpdate);
                return new ResponseEntity<>(returnedUpdatedBettorDTO, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(BETTOR_UPDATE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> deleteBettor(Integer bettorId) {
        try {
            Optional<Bettor> returnedOptionalBettor = bettorRepository.findById(bettorId);
            if (returnedOptionalBettor.isEmpty()) {
                return new ResponseEntity<>(NO_BETTORS_FOUND, HttpStatus.NOT_FOUND);
            } else {
                bettorRepository.deleteById(bettorId);
                return new ResponseEntity<>(BETTOR_DELETED_SUCCESS, HttpStatus.OK);
            }
        } catch (Exception e){
            return new ResponseEntity<>(BETTOR_DELETED_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
