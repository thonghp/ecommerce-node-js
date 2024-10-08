# Ecommerce

- Sử dụng các middleware để log, giảm tải băng thông, lọc http chặn đọc cookie như **morgan, helmet, compression**
- Các cách kết nối mongodb, ưu điểm khi sử dụng singleton, kiểm tra có bao nhiêu kết nối hiện tại
- Check kết nối quá tải, chỉ định pool size cho kết nối
- Code register sử dụng 2 key public và private trong quá trình ký jwt
  - Sử dụng key random: check email > mã hoá password > create user > create 2 key và lưu vô db > ký jwt tạo accessToken và refreshToken dùng privateKey sau đó verify dùng publicKey
  - Sử dụng thuật toán rsa: check email > mã hoá password > create user > create 2 key dùng thuật toán rsa và lưu vô db mỗi publicKey > ký jwt tạo accessToken và refreshToken dùng privateKey sau đó verify dùng publicKey 
