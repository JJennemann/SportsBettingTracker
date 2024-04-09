package com.bettingtracker.sportsbettingtracker.services;

import com.bettingtracker.sportsbettingtracker.models.Bettor;
import com.bettingtracker.sportsbettingtracker.repositories.BettorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BettorService {

    private static final String CREATE_BETTOR_FAILED = "Failed to create new bettor";
    private static final String NO_BETTORS_FOUND = "No bettor(s) matching your criteria were found";
    private static final String RETURN_BETTORS_FAILED= "Something went wrong. Failed to retrieve bettor(s). Try again"
    private static final String BETTOR_DELETED_SUCCESS = "Bettor was successfully deleted";


    @Autowired
    private BettorRepository bettorRepository;

    public ResponseEntity<?> createNewBettor(Bettor bettor){
        try{
            Bettor newBettor = new Bettor(bettor.getFirstName(), bettor.getLastName(), bettor.getEmail(), bettor.getAvatar());

            bettorRepository.save(newBettor);

            return new ResponseEntity<>(newBettor, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>(CREATE_BETTOR_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> returnAllBettors(){
        try{
            List<Bettor> allBettors = (List<Bettor>) bettorRepository.findAll();
            if(allBettors.isEmpty()){
                return new ResponseEntity<>(NO_BETTORS_FOUND, HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(allBettors, HttpStatus.OK);
            }
        } catch (Exception e){
            return new ResponseEntity<>(RETURN_BETTORS_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> returnBettorById(Integer bettorId){
        try{
            Optional<Bettor> returnedOptionalBettor = bettorRepository.findById(bettorId);
            if(returnedOptionalBettor.isEmpty()){
                return new ResponseEntity<>(NO_BETTORS_FOUND, HttpStatus.NOT_FOUND);
            } else{
                Bettor returnedBettor = returnedOptionalBettor.get();
                return new ResponseEntity<>(returnedBettor, HttpStatus.OK);
            }
        } catch (Exception e){
            return new ResponseEntity<>(RETURN_BETTORS_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}