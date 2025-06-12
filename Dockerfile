FROM alpine:latest AS builder
COPY . /website
RUN apk add hugo
WORKDIR /website
RUN hugo

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /website/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
