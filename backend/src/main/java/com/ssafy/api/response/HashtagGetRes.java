package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("RoomCreateGetResponse")
public class HashtagGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "popular hashtag list")
    List<String> hashtags = new ArrayList<>();

    public static HashtagGetRes of(Integer statusCode, String message, List<String> hashtags){
        HashtagGetRes res = new HashtagGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setHashtags(hashtags);

        return res;
    }

}
