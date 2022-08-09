package com.ssafy.db.repository;

import com.ssafy.db.entity.Hashtag;
import com.ssafy.db.entity.RoomHashtag;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class HashtagRepository {

    @PersistenceContext
    private EntityManager em;

    public void saveHashtag(Hashtag hashtag){
        em.persist(hashtag);
    }

    public void saveRoomHashtag(RoomHashtag roomHashtag){
        em.persist(roomHashtag);
    }

    public List<Hashtag> findHashtags(){
        return em.createQuery("select h from Hashtag  h", Hashtag.class).getResultList();
    }

    public Hashtag findBytag(String tag){
        List<Hashtag> tags = em.createQuery("select h from Hashtag h where h.tag = :tag").setParameter("tag", tag).getResultList();

        if(tags.size() == 0){
            return null;
        }else{
            return tags.get(0);
        }
    }

    public List<Hashtag> findAll(){
        return em.createQuery("select h from Hashtag h order by h.useCount desc").getResultList();
    }

}
