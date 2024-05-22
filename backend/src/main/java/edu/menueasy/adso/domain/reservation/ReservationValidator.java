package edu.menueasy.adso.domain.reservation;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

@Service
public class ReservationValidator {

  private static final LocalTime OPENING_TIME = LocalTime.of(9, 0);
  private static final LocalTime CLOSING_TIME = LocalTime.of(20, 0);

  public void validate(Reservation reservation) {
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime reservationDate = reservation.getReservationDate();

    if (reservationDate.isBefore(now.plusHours(6))) {
      throw new IllegalArgumentException("Reservations must be made at least 6 hours in advance.");
    }

    if (reservationDate.toLocalDate().isBefore(now.toLocalDate())) {
      throw new IllegalArgumentException("Reservations cannot be made for past dates.");
    }

    if (reservationDate.toLocalTime().isBefore(OPENING_TIME) || reservationDate.toLocalTime().isAfter(CLOSING_TIME)) {
      throw new IllegalArgumentException("Reservations can only be made from 9:00 to 20:00.");
    }
  }

}