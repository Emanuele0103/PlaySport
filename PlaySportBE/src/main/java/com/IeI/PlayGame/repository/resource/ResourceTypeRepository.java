package com.IeI.PlayGame.repository.resource;

import com.IeI.PlayGame.bean.resources.ResourceType;
import com.IeI.PlayGame.bean.resources.ResourceTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResourceTypeRepository  extends JpaRepository<ResourceType, Long> {

    Optional<ResourceType> findByType(String resourceType);

}
