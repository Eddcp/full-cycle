# Use the official NGINX stable alpine image
FROM nginx:stable-alpine

# Copy custom configuration file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]