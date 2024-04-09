package com.bettingtracker.sportsbettingtracker.models;

import java.util.Objects;

public class BettorModel {

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

    public BettorModel(){}

    public BettorModel(String firstName, String lastName, String email, String avatar, Integer betsWon, Integer betsLost,
                       Integer betsPushed, Double currentBalance, Double allTimeBalance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatar = avatar;
        this.betsWon = betsWon;
        this.betsLost = betsLost;
        this.betsPushed = betsPushed;
        this.currentBalance = currentBalance;
        this.allTimeBalance = allTimeBalance;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "BettorModel{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", avatar='" + avatar + '\'' +
                ", betsWon=" + betsWon +
                ", betsLost=" + betsLost +
                ", betsPushed=" + betsPushed +
                ", currentBalance=" + currentBalance +
                ", allTimeBalance=" + allTimeBalance +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BettorModel that = (BettorModel) o;
        return Objects.equals(id, that.id) && Objects.equals(firstName, that.firstName) && Objects.equals(lastName, that.lastName) && Objects.equals(email, that.email) && Objects.equals(avatar, that.avatar) && Objects.equals(betsWon, that.betsWon) && Objects.equals(betsLost, that.betsLost) && Objects.equals(betsPushed, that.betsPushed) && Objects.equals(currentBalance, that.currentBalance) && Objects.equals(allTimeBalance, that.allTimeBalance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email, avatar, betsWon, betsLost, betsPushed, currentBalance, allTimeBalance);
    }
}
