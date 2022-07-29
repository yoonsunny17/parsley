package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("S")
@Getter @Setter
public class ItemWater extends Item{
    private Integer timeRate;
}
