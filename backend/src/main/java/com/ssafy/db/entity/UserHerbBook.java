package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 유저-허브 도감 관계 엔티티
 */
@Getter
@Setter
@Entity
public class UserHerbBook {

    @Id
    @GeneratedValue
    @Column(name = "user_herb_book_id")
    private Long id;

    private LocalDateTime obtainedDate;
    private long count;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "herb_book_id")
    private HerbBook herbBook;
}
