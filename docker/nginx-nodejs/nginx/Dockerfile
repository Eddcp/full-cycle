# Use the official NGINX stable alpine image
FROM nginx:stable-alpine

# Copy custom configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files (e.g., HTML, CSS, JS) to NGINX's default web root
COPY static-files /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]