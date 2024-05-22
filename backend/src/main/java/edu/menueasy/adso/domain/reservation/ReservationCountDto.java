package edu.menueasy.adso.domain.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReservationCountDto {
    private LocalDateTime date;
    private Long count;
}