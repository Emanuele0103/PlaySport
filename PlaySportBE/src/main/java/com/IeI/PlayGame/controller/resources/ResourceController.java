package com.IeI.PlayGame.controller.resources;

import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.services.resources.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/resource")
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping("/resources")
    public List<Resource> allResources() {

        return resourceService.findByDeleted(false);
    }
}
