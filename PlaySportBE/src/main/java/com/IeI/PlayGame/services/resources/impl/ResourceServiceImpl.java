package com.IeI.PlayGame.services.resources.impl;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.resources.ResourceRepository;
import com.IeI.PlayGame.services.resources.ResourceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ResourceServiceImpl implements ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    @Override
    public Optional<Resource> saveResource(Resource resource) {

        if (resource != null) {

            try {

                return Optional.of(resourceRepository.save(resource));
            } catch (Exception e) {

                log.error(e.getMessage(), e);
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<Resource> updateResource(Resource resource) {

        if (resource != null && resource.getId() != null) {

            return saveResource(resource);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Resource> deleteResource(Resource resource) {

        if (resource != null) {

            resource.setDeleted(true);
            return updateResource(resource);
        }
        return Optional.empty();
    }

    @Override
    public List<Resource> findByDeleted(boolean deleted) {
        return resourceRepository.findByDeleted(deleted);
    }


}
