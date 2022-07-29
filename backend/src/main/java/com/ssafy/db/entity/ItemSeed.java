package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@DiscriminatorValue("S")
@Getter @Setter
public class ItemSeed extends Item{
    private Integer herbRate;

    @Enumerated(EnumType.STRING)
    private HerbType herbType;
}
