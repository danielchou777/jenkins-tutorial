pipeline {
    agent { 
        docker { 
            image 'node:20-alpine' 
        } 
    }
    stages {
        stage('install') {
            steps {
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
