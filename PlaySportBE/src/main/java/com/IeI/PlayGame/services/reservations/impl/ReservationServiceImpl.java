package com.IeI.PlayGame.services.reservations.impl;

import com.IeI.PlayGame.bean.reservations.Reservation;
import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.user.User;
import com.IeI.PlayGame.repository.reservations.ReservationRepository;
import com.IeI.PlayGame.services.reservations.ReservationService;
import com.IeI.PlayGame.services.resources.ResourceService;
import com.IeI.PlayGame.services.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;

    private final UserService userService;

    private final ResourceService resourceService;

    @Override
    public Optional<Reservation> findById(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public Optional<Reservation> saveReservation(Reservation reservation) {

        try {
            if(reservation.getUser() != null && reservation.getResource() != null){
                Optional<User> user = userService.findById(reservation.getUser().getId());
                Optional<Resource> resource = resourceService.findOne(reservation.getResource().getId());
                if(user.isPresent() && resource.isPresent() && !reservation.isDeleted()){
                    Reservation savedReservation = reservationRepository.save(reservation);
                    return Optional.of(savedReservation);
                }

            }
        } catch (Exception e) {
            log.error("Error saving reservation: {}", e.getMessage());
        }
        return Optional.empty();
    }

    @Override
    public Optional<Reservation> updateReservation(Reservation uptadedReservation) {

        if (uptadedReservation != null && uptadedReservation.getId() != null) {

            return saveReservation(uptadedReservation);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Reservation> deleteReservation(Reservation reservation) {

        if(reservation != null){

            reservation.setDeleted(true);
            return updateReservation(reservation);
        }
        return Optional.empty();
    }
}
