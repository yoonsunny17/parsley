package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


/**
 * 허브 확률
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
public class HerbRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "herb_rate_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    private HerbType herbType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_seed_id")
    private ItemSeed itemSeed;

    private int herbRate;
}
