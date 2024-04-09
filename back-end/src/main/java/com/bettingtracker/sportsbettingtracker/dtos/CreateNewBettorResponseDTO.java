package com.bettingtracker.sportsbettingtracker.dtos;

import com.bettingtracker.sportsbettingtracker.models.Bettor;

public class CreateNewBettorResponseDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String avatar;

    public CreateNewBettorResponseDTO(Bettor bettor) {
        this.id = bettor.getId();
        this.firstName = bettor.getFirstName();
        this.lastName = bettor.getLastName();
        this.email = bettor.getEmail();
        this.avatar = bettor.getAvatar();
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
}
