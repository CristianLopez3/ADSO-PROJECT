package edu.menueasy.adso;

import edu.menueasy.adso.s3.S3Buckets;
import edu.menueasy.adso.s3.S3Service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@SpringBootApplication
public class AdsoApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdsoApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
            System.out.println("=====================================================");
            System.out.println("Hello, from the console in " + new Date());
            System.out.println("=====================================================");
        };
    }

}
