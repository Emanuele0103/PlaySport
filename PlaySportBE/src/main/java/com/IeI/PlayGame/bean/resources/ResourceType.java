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
public class ResourceType {

    @Id
    @GeneratedValue
    private Integer ID;

    private Type type;
}