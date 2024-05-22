
FROM openjdk:17-jdk-slim
EXPOSE 8080
#COPY target/adsoproject-github.jar adsoproject-github.jar
ADD target/adsoproject-github.jar  adsoproject-github.jar
ENTRYPOINT ["java", "-jar", "/adsoproject-github.jar"]


# FROM openjdk:17-jdk-slim
# ARG JAR_FILE=target/adsoproject-github.jar
# COPY ${JAR_FILE} adsoproject-github.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "adsoproject-github.jar"]
