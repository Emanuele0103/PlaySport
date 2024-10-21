package com.IeI.PlayGame.bean.resources;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {

    List<Resource> findByDeleted(Boolean deleted);
}
