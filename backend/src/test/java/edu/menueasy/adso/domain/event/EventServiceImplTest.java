package edu.menueasy.adso.domain.event;


import edu.menueasy.adso.s3.S3Buckets;
import edu.menueasy.adso.s3.S3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("EventServiceImplTest")
class EventServiceImplTest {

    private EventServiceImpl underTest;

    @Mock
    private  EventRepository eventRepository;
    @Mock
    private  S3Service s3Service;
    @Mock
    private  S3Buckets s3Buckets;


    @BeforeEach
    void setUp() {
        underTest = new EventServiceImpl(eventRepository, s3Service, s3Buckets);
    }

    @Test
    @DisplayName("Test findEventById")
    void findEventById() {
        Event event = new Event();
        when(eventRepository.findById(any(Integer.class))).thenReturn(Optional.of(event));

        Event result = underTest.findEventById(1);

        assertEquals(event, result);
        Mockito.verify(eventRepository).findById(any(Integer.class));
    }

    @Test
    @DisplayName("Test updateEvent with image")
    void updateEvent() {
        Event event = new Event();
        when(eventRepository.findById(any(Integer.class))).thenReturn(Optional.of(event));
        when(eventRepository.save(any(Event.class))).thenReturn(event);

        Event result = underTest.updateEventData(1, event);

        assertEquals(event, result);
        Mockito.verify(eventRepository).findById(any(Integer.class));
        Mockito.verify(eventRepository).save(any(Event.class));
    }


    /**
     * eq(s3Buckets.getImages())
     * indica que el primer argumento pasado al método getObject debe ser igual a s3Buckets.getImages().
     * Si el método se llama con un primer argumento diferente, el stub no coincidirá y Mockito
     * no devolverá imageByte
     */
    @Test
    @DisplayName("Test getEventImage")
    void getEventImage() {
        byte[] imageBytes = new byte[10];
        Event event = new Event();
        event.setUrl("MOCK_URL");
        when(eventRepository.findById(any(Integer.class))).thenReturn(Optional.of(event));
        when(s3Service.getObject(eq(s3Buckets.getImages()), any(String.class))).thenReturn(imageBytes);

        byte[] result = underTest.getEventImage(1);

        assertArrayEquals(imageBytes, result);
        Mockito.verify(eventRepository).findById(any(Integer.class));
        Mockito.verify(s3Service).getObject(eq(s3Buckets.getImages()), any(String.class));
    }


}