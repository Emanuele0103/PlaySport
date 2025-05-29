package com.IeI.PlayGame.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String path = System.getProperty("user.dir") + "/uploads/";
        System.out.println("🧾 [WebConfig] Static files served from: " + path); // stampa path assoluto

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + path);
    }
}



