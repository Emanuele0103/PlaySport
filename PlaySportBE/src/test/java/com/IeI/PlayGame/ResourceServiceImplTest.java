package com.IeI.PlayGame;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.resources.ResourceType;
import com.IeI.PlayGame.bean.resources.ResourceTypeEnum;
import com.IeI.PlayGame.repository.resource.ResourceTypeRepository;
import com.IeI.PlayGame.services.resources.ResourceService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest( webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@TestPropertySource(locations = "classpath:application.properties")
public class ResourceServiceImplTest {

    @Autowired
    private ResourceService underTest;

    @Autowired
    private ResourceTypeRepository resourceTypeRepository;

    @Test
    public void testThatResourceCanBeCreated(){


        ResourceType resourceType = new ResourceType(1L, ResourceTypeEnum.SOCCER);


        resourceTypeRepository.save(resourceType);


        Resource resource =  Resource.builder()
                .Id(1L)
                .resourceName("Campo 1")
                .address("Via Cannata")
                .resourceType(resourceType)
                .resourceOwnerName("FA'EM")
                .deleted(false)
                .build();


        underTest.saveResource(resource);

        Optional<Resource> result =  underTest.findOne(1L);
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(resource);
    }
}
