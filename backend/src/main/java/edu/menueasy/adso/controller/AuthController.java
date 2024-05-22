package edu.menueasy.adso.controller;

import edu.menueasy.adso.domain.user.User;
import edu.menueasy.adso.domain.user.UserDto;
import edu.menueasy.adso.dto.AuthenticationResponse;
import edu.menueasy.adso.infra.security.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    private final AuthenticationService service;

    public AuthController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user){
        return ResponseEntity.ok(service.authenticate(user));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDto userDto){
        return ResponseEntity.ok(service.register(userDto));
    }


}
