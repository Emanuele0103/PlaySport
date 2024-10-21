package com.IeI.PlayGame.services.resources;

import com.IeI.PlayGame.bean.resources.Resource;

import java.util.List;
import java.util.Optional;

public interface ResourceService {

    Optional<Resource> saveResource(Resource resource);

    Optional<Resource> updateResource(Resource resource);

    Optional<Resource> deleteResource(Resource resource);

    List<Resource> findByDeleted(boolean deleted);
}
