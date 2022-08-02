package com.ssafy.db.repository;

import com.ssafy.db.entity.Room;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class RoomRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Room room) {
        em.persist(room);
    }

    public Room findByRoomId(Long roomId) {
        return em.find(Room.class, roomId);
    }
}
