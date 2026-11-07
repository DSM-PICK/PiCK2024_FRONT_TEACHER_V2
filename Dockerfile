# syntax=docker/dockerfile:1.10
FROM node:22-alpine AS build

RUN corepack enable && corepack install --global yarn@4.10.3
WORKDIR /app

COPY ./ .

ARG VITE_PUBLIC_FILE_APP
ARG VITE_SERVER_BASE_URL
ARG VITE_VAPID_KEY

ENV VITE_PUBLIC_FILE_APP=${VITE_PUBLIC_FILE_APP} \
    VITE_SERVER_BASE_URL=${VITE_SERVER_BASE_URL} \
    VITE_VAPID_KEY=${VITE_VAPID_KEY}

RUN --mount=type=secret,id=vault_env \
    if [ -f /run/secrets/vault_env ]; then set -a; . /run/secrets/vault_env; set +a; fi && \
    yarn install --immutable && \
    yarn build

FROM nginx:alpine

RUN apk add --no-cache tzdata wget

COPY --from=build /app/dist /usr/share/nginx/html

RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

RUN rm -f /etc/nginx/conf.d/default.conf.default

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
