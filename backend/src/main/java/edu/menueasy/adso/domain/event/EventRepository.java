package edu.menueasy.adso.domain.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface EventRepository extends JpaRepository<Event, Integer> {

    @Modifying
    @Query("""
    UPDATE Event e
        SET e.url = :imageUrl
        WHERE e.id = :eventId
    """)
    void updateImageUrl(Integer eventId, String imageUrl);

}
