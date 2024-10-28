package com.IeI.PlayGame.bean.resources;

import com.IeI.PlayGame.bean.user.User;
import jakarta.persistence.*;
        import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "resource")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private String resourceName;

    @Column(nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(name = "type")
    private ResourceType resourceType;

    @Column(nullable = false)
    private String resourceOwnerName;

    @Column
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;
}
