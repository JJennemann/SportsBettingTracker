package com.bettingtracker.sportsbettingtracker.controllers;

import com.bettingtracker.sportsbettingtracker.dtos.CreateNewBettorDTO;
import com.bettingtracker.sportsbettingtracker.dtos.UpdatedBettorDTO;
import com.bettingtracker.sportsbettingtracker.services.BettorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bettor")
public class BettorController {

    @Autowired
    private BettorService bettorService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewBettor(@RequestBody CreateNewBettorDTO createNewBettorDTO){
        return bettorService.createNewBettor(createNewBettorDTO);
    }

    @GetMapping("/returnAll")
    public ResponseEntity<?> returnAllBettors(){
        return bettorService.returnAllBettors();
    }

    @GetMapping("return/{bettorId}")
    public ResponseEntity<?> returnBettorById(@PathVariable Integer bettorId){
        return bettorService.returnBettorById(bettorId);
    }

    @PutMapping("/update/{bettorId}")
    public ResponseEntity<?> updateBettor(@PathVariable Integer bettorId, @RequestBody UpdatedBettorDTO updatedBettorDTO){
        return bettorService.updateBettor(bettorId, updatedBettorDTO);
    }

    @DeleteMapping("/delete/{bettorId}")
    public ResponseEntity<?> deleteBettor(@PathVariable Integer bettorId){
        return bettorService.deleteBettor(bettorId);
    }
}
