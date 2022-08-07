package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@DiscriminatorValue("F")
@Getter @Setter
@Entity
@NoArgsConstructor
public class ItemFertilizer extends ItemAbstract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_fertilizer_id")
    private Integer id;

    private Integer sleyRate;
}
