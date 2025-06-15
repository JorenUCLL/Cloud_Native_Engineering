FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# Expose the port the app runs on
EXPOSE 8080
# Start the app
CMD [ "npm", "run", "dev", "--", "-H", "0.0.0.0" ]

# build command = docker build -t cloud-native-backend .
# run command = docker run -p 8080:8080 cloud-native-backend
# end comamand = docker ps => docker stop <container_id>