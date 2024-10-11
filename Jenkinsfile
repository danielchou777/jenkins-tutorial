pipeline {
    agent any
    environment {
        // Remove 'origin/' prefix from GIT_BRANCH if present
        SANITIZED_BRANCH = "${GIT_BRANCH.startsWith('origin/') ? GIT_BRANCH.replaceFirst('origin/', '') : GIT_BRANCH}"
        // Create a sanitized Docker tag by replacing slashes with underscores
        DOCKER_TAG = "${SANITIZED_BRANCH.replaceAll('/', '_')}"
    }
    stages {
        stage('Set Build Display Name') {
            steps {
                script {
                    currentBuild.displayName = "#${BUILD_NUMBER} - ${SANITIZED_BRANCH}"
                }
            }
        }
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: "${SANITIZED_BRANCH}"]],
                    userRemoteConfigs: [[url: 'https://github.com/danielchou777/jenkins-tutorial.git']]
                ])
            }
        }
        stage('Cleanup') {
            steps {
                // Stop and remove any existing Docker container with the same name
                sh 'docker stop jenkins-tutorial || true'
                sh 'docker rm jenkins-tutorial || true'
            }
        }
        stage('Build') {
            steps {
                // Build the Docker image with the sanitized tag
                sh "docker build -t my-app:${DOCKER_TAG} ."
            }
        }
        stage('Deploy') {
            steps {
                // Run the Docker container from the image, mapping port 3000
                sh "docker run -d -p 3000:3000 --name jenkins-tutorial my-app:${DOCKER_TAG}"
            }
        }
    }
    post {
        always {
            echo 'Build completed.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
