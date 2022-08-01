package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@DiscriminatorValue("S")
@Getter @Setter
@Embeddable
public class ItemSeed extends Item{
    private Integer herbRate;

    @Enumerated(EnumType.STRING)
    private HerbType herbType;
}
