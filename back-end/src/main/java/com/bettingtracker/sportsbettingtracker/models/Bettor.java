package com.bettingtracker.sportsbettingtracker.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
@Table(name="bettor_data")
public class Bettor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message="First name cannot be empty")
    private String firstName;

    @NotBlank(message="Last name cannot be empty")
    private String lastName;

    @NotBlank(message="Email cannot be empty")
    @Email(message="Email should be valid")
    private String email;

    private String avatar;

    private Integer betsWon = 0;
    private Integer betsLost = 0;
    private Integer betsPushed = 0;

    private Double currentBalance = 0.0;
    private Double allTimeBalance = 0.0;

    public Bettor(){}

    public Bettor(String firstName, String lastName, String email, String avatar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatar = avatar;

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
        Bettor that = (Bettor) o;
        return Objects.equals(id, that.id) && Objects.equals(firstName, that.firstName) && Objects.equals(lastName, that.lastName) && Objects.equals(email, that.email) && Objects.equals(avatar, that.avatar) && Objects.equals(betsWon, that.betsWon) && Objects.equals(betsLost, that.betsLost) && Objects.equals(betsPushed, that.betsPushed) && Objects.equals(currentBalance, that.currentBalance) && Objects.equals(allTimeBalance, that.allTimeBalance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email, avatar, betsWon, betsLost, betsPushed, currentBalance, allTimeBalance);
    }
}
