# Sử dụng Node.js image
FROM node:18

# Tạo thư mục làm việc
WORKDIR /app/backend

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Chạy ứng dụng
CMD ["npm", "run", "start:prod"]

# Mở cổng
EXPOSE 3000