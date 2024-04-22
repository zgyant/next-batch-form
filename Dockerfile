# Use Node.js as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the rest of the application code (excluding files and folders specified in .dockerignore)
COPY . .

# Install dependencies
RUN npm install

# Build dev bundle
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]