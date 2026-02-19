# Use Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run development server
CMD ["npm", "run", "dev"]
