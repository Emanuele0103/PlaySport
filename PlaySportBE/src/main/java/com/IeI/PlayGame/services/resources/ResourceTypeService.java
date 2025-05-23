package com.IeI.PlayGame.services.resources;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.resources.ResourceType;
import com.IeI.PlayGame.bean.resources.ResourceTypeEnum;

import java.util.List;
import java.util.Optional;

public interface ResourceTypeService {

    Optional<ResourceType> saveResourceType(ResourceType resourceType);

    Optional<ResourceType> findByType(ResourceTypeEnum en);

    Optional<Resource> findByResourceType(ResourceTypeEnum type);
}
