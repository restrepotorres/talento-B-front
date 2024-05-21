FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]

# npm run build
# npm run preview
# docker build -t react-app .
# docker run -d --rm -p 3000:3000 --name talento-b-front react-app
