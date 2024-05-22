package edu.menueasy.adso.s3;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("S3BucketsTest")
class S3BucketsTest {

    S3Buckets s3Buckets;

    @BeforeEach
    void setUp() {
        s3Buckets = new S3Buckets();
    }

    @Test
    @DisplayName("Test getImages")
    void testGetImages() {
        String expected = "testImage";
        s3Buckets.setImages(expected);
        assertEquals(expected, s3Buckets.getImages());
    }

    @Test
    @DisplayName("Test setImages")
    void testSetImages() {
        S3Buckets s3Buckets = new S3Buckets();
        String expected = "testImage";
        s3Buckets.setImages(expected);
        assertEquals(expected, s3Buckets.getImages());
    }

}