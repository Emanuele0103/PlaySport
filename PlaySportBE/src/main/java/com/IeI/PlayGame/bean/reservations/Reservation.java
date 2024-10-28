package com.IeI.PlayGame.bean.reservations;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private Date date;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "resourceId")
    private Resource resourceId;

}
