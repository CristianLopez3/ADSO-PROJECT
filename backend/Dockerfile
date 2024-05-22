
FROM openjdk:17-jdk-slim
# COPY target/adsoproject-github.jar adsoproject-github.jar
EXPOSE 8080
ADD target/adsoproject-github.jar  adsoproject-github.jar
ENTRYPOINT ["java", "-jar", "adsoproject-github.jar"]


# FROM openjdk:17-jdk-slim
# ARG JAR_FILE=target/adsoproject-github.jar
# COPY ${JAR_FILE} adsoproject-github.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "adsoproject-github.jar"]
