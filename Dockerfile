# Use Node 20 alpine as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (ignoring scripts to avoid errors if any)
RUN npm install --ignore-scripts

# Copy source code
COPY . .

# Expose port (default 3001 based on index.js)
EXPOSE 3001

# Start command
# Using node directly instead of nodemon for production container
CMD ["node", "src/index.js"]
