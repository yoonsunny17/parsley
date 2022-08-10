package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 방 Entity
 */
@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User hostUser;

    @JsonManagedReference
    @ManyToMany(mappedBy = "joinRooms", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<User> members = new ArrayList<>();

    @JsonManagedReference
    @ManyToMany(mappedBy = "interestRooms", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<User> likes = new ArrayList<>();

    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE})
    private List<RoomHashtag> roomHashtags = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Mode mode;

    private String name;
    private String imageUrl;
    private String description;
    private int maxPopulation;
    private boolean isPublic;
    private String password;

}