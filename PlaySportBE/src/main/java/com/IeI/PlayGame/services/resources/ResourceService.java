package com.IeI.PlayGame.services.resources;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.user.User; // Presumo che esista una classe User

import java.util.List;
import java.util.Optional;

public interface ResourceService {

    Optional<Resource> saveResource(Resource resource);

    Optional<Resource> updateResource(Resource resource);

    Optional<Resource> deleteResource(Resource resource);

    List<Resource> findByDeleted(boolean deleted);

    Optional<Resource> findOne(Long id);

    // Nuovo metodo per trovare le risorse per utente proprietario
    List<Resource> findByOwner(User owner);
}
