// 1. Khởi tạo dữ liệu khi trang web tải xong
window.onload = function() {
    updateDashboard();
};

// 2. Hàm cập nhật các con số trên Dashboard (Tổng hàng, khách, hóa đơn)
function updateDashboard() {
    // Tổng số lượng hàng tồn kho (Dữ liệu từ data.js)
    const totalProd = HangHoa.reduce((sum, item) => sum + item.SoLuong, 0);
    document.getElementById('totalProducts').innerText = totalProd.toLocaleString();

    // Tổng khách hàng
    document.getElementById('totalCustomers').innerText = KhachHang.length;

    // Tổng số hóa đơn
    document.getElementById('totalInvoices').innerText = HoaDonGiaoDich.length;
}

// 3. XỬ LÝ TRUY VẤN DỮ LIỆU (Mục 4.3 trong báo cáo)
function handleQueryChange() {
    const queryId = document.getElementById('querySelector').value;
    const resultTitle = document.getElementById('resultTitle');
    const tbody = document.getElementById('tbody');

    if (!queryId) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: #888;">Vui lòng chọn một truy vấn...</td></tr>';
        return;
    }

    let data = [];
    let headers = [];

    switch (queryId) {
        case '4.3.1': // Giá > 15.000.000
            resultTitle.innerText = "Kết quả: Hàng hóa có giá trên 15.000.000 VNĐ";
            headers = ["Mã HH", "Tên Sản Phẩm", "Chất Liệu", "Giá Niêm Yết"];
            data = HangHoa.filter(h => {
                const gia = h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban;
                return gia > 15000000;
            }).map(h => [
                h.MaHH, 
                h.Ten, 
                BangGiaThiTruong[h.MaNL].Ten,
                `<span style="color: #ffc107;">${(h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString()} đ</span>`
            ]);
            break;

        case '4.3.3': // Nhẫn hoặc Dây chuyền
            resultTitle.innerText = "Kết quả: Các loại Nhẫn và Dây chuyền";
            headers = ["Mã HH", "Tên Sản Phẩm", "Chất liệu", "Tồn Kho"];
            data = HangHoa.filter(h => h.Ten.includes("Nhẫn") || h.Ten.includes("Dây chuyền"))
                .map(h => [h.MaHH, h.Ten, BangGiaThiTruong[h.MaNL].Ten, h.SoLuong]);
            break;

        case '4.3.4': // TOP 5 giá nhỏ nhất
            resultTitle.innerText = "Kết quả: 5 mặt hàng có giá thấp nhất";
            headers = ["Mã HH", "Tên Sản Phẩm", "Giá"];
            data = [...HangHoa].sort((a, b) => 
                (a.TrongLuong * BangGiaThiTruong[a.MaNL].Ban) - (b.TrongLuong * BangGiaThiTruong[b.MaNL].Ban)
            ).slice(0, 5).map(h => [
                h.MaHH, 
                h.Ten, 
                (h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString() + " đ"
            ]);
            break;

        case '4.3.6': // MỚI: Thống kê tồn kho theo loại
            resultTitle.innerText = "Kết quả: Thống kê số lượng tồn kho theo nhóm sản phẩm";
            headers = ["Nhóm hàng", "Số lượng tồn"];
            const nhom = { "Vàng miếng": 0, "Trang sức": 0, "Phong thủy": 0, "Bạc": 0 };
            HangHoa.forEach(h => {
                if(h.Ten.includes("miếng")) nhom["Vàng miếng"] += h.SoLuong;
                else if(h.Ten.includes("Tượng")) nhom["Phong thủy"] += h.SoLuong;
                else if(h.MaNL.startsWith("B")) nhom["Bạc"] += h.SoLuong;
                else nhom["Trang sức"] += h.SoLuong;
            });
            data = Object.keys(nhom).map(k => [k, nhom[k] + " món"]);
            break;

        case '4.3.13': // Sản phẩm bán chạy
            resultTitle.innerText = "Kết quả: 4 sản phẩm bán chạy nhất";
            headers = ["Mã HH", "Tên Sản Phẩm", "Số lượng bán"];
            const counts = {};
            HoaDonGiaoDich.forEach(hd => {
                counts[hd.MaHH] = (counts[hd.MaHH] || 0) + hd.SoLuong;
            });
            data = Object.keys(counts).map(ma => {
                const h = HangHoa.find(x => x.MaHH === ma);
                return [ma, h ? h.Ten : ma, counts[ma]];
            }).sort((a, b) => b[2] - a[2]).slice(0, 4);
            break;

        case '4.3.14': //
