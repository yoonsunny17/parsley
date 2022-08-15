package com.ssafy.api.response.farm;

import com.ssafy.db.entity.ItemFertilizer;
import com.ssafy.db.entity.ItemSeed;
import com.ssafy.db.entity.ItemWater;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Tuple;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("ItemResponse")
public class ItemRes {
	@ApiModelProperty(name = "아이템 ID")
	Integer itemId;

	@ApiModelProperty(name="아이템 이름")
	String name;

	@ApiModelProperty(name = "아이템 가격")
	int sley;

	@ApiModelProperty(name = "아이템 특징")
	int rate;

	public static ItemRes seedOf(ItemSeed itemSeed){
		ItemRes res = new ItemRes();
		res.setItemId(itemSeed.getId());
		res.setName(itemSeed.getName());
		res.setSley(itemSeed.getSley());
		res.setRate(itemSeed.getGrowthTime());
		return res;
	}

	public static ItemRes waterOf(ItemWater itemWater){
		ItemRes res = new ItemRes();
		res.setItemId(itemWater.getId());
		res.setName(itemWater.getName());
		res.setSley(itemWater.getSley());
		res.setRate(itemWater.getTimeRate());
		return res;
	}

	public static ItemRes fertilizerOf(ItemFertilizer itemFertilizer){
		ItemRes res = new ItemRes();
		res.setItemId(itemFertilizer.getId());
		res.setName(itemFertilizer.getName());
		res.setSley(itemFertilizer.getSley());
		res.setRate(itemFertilizer.getSleyRate());
		return res;
	}
}
