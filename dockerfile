# Sử dụng Node.js image
FROM node:18

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt NestJS CLI toàn cục
RUN npm install -g @nestjs/cli

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở cổng
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start:dev"]