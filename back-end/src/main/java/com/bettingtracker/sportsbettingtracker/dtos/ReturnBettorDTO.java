package com.bettingtracker.sportsbettingtracker.dtos;

import com.bettingtracker.sportsbettingtracker.models.Bettor;

public class ReturnBettorDTO {
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    private String avatar;

    private Integer betsWon;
    private Integer betsLost;
    private Integer betsPushed;

    private Double currentBalance;
    private Double allTimeBalance;

    public ReturnBettorDTO() {
    }

    public ReturnBettorDTO(Bettor bettor) {
        this.id = bettor.getId();
        this.firstName = bettor.getFirstName();
        this.lastName = bettor.getLastName();
        this.email = bettor.getEmail();
        this.avatar = bettor.getAvatar();
        this.betsWon = bettor.getBetsWon();
        this.betsLost = bettor.getBetsLost();
        this.betsPushed = bettor.getBetsPushed();
        this.currentBalance = bettor.getCurrentBalance();
        this.allTimeBalance = bettor.getAllTimeBalance();

    }

    public Integer getId() {
        return id;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getBetsWon() {
        return betsWon;
    }

    public void setBetsWon(Integer betsWon) {
        this.betsWon = betsWon;
    }

    public Integer getBetsLost() {
        return betsLost;
    }

    public void setBetsLost(Integer betsLost) {
        this.betsLost = betsLost;
    }

    public Integer getBetsPushed() {
        return betsPushed;
    }

    public void setBetsPushed(Integer betsPushed) {
        this.betsPushed = betsPushed;
    }

    public Double getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(Double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public Double getAllTimeBalance() {
        return allTimeBalance;
    }

    public void setAllTimeBalance(Double allTimeBalance) {
        this.allTimeBalance = allTimeBalance;
    }
}
