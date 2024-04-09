package com.bettingtracker.sportsbettingtracker.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class CreateNewBettorDTO {

    @NotBlank(message="First name cannot be empty")
    private String firstName;

    @NotBlank(message="Last name cannot be empty")
    private String lastName;

    @NotBlank(message="Email cannot be empty")
    @Email(message="Email should be valid")
    private String email;

    private String avatar;

    public CreateNewBettorDTO() {
    }

    public CreateNewBettorDTO(String firstName, String lastName, String email, String avatar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatar = avatar;
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
