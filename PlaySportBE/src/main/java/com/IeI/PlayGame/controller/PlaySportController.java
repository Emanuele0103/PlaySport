package com.IeI.PlayGame.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/playsport-controller")
public class PlaySportController {

    @GetMapping
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("TEST!!");
    }
}
