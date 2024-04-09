package com.bettingtracker.sportsbettingtracker.controllers;

import com.bettingtracker.sportsbettingtracker.models.Bettor;
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
    public ResponseEntity<?> createNewBettor(@RequestBody Bettor bettor){
        return bettorService.createNewBettor(bettor);
    }

    @GetMapping("/returnAll")
    public ResponseEntity<?> returnAllBettors(){
        return bettorService.returnAllBettors();
    }

    @GetMapping("return/{bettorId}")
    public ResponseEntity<?> returnBettorById(@PathVariable Integer bettorId){
        return bettorService.returnBettorById(bettorId);
    }
}
