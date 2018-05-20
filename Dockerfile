FROM node:8

# Environments
ENV NDOE_ENV=production

# 사용자 및 작업위치 설정
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# dependencies
COPY package.json .
RUN npm install

# copy app source
COPY . .

USER node
CMD ["npm", "start"]
