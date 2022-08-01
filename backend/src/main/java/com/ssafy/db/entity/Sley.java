package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Sley {

    @Id
    @GeneratedValue
    @Column(name = "sley_id")
    private Long id;

    private long price;
    private LocalDateTime date;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Sley() {

    }
}
