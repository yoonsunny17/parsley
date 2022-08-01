package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 방 Entity
 */
@Getter
@Setter
@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User hostUser;

    @ManyToMany(mappedBy = "joinRooms")
    private List<User> members = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Mode mode;

    private String name;
    private String imageUrl;
    private String description;
    private int maxPopulation;
    private boolean isPublic;
    private String password;

    public Room() {

    }
}
