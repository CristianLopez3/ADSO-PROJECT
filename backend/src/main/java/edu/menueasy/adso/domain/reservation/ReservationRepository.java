package edu.menueasy.adso.domain.reservation;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    @NotNull
    Page<Reservation> findAllByOrderByReservationDateDescCheckedInAsc(Pageable pageable);
    long count();

    List<Reservation> findByCheckedInIsTrue();

    List<Reservation> findByCheckedInIsFalse();

    @Query("""
            SELECT MONTH(r.reservationDate), COUNT(r)
            FROM Reservation r
            WHERE YEAR(r.reservationDate) = YEAR(CURRENT_DATE())
            GROUP BY MONTH(r.reservationDate)
            """)
    List<Object[]> findMonthlyReservationCounts();

    @Query("""
            SELECT COUNT(r)
            FROM Reservation r
            WHERE r.reservationDate
            BETWEEN :startDate AND :endDate
            """)
    Long countReservationsWithinDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);


    @Query("""
            SELECT new edu.menueasy.adso.domain.reservation.ReservationCountDto(r.reservationDate, COUNT(r))
            FROM Reservation r
            WHERE r.reservationDate
            BETWEEN :start AND :end
            GROUP BY r.reservationDate
            """)
    List<ReservationCountDto> findReservationsCountBetweenDates(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    Long countByCheckedInFalse();

    @Query("""
        SELECT COUNT(r)
        FROM Reservation r
        WHERE r.reservationDate
        BETWEEN :startDate AND :endDate
        """)
    Long countReservationsForSpecificMonth(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("""
        SELECT COUNT(r)
        FROM Reservation r
        WHERE r.checkedIn = :checkedIn
        """)
    Long countReservationsByCheckedIn(@Param("checkedIn") boolean checkedIn);
}


