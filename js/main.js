/**
 * TIỆM VÀNG 2026 - LOGIC XỬ LÝ DỮ LIỆU CHÍNH
 */

// 1. Khởi tạo dữ liệu khi trang web tải xong
window.onload = function() {
    // Kiểm tra xem dữ liệu từ data.js đã load chưa
    if (typeof HangHoa === 'undefined') {
        console.error("Lỗi: Không tìm thấy dữ liệu từ data.js. Hãy kiểm tra lại đường dẫn script trong HTML.");
        return;
    }
    updateDashboard();
};

// 2. Cập nhật Dashboard
function updateDashboard() {
    try {
        // Tính tổng tồn kho thực tế
        const totalProd = HangHoa.reduce((sum, item) => sum + item.SoLuong, 0);
        document.getElementById('totalProducts').innerText = totalProd.toLocaleString();
        document.getElementById('totalCustomers').innerText = KhachHang.length;
        document.getElementById('totalInvoices').innerText = HoaDonGiaoDich.length;
    } catch (e) {
        console.warn("Dashboard chưa thể cập nhật do thiếu ID trong HTML hoặc lỗi dữ liệu.");
    }
}

// 3. XỬ LÝ TRUY VẤN DỮ LIỆU
function handleQueryChange() {
    const querySelector = document.getElementById('querySelector');
    const resultTitle = document.getElementById('resultTitle');
    const tbody = document.getElementById('tbody');

    if (!querySelector || !querySelector.value) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #888; padding: 40px;">Kết quả truy vấn sẽ hiển thị tại đây...</td></tr>';
        return;
    }

    const queryId = querySelector.value;
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 40px;"><div class="loader">Đang trích xuất dữ liệu...</div></td></tr>';

    setTimeout(() => {
        try {
            let data = [];
            let headers = [];

            switch (queryId) {
                case '4.3.1': // Giá > 15 triệu
                    resultTitle.innerText = "Kết quả: Hàng hóa có giá trên 15.000.000 VNĐ";
                    headers = ["Mã HH", "Tên Sản Phẩm", "Chất Liệu", "Giá Niêm Yết"];
                    data = HangHoa.filter(h => (h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban) > 15000000)
                        .map(h => [h.MaHH, h.Ten, BangGiaThiTruong[h.MaNL].Ten, `<span style="color: #ffc107; font-weight: bold;">${(h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString()} đ</span>`]);
                    break;

                case '4.3.3': // Nhẫn hoặc Dây chuyền
                    resultTitle.innerText = "Kết quả: Các loại Nhẫn và Dây chuyền";
                    headers = ["Mã HH", "Tên Sản Phẩm", "Chất liệu", "Tồn Kho"];
                    data = HangHoa.filter(h => h.Ten.includes("Nhẫn") || h.Ten.includes("Dây chuyền"))
                        .map(h => [h.MaHH, h.Ten, BangGiaThiTruong[h.MaNL].Ten, h.SoLuong]);
                    break;

                case '4.3.4': // Top 5 sản phẩm giá thấp nhất
                    resultTitle.innerText = "Kết quả: Top 5 sản phẩm giá thấp nhất (Giá niêm yết)";
                    headers = ["Mã HH", "Tên Sản Phẩm", "Giá"];
                    data = [...HangHoa].sort((a, b) => (a.TrongLuong * BangGiaThiTruong[a.MaNL].Ban) - (b.TrongLuong * BangGiaThiTruong[b.MaNL].Ban))
                        .slice(0, 5)
                        .map(h => [h.MaHH, h.Ten, (h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString() + " đ"]);
                    break;

                case '4.3.6': // Thống kê tồn kho theo loại
                    resultTitle.innerText = "Kết quả: Thống kê số lượng tồn kho theo nhóm";
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

                case '4.3.13': // Top 4 sản phẩm bán chạy nhất
                    resultTitle.innerText = "Kết quả: Top 4 sản phẩm bán chạy nhất (Số lượng)";
                    headers = ["Mã HH", "Tên Sản Phẩm", "Tổng đã bán"];
                    const spSales = {};
                    ChiTietHoaDon.forEach(ct => spSales[ct.MaHH] = (spSales[ct.MaHH] || 0) + ct.SoLuong);
                    data = Object.keys(spSales).sort((a,b) => spSales[b] - spSales[a]).slice(0, 4).map(ma => {
                        const h = HangHoa.find(sp => sp.MaHH === ma);
                        return [ma, h ? h.Ten : ma, spSales[ma] + " món"];
                    });
                    break;

                case '4.3.14': // Hóa đơn giá trị kỷ lục
                    resultTitle.innerText = "Kết quả: Hóa đơn có giá trị thanh toán cao nhất";
                    headers = ["Mã GD", "Khách Hàng", "Tổng tiền"];
                    const maxHD = [...HoaDonGiaoDich].sort((a,b) => b.ThanhTienSauGiam - a.ThanhTienSauGiam)[0];
                    const khMax = KhachHang.find(k => k.MaKH === maxHD.MaKH);
                    data = [[maxHD.MaGD, khMax ? khMax.HoTen : maxHD.MaKH, `<strong style="color:#ffc107">${maxHD.ThanhTienSauGiam.toLocaleString()} đ</strong>`]];
                    break;

                case '4.3.15': // Lịch sử mua hàng KH10
                    resultTitle.innerText = "Kết quả: Lịch sử mua hàng của Hoàng Thị Ngọc (KH10)";
                    headers = ["Mã GD", "Ngày Lập", "Tổng thanh toán"];
                    data = HoaDonGiaoDich.filter(hd => hd.MaKH === "KH10")
                        .map(hd => [hd.MaGD, hd.NgayLap, hd.ThanhTienSauGiam.toLocaleString() + " đ"]);
                    break;

                case '4.3.18': // Doanh thu nhân viên
                    resultTitle.innerText = "Kết quả: Doanh thu theo nhân viên";
                    headers = ["Mã NV", "Tên Nhân Viên", "Doanh Thu"];
                    const nvSales = {};
                    HoaDonGiaoDich.forEach(hd => nvSales[hd.MaNV] = (nvSales[hd.MaNV] || 0) + hd.ThanhTienSauGiam);
                    data = Object.keys(nvSales).map(ma => {
                        const nv = NhanVien.find(n => n.MaNV === ma);
                        return [ma, nv ? nv.HoTen : ma, `<span style="color: #4db6ac; font-weight:bold;">${nvSales[ma].toLocaleString()} đ</span>`];
                    });
                    break;

                default:
                    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;">Tính năng đang được phát triển...</td></tr>';
                    return;
            }
            renderTable(headers, data);
        } catch (err) {
            console.error("Lỗi thực thi truy vấn:", err);
            tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; color: #ff5252;">Lỗi: ${err.message}</td></tr>`;
        }
    }, 300);
}

// 4. Hàm vẽ bảng
function renderTable(headers, rows) {
    const thead = document.getElementById('thead');
    const tbody = document.getElementById('tbody');
    if(!thead || !tbody) return;

    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 20px;">Không tìm thấy dữ liệu.</td></tr>';
        return;
    }

    tbody.innerHTML = rows.map((row, index) => `
        <tr style="animation: fadeIn 0.3s ease forwards; animation-delay: ${index * 0.05}s; opacity: 0;">
            ${row.map(cell => `<td>${cell}</td>`).join('')}
        </tr>
    `).join('');
}
