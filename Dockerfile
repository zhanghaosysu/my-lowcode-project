FROM node:18.12.0 AS build
COPY . /frontend
WORKDIR /frontend
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN cnpm run build

FROM nginx
COPY --from=build /frontend/dist/ /usr/share/nginx/html/
