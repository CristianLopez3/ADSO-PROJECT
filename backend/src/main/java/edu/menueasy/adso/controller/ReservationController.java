package edu.menueasy.adso.controller;

import edu.menueasy.adso.domain.reservation.*;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationServiceImpl reservationService;

    @Autowired
    public ReservationController(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    @Transactional
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        if (!id.equals(reservation.getId())) {
            throw new IllegalArgumentException("ID in the path and ID in the reservation object must be the same.");
        }
        return ResponseEntity.ok(reservationService.updateReservation(reservation));
    }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok("Reservation deleted with success!");
    }

    @PatchMapping("/check/{id}")
    @Transactional
    public ResponseEntity<Reservation> checkReservation(@PathVariable("id") Long id, @RequestBody ReservationCheckDto reservation) {
        return ResponseEntity.ok(reservationService.checkReservation(id, reservation));
    }


    @GetMapping("/count")
    public ResponseEntity<Long> countReservation() {
        return ResponseEntity.ok(reservationService.countReservation());
    }

    @GetMapping("/checked-in")
    public List<Reservation> getCheckedInReservations() {
        return reservationService.getCheckedInReservations();
    }

    @GetMapping("/unchecked-in")
    public List<Reservation> getUncheckedInReservations() {
        return reservationService.getUncheckedInReservations();
    }

    @GetMapping
    public ResponseEntity<Page<Reservation>> getReservations(@PageableDefault Pageable pagination) {
        return ResponseEntity.ok().body(reservationService.getReservations(pagination));
    }

    @GetMapping("/unchecked-in-count")
    public ResponseEntity<Long> getUncheckedInReservationCount() {
        return ResponseEntity.ok(reservationService.getUncheckedInReservationCount());
    }

    @GetMapping("/mes")
    public ResponseEntity<Map<String, Integer>> getMonthlyReservations() {
        return ResponseEntity.ok(reservationService.getMonthlyReservationCounts());
    }

    @GetMapping("/between-dates")
    public ResponseEntity<Long> getReservationsBetweenDates(@RequestParam(name = "start") String start, @RequestParam(name = "end") String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return ResponseEntity.ok(reservationService.getReservationBetweenDate(startDate, endDate));
    }

    @GetMapping("/count-between-dates")
    public ResponseEntity<List<ReservationCountDto>> getReservationsCountBetweenDates(@RequestParam(name = "start") String start, @RequestParam(name = "end") String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return ResponseEntity.ok(reservationService.getReservationBetweenDates(startDate, endDate));
    }

    @GetMapping("/current-month")
    public ResponseEntity<Long> getReservationsForCurrentMonth() {
        return ResponseEntity.ok(reservationService.getReservationsForCurrentMonth());
    }

    @GetMapping("/previous-month")
    public ResponseEntity<Long> getReservationsForPreviousMonth() {
        return ResponseEntity.ok(reservationService.getReservationsForPreviousMonth());
    }

    @GetMapping("/compare-months")
    public ResponseEntity<Map<String, Long>> getReservationsForGivenMonths(@RequestParam(name = "start") String start, @RequestParam(name = "end") String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return ResponseEntity.ok(reservationService.getReservationsForGivenMonths(startDate, endDate));
    }


}