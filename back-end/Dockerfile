FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npx prisma generate
# Expose the port the app runs on
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]

#CMD [ "npm", "run",  "dev", "npx", "nodemon", "src/app.ts" ]
# build command = docker build -t itip-demo-backend .
# run command = docker run -p 3000:3000 itip-demo-backend
# end comamand = docker ps => docker stop <container_id>
#CMD [ "npm", "run",  "dev" ]