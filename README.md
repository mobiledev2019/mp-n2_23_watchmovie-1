Phát triển ứng dụng cho các thiết bị di dộng
Đề tài: Xây dựng App xem phim online
o	Lê Phúc Diên Hưng		B15DCCN256
o	Nguyễn Hữu Tài		B15DCCN476
o	Nguyễn Hữu Thiệp		B15DCCN531
I.	Đặt vấn đề
- Giải trí là hoạt động trong thời gian rỗi, nhằm giải tỏa căng thẳng trí não, tạo sự hứng thú cho mỗi người và là điều kiện phát triển bản thân một cách toàn diện về trí tuệ, thể lực và thẩm mỹ.
- Xem phim cũng là một trong những hình thức giải trí phổ biến. Nhu cầu xem phim ngày càng cao khi xã hội càng phát triển, việc tìm kiếm các tác phẩm phim trước đây thường khó khăn do phụ thuộc phần nhiều vào các nhà xuất bản, các thể loại đều ít về cả số lượng lẫn chất lượng. 
- Hiện nay, với công nghệ phát triển ta có thể tìm kiếm phim một cách đơn giản trên mạng, tuy nhiên ta lại gặp phải vấn đề về chọn lựa các tác phẩm. Phim được tìm kiếm bằng google nhiều nhưng thường không đảm bảo về chất lượng.
- Với nhưng đòi hỏi kể trên, việc ra đời một ứng dụng xem phim trên điện thoại là hoàn toàn cần thiết và khả thi. Vừa đáp ứng được nhu cầu xem phim của mọi người vừa tận dụng được các thế mạnh của những chiếc điện thoại thông minh là tiện dụng, nhỏ gọn và có thể mang theo mọi nơi.
II.	Tổng quan về Ứng dụng xem phim online
2.1	 Những tính năng nổi bật của ứng dụng
- Xem phim mới cập nhật liên tục.
- Tải phim và sau đó xem phim offline không cần wifi hay 3G.
- Phim chia theo nhiều thể loại phù hợp với sở thích của từng người như: phim siêu anh hùng, phim tâm lí, ngôn tình, …
- Theo dõi phim, nhận thông báo khi có phim mới.
- Giao diện đơn giản dễ sử dụng
- Đánh giá bình luận phim
- Lưu đoạn, phim đang xem dở khi thoát ứng dụng.
2.2	 Phân tích chi tiết yêu cầu hệ thống
-	App sẽ sử dụng mô hình client-server để lấy thông tin.
-	Đối với đề tài này, trước tiên ta phải thiết kế csdl có khả năng lưu
riêng biệt phim, các tập của nó, tác giả (bao gồm miêu tả,...), danh sách các thể loại(tên, miêu tả...), bảng thông báo (để sử dụng gửi tin cho mỗi tài khoản khi họ theo dõi phim bất kỳ), các bình luận của tác giả,…
-	Sau khi có bảng dữ liệu, ta cần xây dựng server để gọi các API từ
phía client (android). Ở đây em sử dụng python với farmwork flask để làm server, server phụ trách các xử lý logic,.. và vận chuyển dữ liệu qua giao thức HTTP, kiểu dữ liệu trả về sẽ là json.
-	Phía bên client sẽ tìm cách gọi API, parse dữ liệu dạng json sang từng
đối tượng tương ứng, sau đó hiển thị lên giao diện tương tác người dùng.
-	Về chức năng đọc offline: khi có mạng, có thể tùy chọn để tải phim 
về, lưu chúng vào mongoDB, sau này có thể chạy app ở môi trường offline và load các phim đã được tải về.
