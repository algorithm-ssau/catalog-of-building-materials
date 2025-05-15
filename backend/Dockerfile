FROM openjdk:21-jdk-slim-buster
WORKDIR /app
COPY /target/Building-Materials-0.0.1-SNAPSHOT.jar /app/building-materials.jar
ENTRYPOINT ["java", "-jar", "building-materials.jar"]