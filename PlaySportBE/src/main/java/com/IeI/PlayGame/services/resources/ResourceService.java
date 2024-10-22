package com.IeI.PlayGame.services.resources;

import com.IeI.PlayGame.bean.resources.Resource;

import java.util.Optional;

public interface ResourceService {

    Optional<Resource> saveResource(Resource resource);

    Optional<Resource> updateResource(Resource resource);

    Optional<Resource> deleteResource(Resource resource);

    Optional<Resource> findByDeleted(boolean deleted);

    Optional<Resource> findOne(Long id);
}
