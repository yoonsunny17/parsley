package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


/**
 * 허브 도감 목록
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
public class HerbBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "herb_book_id")
    private Integer id;

    private String name;
    private long point;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private HerbType herbType;
}
