package com.IeI.PlayGame;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.resources.ResourceType;
import com.IeI.PlayGame.bean.resources.ResourceTypeEnum;

public final class TestDataUtil {

    private TestDataUtil(){}

    public static Resource createTestResource(){

        ResourceType resourceType = new ResourceType(1L, ResourceTypeEnum.SOCCER);
        return Resource.builder()
                .Id(1L)
                .resourceName("Campo 1")
                .address("Via Cannata")
                .resourceType(resourceType)
                .resourceOwnerName("FA'EM")
                .deleted(false)
                .build();
    }
}
