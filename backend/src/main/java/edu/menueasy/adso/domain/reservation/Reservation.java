package edu.menueasy.adso.domain.reservation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity(name = "Reservation")
@Table(name = "tb_reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(name = "phone_number")
    private String phoneNumber;
    private String email;

    @Column(columnDefinition = "TIMESTAMP", name = "reservation_date")
    private LocalDateTime reservationDate;

    @Column(name = "number_of_people")
    private Integer numberOfPeople;
    private String description;

    @Column(name = "checked_in")
    private Boolean checkedIn;


}
