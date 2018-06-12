FROM node:10.1.0
RUN mkdir /html
WORKDIR /html

COPY package.json /html
# set taobao source package
# RUN npm config set registry
# RUN npm install cnpm --registry=https://registry.npm.taobao.org
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY . /html
# EXPOSE 8088
RUN npm run build
