package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class HerbBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "herb_book_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    private HerbType herbType;

    private String name;
    private long point;
    private String imageUrl;
    private String description;
}
