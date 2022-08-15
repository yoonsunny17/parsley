FROM openjdk:8-jdk-oracle as builder
# COPY gradlew .
# COPY gradle gradle
# COPY build.gradle .
# COPY settings.gradle .
# COPY src src
COPY ./parsley/backend .
COPY application.properties ./src/main/resources/
COPY keystore.p12 ./src/main/resources/ssl/
RUN chmod +x ./gradlew
RUN ./gradlew bootJAR

FROM openjdk:8-jdk-oracle
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
