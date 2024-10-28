package com.IeI.PlayGame.repository.reservations;

import com.IeI.PlayGame.bean.reservations.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
