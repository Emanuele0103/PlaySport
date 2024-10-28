package com.IeI.PlayGame.controller.reservations;


import com.IeI.PlayGame.bean.reservations.Reservation;
import com.IeI.PlayGame.services.reservations.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reservation")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/reservations")
    public List<Reservation> getReservations(){

        return reservationService.findAll();
    }

    @PostMapping("/reservation")
    public Optional<Reservation> addReservation(@RequestBody Reservation reservation){

        return reservationService.saveReservation(reservation);
    }

    @PutMapping("/reservation")
    public Optional<Reservation> updateReservation(@RequestBody Reservation uptadedReservation){
        return reservationService.updateReservation(uptadedReservation);
    }
}
