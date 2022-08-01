package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Embeddable;
import javax.persistence.Entity;

@DiscriminatorValue("W")
@Getter @Setter
@Embeddable
public class ItemWater extends Item{
    private Integer timeRate;
}
