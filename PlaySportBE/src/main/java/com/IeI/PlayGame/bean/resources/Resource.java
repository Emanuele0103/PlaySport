package com.IeI.PlayGame.bean.resources;

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
    @GeneratedValue
    private Long Id;

    @Column(nullable = false)
    private String resourceName;

    @Column(nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(name = "resource_type_id")
    private ResourceType resourceType;

    @Column(nullable = false)
    private String resourceOwnerName;

    @Column
    private Boolean deleted = false;
}
