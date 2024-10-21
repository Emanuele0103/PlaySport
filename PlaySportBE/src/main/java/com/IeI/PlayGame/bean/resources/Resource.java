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
    private Integer Id;

    @Column(nullable = false)
    private String resourcesName;

    @Column(nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(name = "resourceTypeId")
    private ResourceType resourceType;

    @Column(nullable = false)
    private String resourcesOwnerName;

    private Boolean deleted = false;
}
