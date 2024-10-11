pipeline {
    agent any
    stages {
        stage('Cleanup') {
            steps {
                sh 'docker rm -f jenkins-tutorial || true'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t my-app .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 --name jenkins-tutorial my-app'
            }
        }
    }
}
