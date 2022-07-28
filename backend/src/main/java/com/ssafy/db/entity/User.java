package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 유저 모델 정의.
 */
@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String name;
    private LocalDateTime regDate;
    private String description;
    private String profileImgUrl;
    private LocalDateTime dDay;
    private Long currentSley;
    private Boolean isWithdrawn;


//    TODO :단방향을 위한 삭제임!!
//    @OneToOne(mappedBy = "user")
//    private Auth auth;


}
