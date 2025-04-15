
# 📊 Reporte de Configuración del Pipeline – CodeCraft API

## 🧠 Descripción General
Este proyecto consiste en una API básica desarrollada en Node.js para la gestión de tareas. Como parte del proceso de automatización, se implementó un pipeline de integración continua utilizando Jenkins, junto con la contenerización de la aplicación mediante Docker.

---

## 1. ✅ Gestión del Repositorio Git

- Se inicializó un repositorio local con el siguiente comando:
  ```bash
  git init
  ```
- Se creó un archivo `README.md` con una breve descripción del proyecto y se hizo un commit inicial:
  ```bash
  git add README.md
  git commit -m "Commit inicial con README"
  ```
- Se creó un repositorio en GitHub:  
  `https://github.com/blancadevux/codecraft-api.git`
- Se conectó el repositorio remoto y se hizo push del código:
  ```bash
  git remote add origin https://github.com/blancadevux/codecraft-api.git
  git push -u origin main
  ```

---

## 2. 🐳 Contenerización con Docker

- Se creó un `Dockerfile` que contiene la configuración para levantar la API:
  
```dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

- Esta imagen permite que la API corra en cualquier entorno con Docker.  
- Para construir y correr la imagen:
  ```bash
  docker build -t codecraft-api .
  docker run -p 3000:3000 codecraft-api
  ```

---

## 3. ⚙️ Configuración del Pipeline en Jenkins

- Se configuró un `Jenkinsfile` con las siguientes etapas:

```groovy
pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git 'https://github.com/blancadevux/codecraft-api.git'
            }
        }

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
```

- Jenkins se conectó a GitHub usando el plugin Git.
- Se configuró el acceso a Docker en el entorno de Jenkins.

---

## 4. 🧪 Resultados de las pruebas

- Se ejecutaron las pruebas automáticas con `npm test`.
- Las pruebas unitarias (definidas en `tests/app.test.js`) verificaron correctamente el funcionamiento de los endpoints `/tasks` y `/tasks/:id`.
- Todos los tests pasaron satisfactoriamente.

---

## 5. 📝 Problemas encontrados

- Inicialmente, el `Dockerfile` mezclaba instrucciones de Jenkins y Node.js, lo que fue corregido separando el entorno de la API.
- Fue necesario otorgar permisos al usuario Jenkins para poder usar Docker desde el pipeline.
- Se agregaron las dependencias necesarias en `package.json` para asegurar la ejecución de pruebas (Jest y Supertest).
- Se verificó que el contenedor escucha en el puerto correcto (3000).

---

## 6. 📸 Evidencias

_(Aquí deberás subir capturas de pantalla como parte del entregable final)_

- Captura del pipeline ejecutándose en Jenkins.
- Resultado de las pruebas en consola.
- Imagen construida correctamente.
- Ejecución del contenedor y respuesta en `http://localhost:3000/tasks`.

---

## ✅ Conclusión

La automatización del ciclo de integración continua en este proyecto fue exitosa. Se logró implementar una API funcional y portable gracias a Docker, y Jenkins automatizó de forma efectiva las tareas de instalación, testing y construcción. Esto garantiza un flujo de trabajo más ágil, confiable y fácil de escalar en el futuro.
