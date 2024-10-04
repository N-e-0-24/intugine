# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "start"]
