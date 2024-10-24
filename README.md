# Assignment Two

This repository contains the implementation of Assignment Two, which involves creating a weather monitoring application. The project is structured with a separate frontend and backend, both containerized using Docker for easy deployment and management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time weather data retrieval from the OpenWeatherMap API.
- User-friendly interface developed using React.
- Fully containerized using Docker for seamless deployment.
- Organized code structure with a clear separation between frontend and backend services.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **API**: OpenWeatherMap API
- **Containerization**: Docker

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) 
- A Docker Hub account (optional for pushing images)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Instinct28/assignmentTwo.git
cd assignmentTwo
```
### Firstly start server : 
```bash
cd server
```
### Create .env file inside server and paste your code : 
```bash
API_KEY = YOUR_API_KEY
MONGO_URI = PASTE_MONGO_URI_HERE
```

### Then start server
```bash
npm i
npm start
```

### Then start client : 
```bash
cd client
npm install --force
npm run dev
```

### Running with Docker
 - [Docker repository Link] (https://hub.docker.com/r/instinctyash/assignmenttwo)
```bash
docker pull instinctyash/assignmenttwo
```