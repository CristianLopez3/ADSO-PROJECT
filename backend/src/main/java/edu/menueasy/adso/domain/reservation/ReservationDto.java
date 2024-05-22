package edu.menueasy.adso.domain.reservation;

import java.time.LocalDateTime;

public record ReservationDto(
    Long id,
    String name,
    String phoneNumber,
    String email,
    LocalDateTime reservationDate,
    Integer numberOfPeople,
    String description,
    Boolean checkedIn
) {

}
