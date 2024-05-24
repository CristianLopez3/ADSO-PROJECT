# CI CD 

CI - CD is a process of automating the process of integrating code changes from multiple contributors 
into a single software project. It is a practice that enables developers to commit code changes to
a shared repository multiple times a day. The CI/CD process is a combination of continuous
integration and continuous delivery. This process helps to automate the building, testing, and
deployment of applications. CI/CD is a practice that helps to improve the quality of the software
development.

## GitHub Actions 

GitHub Actions is a CI/CD tool that allows developers to automate the process of building, testing,
and deploying applications. It is a feature of GitHub that enables developers to create custom
workflows that can be triggered by events such as push, pull request, issue, etc.

### Possibly attempts

````yml
- name: Set build number
  id: build-number
  run: echo "BUILD_NUMBER=$(date '+%d.%m.%Y.%H.%M.%S')" >> $GITHUB_OUTPUT
````

````yml
# This Workflow will build and deploy the Spring Boot application to Docker Hub

name: Build & Deploy Spring app

on:
  push:
    branches:
      - main
    paths:
      - 'docker-compose.yml'
      - 'backend/**'
      - '.github/workflows/backend.yml'

jobs:
  build-deploy:
    name: Build and Deploy Spring boot for beginner
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup JDK 17
        uses: actions/setup-java@v3
        with:
          distribution: 'corretto'
          java-version: 17

      - name: Unit Tests
        run: mvn -B test --file pom.xml

      - name: Build the application
        run: |
          mvn clean
          mvn -B package --file pom.xml

      - name: Build Docker Image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          dockerfile: Dockerfile
          push: false
          tags: cristianlopezcma/menueasy:today

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

      - name: Push to Docker Hub
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          dockerfile: Dockerfile
          push: true
          tags: cristianlopezcma/menueasy:today
````