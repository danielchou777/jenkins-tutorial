pipeline {
    agent any
    parameters {
        extendedChoice(name: 'GIT_BRANCH', description: 'Select Git branch or tag to build', type: 'PT_SINGLE_SELECT', groovyScript: [
            script: '''
                def proc = ['git', 'ls-remote', '--heads', '--tags', 'https://github.com/danielchou777/jenkins-tutorial.git'].execute()
                proc.waitFor()
                def branches = proc.in.text.readLines().collect { it.split()[1].replaceAll('refs/heads/', '').replaceAll('refs/tags/', '') }
                return branches.join(',')
            ''',
            sandbox: true
        ])
    }
    environment {
        // Create a sanitized Docker tag by replacing slashes with underscores
        DOCKER_TAG = "${GIT_BRANCH.replaceAll('/', '_')}"
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
                // Checkout the specified branch or tag
                checkout([$class: 'GitSCM',
                    branches: [[name: "${GIT_BRANCH}"]],
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
