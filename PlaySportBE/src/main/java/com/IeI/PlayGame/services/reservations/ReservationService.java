package com.IeI.PlayGame.services.reservations;

import com.IeI.PlayGame.bean.reservations.Reservation;

import java.util.List;
import java.util.Optional;

public interface ReservationService {

    Optional<Reservation> findById(Long id);

    List<Reservation> findAll();

    Optional<Reservation> saveReservation(Reservation reservation);

    Optional<Reservation> updateReservation(Reservation uptadedReservation);

    Optional<Reservation> deleteReservation(Reservation reservation);
}
