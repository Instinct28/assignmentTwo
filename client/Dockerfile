# Use Node.js as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you're using Yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Install serve to serve the built files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5173

# Start the application using serve
CMD ["serve", "-s", "dist"]
