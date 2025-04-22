# Sử dụng Node.js image chính thức
FROM node:18

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .
# Sao chép toàn bộ mã nguồn backend
COPY ../Trello/BE-C-TN-Trello ./backend

# Sao chép toàn bộ mã nguồn frontend
COPY ../Trello/FE-C-TN-Trello ./frontend

# Biên dịch frontend
WORKDIR /app/frontend
RUN npm run build

# Chạy ứng dụng
CMD ["npm", "run", "start:prod"]

# Mở cổng
EXPOSE 3000