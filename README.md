

[![Build Status](https://app.travis-ci.com/mendezigna/linea-de-tiempo.svg?branch=main)](https://app.travis-ci.com/mendezigna/linea-de-tiempo)




<p style="clear: both;"><h1 style="color: #5e9ca0;"><img style="float: left;" src="https://user-images.githubusercontent.com/40266351/133190613-73822ed0-a8a9-400a-bad2-ce69fd9ac5dc.png" alt="interactive connection" /> Linea de tiempo</h1></p>

Aplicacion para crear, editar y visualizar lineas de tiempo de una forma facil y accesible.

## Requerimientos
  - [Node.js ^14.x.x](https://nodejs.org/es/)
  - [MongoDB](https://docs.mongodb.com/manual/installation/)

## Instalación

1. ### Clonar repositorio:
    <pre><code>git clone https://github.com/mendezigna/linea-de-tiempo.git</pre></code>
2. ### Intalación de backend:
  - Dirigirse a la carpeta [app](https://github.com/mendezigna/linea-de-tiempo/tree/main/app) que se encuentra en la raiz del proyecto
  - Instalar dependencias: 
    ```
    npm install
      ```
  - Cree un archivo [.env](https://github.com/mendezigna/linea-de-tiempo/blob/main/app/.env.dist) dentro de la carpeta y configurelo utilizando como base el archivo [.env.dist](https://github.com/mendezigna/linea-de-tiempo/blob/main/app/.env.dist). Luego, asigne los valores correspondientes a cada variable.<br>
    - ```MONGO:``` url de la base de datos. <br>
    - ```PORT:``` puerto en el que se ejecutara el backend.<br>
    - ```TOKEN_KEY:``` clave para el jwt.
  - Correr el servidor: 
    ```
    node index
    ```
3. ### Instalación de frontend:
  - Dirigirse a la carpeta [angular](https://github.com/mendezigna/linea-de-tiempo/tree/main/angular) que se encuentra en la raiz del proyecto
  - Instalar dependencias:
    ```
    npm install
    ```
  - Correr el servidor:
    ```
    npm start
    ```
  - Dirigirse a https://localhost:4200/

## Licencia

[Mozilla Public License Version 2.0](https://github.com/mendezigna/linea-de-tiempo/blob/main/LICENSE)

## Trello
https://trello.com/b/nWcGsWT6/linea-de-tiempo

<!--
![timeline-logo](https://user-images.githubusercontent.com/40266351/133190613-73822ed0-a8a9-400a-bad2-ce69fd9ac5dc.png)
Que haces mirando esto? Chusma!-->
