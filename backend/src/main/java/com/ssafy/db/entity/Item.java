package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;

@Embeddable
@Getter
@AllArgsConstructor
public class Item {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_seed_id")
    private ItemSeed itemSeed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_water_id")
    private ItemWater itemWater;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_fertilizer_id")
    private ItemFertilizer itemFertilizer;

    public Item() {
    }
}
