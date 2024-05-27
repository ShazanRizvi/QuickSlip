# Use the official Node.js 16 image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Vite application
RUN npm run build

# Copy the startup script into the container
COPY startup.sh .

# Make the startup script executable
RUN chmod +x startup.sh

# Expose the port the app runs on
EXPOSE 3000

# Use the startup script as the entrypoint
CMD ["./startup.sh"]
