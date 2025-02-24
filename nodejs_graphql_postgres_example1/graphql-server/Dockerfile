# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the port the server runs on
EXPOSE 4000

# Run Prisma migrations before starting the server
CMD npx prisma migrate deploy && node index.js

