# Stage 1: Build the frontend
FROM node:16-alpine as build-frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend package.json and package-lock.json
COPY ./Frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY ./Frontend .

# Build the frontend
RUN npm run build

# Stage 2: Build the backend and combine frontend build
FROM node:16-alpine

# Set the working directory for the backend
WORKDIR /app

# Copy the backend package.json and package-lock.json
COPY ./server/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code
COPY ./server .

# Copy the built frontend from the previous stage
COPY --from=build-frontend /app/frontend/dist ./public

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["node", "index.js"]
