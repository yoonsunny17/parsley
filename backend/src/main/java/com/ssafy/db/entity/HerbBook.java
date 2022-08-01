package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


/**
 * 허브 도감 목록
 */
@Getter
@Setter
@Entity
public class HerbBook {

    @Id
    @GeneratedValue
    @Column(name = "herb_book_id")
    private Long id;

    private String name;
    private long point;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private HerbType herbType;

    public HerbBook() {
    }
}
