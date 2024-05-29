package edu.menueasy.adso.domain.reservation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface ReservationService {

    Reservation createReservation(Reservation reservation);

    Page<Reservation> getReservations(Pageable pageable);

    List<Reservation> getCheckedInReservations();

    List<Reservation> getUncheckedInReservations();

    Reservation updateReservation(Reservation reservation);

    void deleteReservation(Long id);

    Reservation checkReservation(Long id, ReservationCheckDto reservationDto);

    Map<String, Integer> getMonthlyReservationCounts();

    Long getReservationBetweenDate(LocalDateTime start, LocalDateTime end);

    List<ReservationCountDto> getReservationBetweenDates(LocalDateTime start, LocalDateTime end);

    Long getReservationsForCurrentMonth();

    Long getReservationsForPreviousMonth();

    Map<String, Long> getReservationsForGivenMonths(LocalDateTime start, LocalDateTime end);

    Long getReservationsForSpecificMonth(LocalDateTime date);

    Long countReservation();

    Long getUncheckedInReservationCount();

    Page<Reservation> getReservationsByDate(LocalDate date, Pageable pageable);

}
