# Doan_1_Backend

docker build -t backend-app .
docker run -d -p 3001:3001 --env-file .env backend-app
