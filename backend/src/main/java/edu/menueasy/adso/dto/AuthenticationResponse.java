package edu.menueasy.adso.dto;

import edu.menueasy.adso.domain.user.UserDto;
import lombok.Data;

import java.util.Date;

@Data
public class AuthenticationResponse {
    private String accessToken;
    private UserDto user;
    private Date expiresIn;

    public AuthenticationResponse(String accessToken, UserDto user, Date expiresIn) {
        this.accessToken = accessToken;
        this.user = user;
        this.expiresIn = expiresIn;
    }

}
