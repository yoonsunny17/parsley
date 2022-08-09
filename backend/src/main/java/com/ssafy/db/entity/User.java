package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
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

    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.REMOVE})
    @JoinTable(name = "user_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    private List<Room> joinRooms = new ArrayList<>();

    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.REMOVE})
    @JoinTable(name = "interest_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    private List<Room> interestRooms = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<UserHerbBook> userHerbBooks = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Notification> notificationHistory = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<DailyStudyLog> dailyStudyLogs = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Herb> herbs = new ArrayList<>();
    
    public void addUserRoom(Room room) {
        joinRooms.add(room);
        room.getMembers().add(this);
    }
}