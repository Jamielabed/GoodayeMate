# Use an official Node.js runtime as a parent image with a compatible version
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use an Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app to the Nginx HTML directory
COPY --from=build /app/dist/australian-chatbot-frontend/browser /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]