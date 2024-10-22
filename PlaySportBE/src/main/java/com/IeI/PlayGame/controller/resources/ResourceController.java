package com.IeI.PlayGame.controller.resources;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.user.User;
import com.IeI.PlayGame.services.resources.ResourceService;
import com.IeI.PlayGame.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/resource")
@CrossOrigin(origins = "http://localhost:4200")
public class ResourceController {

    private final ResourceService resourceService;
    private final UserService userService;

    @GetMapping("/resources")
    public List<Resource> getUserResources() {
        User authenticatedUser = userService.getAuthenticatedUser();
        return resourceService.findByOwner(authenticatedUser);
    }

    @PostMapping("/resources")
    public Resource addResource(@RequestBody Resource resource) {
        // Ottieni l'utente autenticato
        User authenticatedUser = userService.getAuthenticatedUser();
        // Assegna l'utente autenticato come proprietario della risorsa
        resource.setOwner(authenticatedUser);
        // Salva la risorsa
        return resourceService.saveResource(resource).orElseThrow();
    }
}

