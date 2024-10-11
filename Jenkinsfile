pipeline {
    agent { 
        docker { 
            image 'node:20-alpine' 
        } 
    }
    environment {
        // Set the NPM cache directory using an environment variable
        NPM_CONFIG_CACHE = "${pwd()}/.npm-cache"
    }
    stages {
        stage('install') {
            steps {
                // Remove 'sudo' and avoid global configurations
                sh 'npm install'
            }
        }
        stage('build') {
            steps {
                // Remove 'sudo' and run your build command
                sh 'npm ci'
            }
        }
    }
}
