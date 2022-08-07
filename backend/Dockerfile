FROM openjdk:8-jdk-alpine as builder
# COPY gradlew .
# COPY gradle gradle
# COPY build.gradle .
# COPY settings.gradle .
# COPY src src
COPY ./parsley/backend .
COPY application.properties ./src/main/resources/
RUN chmod +x ./gradlew
RUN ./gradlew bootJAR

FROM openjdk:8-jdk-alpine
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=dockerembbed,oauth-security", "-jar", "/app.jar"]
