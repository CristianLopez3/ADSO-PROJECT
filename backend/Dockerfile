FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/app_menuEasy-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_menuEasy.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_menuEasy.jar"]
