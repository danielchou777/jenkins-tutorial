pipeline {
    agent { 
        docker { 
            image 'node:20-alpine' 
        } 
    }
    stages {
        stage('install') {
            steps {
                // Run npm install with sudo if needed
                sh 'sudo npm config set cache $(pwd)/.npm-cache --global || npm config set cache $(pwd)/.npm-cache --global'
                sh 'sudo npm install || npm install'
            }
        }
        stage('build') {
            steps {
                // Run the build command
                sh 'sudo npm run start || npm run start'
            }
        }
    }
}
