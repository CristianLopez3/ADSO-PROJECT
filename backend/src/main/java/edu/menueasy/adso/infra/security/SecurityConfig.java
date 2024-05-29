package edu.menueasy.adso.infra.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${project.frontendPath}")
    private String FRONTEND_PATH;
    private final UserDetailsServiceImpl customUserDetailsService;
    private final JWTAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;

    public SecurityConfig(UserDetailsServiceImpl customUserDetailsService,
                          JWTAuthenticationFilter jwtAuthenticationFilter,
                          JwtAuthEntryPoint jwtAuthEntryPoint) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Cors configuration
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(config -> config.authenticationEntryPoint(jwtAuthEntryPoint))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/api/v1/auth/register/**",
                                "/v2/api-docs",
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/swagger-resources",
                                "/swagger-resources/**",
                                "/configuration/ui",
                                "/configuration/security",
                                "/swagger-ui/**",
                                "webjars/**",
                                "/swagger-ui.html").permitAll()
                        .requestMatchers("/api/v1/auth/login/**").permitAll()
                        .requestMatchers("/api/v1/file/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/menus/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/category/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/reservations/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/events/**").permitAll()
                        .anyRequest().authenticated()
                )
                .userDetailsService(customUserDetailsService)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // configuring allowed source
        configuration.setAllowedOrigins(Arrays.asList(FRONTEND_PATH,
                "*", "**"));
        // Setting allowed methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"));
        //Setting Allowed Headers
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        // Allow credentials
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
