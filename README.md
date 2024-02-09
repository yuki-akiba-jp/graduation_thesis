# Graduation Thesis Project
## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Git**: Required for cloning and managing the project repository.
- **Docker & Docker Compose**: Essential for building and running the project within containerized environments.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Installation

1. **Clone the repository**

   Use Git to clone the project's repository to your local machine. Open a terminal and run the following command:

   ```bash
   git clone https://github.com/yuki-akiba-jp/graduation_thesis.git
   cd graduation_thesis
   ```

2. **Set up using Docker**

   Ensure Docker and Docker Compose are correctly installed and configured on your system. This project utilizes Docker to simplify dependency management and environment setup. To build and start the project, execute:

   ```bash
   docker-compose up
   ```
   and visit ```localhost:3000```

3. **connect to mongodb running in the docker

```
    docker ps
```
```
    docker exec -it <mongodb's container id> bash
```
```
    mongosh "mongodb://mongoadmin:secret@localhost:27017/mydatabase?authSource=admin"
```
```
    show dbs
```
after showing dbs, you can see collections using mongodb's command.
