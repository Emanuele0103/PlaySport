package com.IeI.PlayGame.services.resources.impl;

import com.IeI.PlayGame.bean.user.User;
import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.repository.resource.ResourceRepository;
import com.IeI.PlayGame.services.resources.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;

    @Override
    public Optional<Resource> saveResource(Resource resource) {
        return Optional.of(resourceRepository.save(resource));
    }

    @Override
    public Optional<Resource> updateResource(Resource resource) {
        // Assicurarsi che il campo esista prima di aggiornare
        Optional<Resource> existingResource = resourceRepository.findById(resource.getId());
        if (existingResource.isPresent()) {
            return Optional.of(resourceRepository.save(resource));
        }
        return Optional.empty();
    }

    @Override
    public Optional<Resource> deleteResource(Resource resource) {
        // Imposta il campo come "deleted" invece di eliminarlo fisicamente
        resource.setDeleted(true);
        return Optional.of(resourceRepository.save(resource));
    }

    @Override
    public List<Resource> findByDeleted(boolean deleted) {
        // Restituisce tutte le risorse non eliminate
        return resourceRepository.findByDeleted(deleted);
    }

    @Override
    public Optional<Resource> findOne(Long id) {
        return resourceRepository.findById(id);
    }

    // Implementazione del nuovo metodo per trovare i campi dell'utente autenticato
    @Override
    public List<Resource> findByOwner(User owner) {
        return resourceRepository.findByOwner(owner);
    }
}
