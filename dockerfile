FROM node:21

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app
RUN npm install

COPY src /app

CMD ["npm", "start"]

