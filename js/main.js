// 1. Khởi tạo dữ liệu khi trang web tải xong
window.onload = function() {
    updateDashboard();
};

// 2. Hàm cập nhật các con số trên Dashboard (Tổng hàng, khách, hóa đơn)
function updateDashboard() {
    // Tổng số lượng hàng tồn kho (Dữ liệu từ api.js)
    const totalProd = HangHoa.reduce((sum, item) => sum + item.SoLuong, 0);
    document.getElementById('totalProducts').innerText = totalProd.toLocaleString();

    // Tổng khách hàng
    document.getElementById('totalCustomers').innerText = KhachHang.length;

    // Tổng số hóa đơn
    document.getElementById('totalInvoices').innerText = HoaDonGiaoDich.length;
}

// 3. Hàm điều hướng (Giữ nguyên từ code cũ của bạn)
function goTo(page) {
    console.log("Chuyển hướng tới: " + page);
    // window.location.href = page;
}

// 4. XỬ LÝ TRUY VẤN DỮ LIỆU (Mục 4.3 trong báo cáo)
function handleQueryChange() {
    const queryId = document.getElementById('querySelector').value;
    const thead = document.getElementById('thead');
    const tbody = document.getElementById('tbody');
    const resultTitle = document.getElementById('resultTitle');

    if (!queryId) {
        tbody.innerHTML = '<tr><td colspan="5">Vui lòng chọn một truy vấn...</td></tr>';
        return;
    }

    let data = [];
    let headers = [];

    switch (queryId) {
        case '4.3.1': // Giá > 15.000.000
            resultTitle.innerText = "Kết quả: Hàng hóa có giá trên 15.000.000 VNĐ";
            headers = ["Mã HH", "Tên Sản Phẩm", "Trọng Lượng", "Tổng Giá Trị"];
            data = HangHoa.filter(h => {
                const gia = h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban;
                return gia > 15000000;
            }).map(h => [
                h.MaHH, 
                h.Ten, 
                h.TrongLuong + " chỉ", 
                (h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString() + " đ"
            ]);
            break;

        case '4.3.3': // Nhẫn hoặc Dây chuyền
            resultTitle.innerText = "Kết quả: Các loại Nhẫn và Dây chuyền";
            headers = ["Mã HH", "Tên Sản Phẩm", "Đơn Giá Niêm Yết"];
            data = HangHoa.filter(h => h.Ten.includes("Nhẫn") || h.Ten.includes("Dây chuyền"))
                .map(h => [h.MaHH, h.Ten, BangGiaThiTruong[h.MaNL].Ban.toLocaleString() + " đ/chỉ"]);
            break;

        case '4.3.4': // TOP 5 giá nhỏ nhất
            resultTitle.innerText = "Kết quả: 5 mặt hàng có giá thấp nhất";
            headers = ["Mã HH", "Tên Sản Phẩm", "Giá Trị"];
            data = [...HangHoa].sort((a, b) => 
                (a.TrongLuong * BangGiaThiTruong[a.MaNL].Ban) - (b.TrongLuong * BangGiaThiTruong[b.MaNL].Ban)
            ).slice(0, 5).map(h => [
                h.MaHH, 
                h.Ten, 
                (h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString() + " đ"
            ]);
            break;

        case '4.3.6': // Đếm số lượng theo loại (GROUP BY)
            resultTitle.innerText = "Kết quả: Thống kê số lượng tồn theo loại";
            headers = ["Nhóm Hàng Hóa", "Tổng Số Lượng Tồn"];
            const groups = {};
            HangHoa.forEach(h => {
                let nhom = h.Ten.includes("Nhẫn") ? "Nhẫn" : (h.Ten.includes("miếng") ? "Vàng Miếng" : "Khác");
                groups[nhom] = (groups[nhom] || 0) + h.SoLuong;
            });
            data = Object.keys(groups).map(k => [k, groups[k] + " món"]);
            break;

        case '4.3.17': // Hàng hóa chưa từng mua
            resultTitle.innerText = "Kết quả: Hàng hóa chưa phát sinh giao dịch (Tồn kho)";
            headers = ["Mã HH", "Tên Sản Phẩm", "Trạng thái"];
            const soldIds = ChiTietHoaDon.map(ct => ct.MaHH);
            data = HangHoa.filter(h => !soldIds.includes(h.MaHH))
                .map(h => [h.MaHH, h.Ten, "Chưa bán"]);
            break;

        case '4.3.18': // Doanh thu theo nhân viên
            resultTitle.innerText = "Kết quả: Doanh thu thực tế theo từng nhân viên";
            headers = ["Mã NV", "Tên Nhân Viên", "Doanh Thu"];
            const sales = {};
            HoaDonGiaoDich.forEach(hd => {
                sales[hd.MaNV] = (sales[hd.MaNV] || 0) + (hd.TongTien || 0);
            });
            data = Object.keys(sales).map(ma => {
                const nv = NhanVien.find(n => n.MaNV === ma);
                return [ma, nv ? nv.HoTen : "N/A", sales[ma].toLocaleString() + " đ"];
            });
            break;
    }

    // Hiển thị ra bảng
    renderTable(headers, data);
}

// 5. Hàm phụ trợ để vẽ bảng dữ liệu
function renderTable(headers, rows) {
    const thead = document.getElementById('thead');
    const tbody = document.getElementById('tbody');

    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center">Không tìm thấy dữ liệu phù hợp.</td></tr>';
        return;
    }

    tbody.innerHTML = rows.map(row => `
        <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
    `).join('');
}

// 6. Hàm tìm kiếm nhanh trên thanh Topbar
function instantSearch() {
    const input = document.getElementById('mainSearch').value.toLowerCase();
    const resultTitle = document.getElementById('resultTitle');
    
    if(input.length < 2) return;

    resultTitle.innerText = `Kết quả tìm kiếm cho: "${input}"`;
    const headers = ["Mã HH", "Tên Sản Phẩm", "Kho"];
    const data = HangHoa.filter(h => h.Ten.toLowerCase().includes(input) || h.MaHH.toLowerCase().includes(input))
        .map(h => [h.MaHH, h.Ten, h.SoLuong]);
    
    renderTable(headers, data);
}
