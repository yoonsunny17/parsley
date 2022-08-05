package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private long currentSley;
    private long currentBookPoint;
    private boolean isWithdrawn;

    @ManyToMany
    @JoinTable(name = "user_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    private List<Room> joinRooms = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "interest_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    private List<Room> interestRooms = new ArrayList<>();


    @OneToMany(mappedBy = "user")
    private List<UserHerbBook> userHerbBooks = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Sley> sleyHistory = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<DailyStudyLog> dailyStudyLogs = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Herb> herbs = new ArrayList<>();


//    TODO :단방향을 위한 삭제임!!
//    @OneToOne(mappedBy = "user")
//    private Auth auth;

    public void addUserRoom(Room room) {
        joinRooms.add(room);
        room.getMembers().add(this);
    }

    public User() {

    }
}