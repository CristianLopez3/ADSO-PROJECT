package edu.menueasy.adso.domain.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public enum Role {

    ADMIN,
    SUB_ADMIN,
    WAITRESS,
    BARTENDER,
    COOK

}
