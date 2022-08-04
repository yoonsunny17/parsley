package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HerbBookListRes")
public class HerbBookListRes extends BaseResponseBody {
    private List<HerbBookRes> herbBooks;

    public static HerbBookListRes of(Integer statusCode, String message, List<HerbBookRes> herbBooks) {
        HerbBookListRes res = new HerbBookListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setHerbBooks(herbBooks);
        return res;
    }
}
