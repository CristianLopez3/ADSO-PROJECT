package edu.menueasy.adso.infra.docs;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Menu Easy",
                        email = "cristian.c.lopez.m@gmail.com",
                        url = "https://github.com/CristianLopez3"
                ),
                description = "API for Menu Easy application",
                title = "Menu Easy API - ADSO",
                version = "1.0",
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"
                ),
                termsOfService = "https://opensource.org/licenses/MIT"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080"
                ),

                @Server(
                        description = "Prod ENV",
                        url = "http://spring-api-easy.us-east-1.elasticbeanstalk.com"
                ),
        }
)
public class SwaggerInfo {

}
