# Use Node.js as the base image
FROM node:18.9.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you're using Yarn)
COPY package*.json ./

# Install dependencies with legacy peer dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Start the application using serve
CMD ["npm", "run", "dev"]
