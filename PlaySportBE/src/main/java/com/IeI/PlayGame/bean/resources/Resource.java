package com.IeI.PlayGame.bean.resources;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "resource")
public class Resource {

    @Id
    @GeneratedValue
    private Integer ID;

    @Column(nullable = false)
    private String resourcesName;

    @Column(nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(name = "resourceTypeId")
    private ResourcesType resourcesType;

    @Column(nullable = false)
    private String resourcesOwnerName;

    private Boolean isDeleted = false;
}
