package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 사용자가 심은 작물 모델 정의.
 */

@Getter
@Setter
@Entity
public class Herb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "herb_id")
    private Long id;

    private int position;
    private boolean isCompleted;
    private int growthTime;
    private LocalDateTime startDate;

    @Embedded
    private Item item;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Herb() {

    }
}
