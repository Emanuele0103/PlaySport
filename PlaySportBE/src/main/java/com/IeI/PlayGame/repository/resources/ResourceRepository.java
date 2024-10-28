package com.IeI.PlayGame.repository.resources;


import com.IeI.PlayGame.bean.resources.Resource;
import com.IeI.PlayGame.bean.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByOwner(User owner);

    List<Resource> findByDeleted(boolean deleted);
}

