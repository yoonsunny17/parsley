package com.ssafy.api.response.farm;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.ItemFertilizer;
import com.ssafy.db.entity.ItemSeed;
import com.ssafy.db.entity.ItemWater;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("ItemsResponse")
public class ItemsRes extends BaseResponseBody {
    private List<ItemRes> itemSeeds = new ArrayList<>();
    private List<ItemRes> itemWaters = new ArrayList<>();
    private List<ItemRes> itemFertilizers = new ArrayList<>();


    public static ItemsRes of(Integer statusCode, String message,
                              List<ItemSeed> itemSeeds, List<ItemWater> itemWaters, List<ItemFertilizer> itemFertilizers) {
        ItemsRes res = new ItemsRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setItemSeeds(itemSeeds);
        res.setItemWaters(itemWaters);
        res.setItemFertilizers(itemFertilizers);
        return res;
    }

    private void setItemSeeds(List<ItemSeed> seeds){
        for(ItemSeed itemSeed : seeds){
            itemSeeds.add(ItemRes.seedOf(itemSeed));
        }
    }

    private void setItemWaters(List<ItemWater> waters){
        for(ItemWater water : waters){
            itemWaters.add(ItemRes.waterOf(water));
        }
    }

    private void setItemFertilizers(List<ItemFertilizer> fertilizers){
        for(ItemFertilizer fertilizer : fertilizers){
            itemFertilizers.add(ItemRes.fertilizerOf(fertilizer));
        }
    }
}
