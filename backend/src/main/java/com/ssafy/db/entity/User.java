package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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
    private LocalDate regDate;
    private String description;
    private String profileImgUrl;
    private LocalDate dDay;

    private long currentSley;
    private long currentBookPoint;
    private boolean isWithdrawn;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    private List<Room> joinRooms = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "interest_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    private List<Room> interestRooms = new ArrayList<>();


    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_herb_book_id")
    private List<UserHerbBook> userHerbBooks = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "sley_id")
    private List<Sley> sleyHistory = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<DailyStudyLog> dailyStudyLogs = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "herb_id")
    private List<Herb> herbs = new ArrayList<>();
    
    public void addUserRoom(Room room) {
        joinRooms.add(room);
        room.getMembers().add(this);
    }

    public User() {

    }
}