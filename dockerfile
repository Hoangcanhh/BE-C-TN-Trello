# Sử dụng Node.js làm base image
FROM node:22-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json của backend
COPY ./be-trello/package*.json ./backend/

# Sao chép package.json và package-lock.json của frontend
COPY ./fe-trello-vite/package*.json ./frontend/

# Cài đặt dependencies cho backend
WORKDIR /app/backend
RUN npm install

# Cài đặt dependencies cho frontend
WORKDIR /app/frontend
RUN npm install

# Sao chép toàn bộ mã nguồn backend
COPY ../Trello-CD/be-trello ./backend

# Sao chép toàn bộ mã nguồn frontend
COPY ../Trello-CD/fe-trello-vite ./frontend

# Biên dịch frontend
WORKDIR /app/frontend
RUN npm run build

# Quay lại thư mục backend để chạy server
WORKDIR /app/backend

# Mở cổng mà ứng dụng sẽ lắng nghe
EXPOSE 3000

# Lệnh để chạy cả backend và frontend
CMD ["sh", "-c", "node server.js & serve -s /app/frontend/dist -l 8080"]