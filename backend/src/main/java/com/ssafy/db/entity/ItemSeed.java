package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@DiscriminatorValue("S")
@Getter @Setter
@Entity
public class ItemSeed extends ItemAbstract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_seed_id")
    private Integer id;

    private int growthTime;
}
