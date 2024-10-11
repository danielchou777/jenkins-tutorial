pipeline {
    agent any
    environment {
        // Create a sanitized Docker tag by replacing slashes with underscores
        DOCKER_TAG = "${GIT_BRANCH.replaceAll('/', '_')}"
        CHECKOUT_REF = "${GIT_BRANCH}"
    }
    stages {
        stage('Set Build Display Name') {
            steps {
                script {
                    currentBuild.displayName = "#${BUILD_NUMBER} - ${GIT_BRANCH}"
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
                script {
                    // Initialize Git repository
                    sh 'git init'

                    // Add remote
                    sh 'git remote add origin https://github.com/danielchou777/jenkins-tutorial.git'

                    // Fetch all branches and tags
                    sh 'git fetch --all'

                    // Determine if GIT_BRANCH is a tag or branch
                    def isTag = sh(script: "git rev-parse --verify refs/tags/${GIT_BRANCH}", returnStatus: true) == 0

                    if (isTag) {
                        sh "git checkout tags/${GIT_BRANCH}"
                    } else {
                        sh "git checkout ${GIT_BRANCH}"
                    }
                }
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
