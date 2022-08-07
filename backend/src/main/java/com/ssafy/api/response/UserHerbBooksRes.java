package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("UserHerbBooksResponse")
public class UserHerbBooksRes extends BaseResponseBody {
    private List<UserHerbBookRes> userHerbBooks = new ArrayList<>();

    public static UserHerbBooksRes of(Integer statusCode, String message, List<Tuple> userHerbBooks) {
        UserHerbBooksRes res = new UserHerbBooksRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserHerbBooks(userHerbBooks);
        return res;
    }

    public void setUserHerbBooks(List<Tuple> userHerbBooks){
        for(Tuple userHerbBook : userHerbBooks){
            this.userHerbBooks.add(UserHerbBookRes.of(userHerbBook));
        }
    }
}
