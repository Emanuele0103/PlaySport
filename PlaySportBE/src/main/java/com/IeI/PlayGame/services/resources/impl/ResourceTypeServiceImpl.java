package com.IeI.PlayGame.services.resources.impl;

import com.IeI.PlayGame.bean.resources.ResourceType;
import com.IeI.PlayGame.bean.resources.ResourceTypeEnum;
import com.IeI.PlayGame.repository.resources.ResourceTypeRepository;
import com.IeI.PlayGame.services.resources.ResourceTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class ResourceTypeServiceImpl implements ResourceTypeService {

    @Autowired
    private ResourceTypeRepository resourceTypeRepository;

    @Override
    public Optional<ResourceType> saveResourceType(ResourceType resourceType) {
        if (resourceType != null) {

            try {
                ResourceType res = resourceTypeRepository.save(resourceType);
                return Optional.of(res);
            } catch (Exception e) {

                log.error(e.getMessage(), e);
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<ResourceType> findByType(ResourceTypeEnum resourceTypeEnum) {
        return resourceTypeRepository.findByType(resourceTypeEnum.name());
    }

}
