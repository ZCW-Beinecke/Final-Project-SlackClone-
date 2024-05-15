package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Message;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChannelId(Long channelId);
}
