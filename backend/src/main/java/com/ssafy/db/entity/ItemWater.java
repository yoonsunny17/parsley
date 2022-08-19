package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@DiscriminatorValue("W")
@Getter @Setter
@Entity
@NoArgsConstructor
public class ItemWater extends ItemAbstract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_water_id")
    private Integer id;

    private Integer timeRate;
}
