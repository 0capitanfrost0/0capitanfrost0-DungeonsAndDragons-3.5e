FROM node:18-alpine

WORKDIR /MBT_React_App

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]