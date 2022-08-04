package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QRoom;
import com.ssafy.db.entity.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoomRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Room room) {
        em.persist(room);
    }

    public void update(Room room) {
        em.merge(room);
    }

    public Room findByRoomId(Long roomId) {
        return em.find(Room.class, roomId);
    }

    public List<Room> findRooms() {
        return em.createQuery("select r from Room r", Room.class).getResultList();
    }
}
