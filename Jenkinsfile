pipeline {
    agent any

    stages {

        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                sh 'npm test'
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh 'docker build -t codecraft-api .'
            }
        }
    }
}
