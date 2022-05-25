FROM node:16-slim as tep

WORKDIR /code

COPY . /code

RUN npm install

CMD ["npm", "run", "prd"]
