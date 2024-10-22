package com.IeI.PlayGame.config;

import com.IeI.PlayGame.bean.resources.ResourceType;
import com.IeI.PlayGame.bean.resources.ResourceTypeEnum;
import com.IeI.PlayGame.services.resources.ResourceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartUp implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private ResourceTypeService resourceTypeService;

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {

        for (ResourceTypeEnum resourceTypeEnum : ResourceTypeEnum.values()) {
            if (resourceTypeService.findByType(resourceTypeEnum).isEmpty()) {
                ResourceType resourceType = ResourceType
                        .builder()
                        .type(resourceTypeEnum.name())
                        .build();
                resourceTypeService.saveResourceType(resourceType);
            }
        }
    }
}
