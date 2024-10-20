# Ecommerce

- Sử dụng các middleware để log, giảm tải băng thông, lọc http chặn đọc cookie như **morgan, helmet, compression**
- Các cách kết nối mongodb, ưu điểm khi sử dụng singleton, kiểm tra có bao nhiêu kết nối hiện tại
- Check kết nối quá tải, chỉ định pool size cho kết nối
- Code register sử dụng 2 key public và private trong quá trình ký jwt
  - Sử dụng key random: check email > mã hoá password > create user > create 2 key và lưu vô db > ký jwt tạo accessToken và refreshToken dùng privateKey sau đó verify dùng publicKey
  - Sử dụng thuật toán rsa: check email > mã hoá password > create user > create 2 key dùng thuật toán rsa và lưu vô db mỗi publicKey > ký jwt tạo accessToken và refreshToken dùng privateKey sau đó verify dùng publicKey
- Code check x-api-key để xem route đó có được truy cập không. Các api key này sẽ được bên đối tác cung cấp và mỗi user sẽ có api key riêng biệt. Api key này nó sẽ được đặt trong proxy server chứ không đưa cho client trên browser. Proxy nó sẽ có nhiệm vụ giấu api key ở đó và làm trung gian cho việc request từ client tới server
  - Khi login client sẽ gửi info tới proxy => proxy cầm api key + info call tới backend => backend trả về thông data cho proxy => gửi về cho client
  - Vd: Này thường hay dùng các gói dịch vụ truy cập route đó limit 30k request và người ta tính số lượng request thông qua api key
- Code xử lý handling error trả về cho client, xử lý không cần phải try catch bằng cách tạo các success và error để ném ra xử lý 
