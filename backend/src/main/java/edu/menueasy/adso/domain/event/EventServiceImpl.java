package edu.menueasy.adso.domain.event;

import edu.menueasy.adso.infra.exceptions.ResourceNotFoundException;
import edu.menueasy.adso.s3.S3Buckets;
import edu.menueasy.adso.s3.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;


@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    @Value("${project.image}")
    private String PATH;


    @Autowired
    public EventServiceImpl(EventRepository eventRepository, S3Service s3Service,
                            S3Buckets s3Buckets) {
        this.eventRepository = eventRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }


    @Override
    public Event findEventById(Integer eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }


    @Override
    public Event updateEventData(Integer id, Event eventDetails) {
        Event existingEvent = eventRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Event with id " + id + " not found")
        );
        existingEvent.setTitle(eventDetails.getTitle());
        existingEvent.setDescription(eventDetails.getDescription());
        existingEvent.setDiscount(eventDetails.getDiscount());

        return eventRepository.save(existingEvent);
    }


    @Override
    public void updateEventImageUrl(Integer eventId, MultipartFile image) {
        checkIfEventExists(eventId);
        String eventImageId = UUID.randomUUID().toString();
        try {
            s3Service.putObject(
                    s3Buckets.getImages(),
                    "/events-images/%s/%s".formatted(eventId, eventImageId),
                    image.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        eventRepository.updateImageUrl(eventId, eventImageId);
    }


    @Override
    public byte[] getEventImage(Integer eventId) {
        var event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event with id " + eventId + " not found"));

        if(event.getUrl().isBlank()) {
            throw new ResourceNotFoundException(
                    "event with id [%s] has no image".formatted(eventId));
        }

        return s3Service.getObject(
                s3Buckets.getImages(),
                "/events-images/%s/%s".formatted(eventId, event.getUrl()));
    }


    private void checkIfEventExists(Integer id) {
        Event existingEvent = eventRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Event with id " + id + " not found")
        );
    }





}

