pipeline {
    agent { 
        docker { 
            image 'node:20-alpine' 
        } 
    }
    stages {
        stage('install') {
            steps {
                sh 'npm config set cache $(pwd)/.npm-cache --global'
                sh 'npm install'
            }
        }
        stage('build') {
            steps {
                sh 'npm run start'
            }
        }
    }
}
