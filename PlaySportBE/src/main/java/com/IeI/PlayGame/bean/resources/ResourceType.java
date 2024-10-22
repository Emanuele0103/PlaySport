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
@Table(name = "resource_type")
public class ResourceType {

    @Id
    @GeneratedValue
    private Long ID;

    @Column(name = "resource_type_id")
    private Type type;
}