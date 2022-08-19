package com.ssafy.api.response.farm;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.HerbBook;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.*;

@Data
@ApiModel("UserHerbBooksResponse")
public class UserHerbBooksRes extends BaseResponseBody {
    private List<UserHerbBookRes> userHerbBooks = new ArrayList<>();

    public static UserHerbBooksRes of(Integer statusCode, String message, Map<HerbBook, Integer> userHerbBooks) {
        UserHerbBooksRes res = new UserHerbBooksRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserHerbBooks(userHerbBooks);
        return res;
    }

    public void setUserHerbBooks(Map<HerbBook, Integer> userHerbBooks){
        for(HerbBook key : userHerbBooks.keySet()){
            this.userHerbBooks.add(UserHerbBookRes.of(key, userHerbBooks.get(key)));
        }

        Collections.sort(this.userHerbBooks, new Comparator<UserHerbBookRes>(){
            public int compare(UserHerbBookRes o1, UserHerbBookRes o2){
                return o1.getHerbBook().getId() - o2.getHerbBook().getId();
            }
        });
    }
}
