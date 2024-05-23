
# Use the official maven/Java 17 image to create a build artifact.
# This is based on Debian and sets the MAVEN_HOME environment variable
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the image to /app
WORKDIR /app

# Copy the pom.xml file
COPY ./pom.xml ./pom.xml

# Build all dependencies for offline use
RUN mvn dependency:go-offline -B

# Copy your other files
COPY ./src ./src

# Build the project and package it as a jar
RUN mvn clean package

# Use openjdk:17-jdk-slim for the runtime stage of the dockerfile
FROM openjdk:17-jdk-slim

# Set the working directory in the image to /app
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

#FROM openjdk:17-jdk-slim
#EXPOSE 8080
##COPY target/adsoproject-github.jar adsoproject-github.jar
#ADD target/adsoproject-github.jar  adsoproject-github.jar
#ENTRYPOINT ["java", "-jar", "/adsoproject-github.jar"]


# FROM openjdk:17-jdk-slim
# ARG JAR_FILE=target/adsoproject-github.jar
# COPY ${JAR_FILE} adsoproject-github.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "adsoproject-github.jar"]
