package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Embeddable;
import javax.persistence.Entity;

@DiscriminatorValue("F")
@Getter @Setter
@Embeddable
public class ItemFertilizer extends Item{
    private Integer sleyRate;
}
