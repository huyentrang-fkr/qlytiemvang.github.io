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
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #888; padding: 40px;">Kết quả truy vấn sẽ hiển thị tại đây...</td></tr>';
        return;
    }

    let data = [];
    let headers = [];

    // Hiệu ứng loading nhẹ khi chuyển truy vấn
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 40px;"><div class="loader">Đang trích xuất dữ liệu...</div></td></tr>';

    setTimeout(() => {
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
                    `<span style="color: #ffc107; font-weight: bold;">${(h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString()} đ</span>`
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

            case '4.3.6': // Thống kê tồn kho theo loại
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
                    return [ma, h ? h.Ten : ma, counts[ma] + " sp"];
                }).sort((a, b) => b[2] - a[2]).slice(0, 4);
                break;

            case '4.3.14': // Hóa đơn trị giá cao nhất
                resultTitle.innerText = "Kết quả: Giao dịch có trị giá cao nhất";
                headers = ["Mã GD", "Khách Hàng", "Ngày GD", "Tổng Tiền"];
                const topInvoice = [...HoaDonGiaoDich].sort((a, b) => b.ThanhTienSauGiam - a.ThanhTienSauGiam)[0];
                if (topInvoice) {
                    data = [[topInvoice.MaGD, topInvoice.TenKH, topInvoice.ThoiGian, `<span style="color: #ffc107; font-weight:bold;">${topInvoice.ThanhTienSauGiam.toLocaleString()} đ</span>`]];
                }
                break;

            case '4.3.15': // Lịch sử giao dịch VIP
                resultTitle.innerText = "Kết quả: Lịch sử giao dịch khách hàng VIP (KH10)";
                headers = ["Mã GD", "Ngày GD", "Sản phẩm", "Thành tiền"];
                data = HoaDonGiaoDich.filter(hd => hd.MaKH === 'KH10')
                    .map(hd => {
                        const h = HangHoa.find(item => item.MaHH === hd.MaHH);
                        return [hd.MaGD, hd.ThoiGian, h ? h.Ten : hd.MaHH, hd.ThanhTienSauGiam.toLocaleString() + " đ"];
                    });
                break;

            case '4.3.16': // Khách hàng mua nhiều nhất
                resultTitle.innerText = "Kết quả: Khách hàng mua nhiều sản phẩm nhất";
                headers = ["Mã KH", "Tên Khách Hàng", "Tổng SP đã mua"];
                const custMap = {};
                HoaDonGiaoDich.forEach(hd => {
                    custMap[hd.MaKH] = (custMap[hd.MaKH] || 0) + hd.SoLuong;
                });
                const topCustId = Object.keys(custMap).sort((a, b) => custMap[b] - custMap[a])[0];
                const khInfo = KhachHang.find(k => k.MaKH === topCustId);
                if (khInfo) {
                    data = [[topCustId, khInfo.HoTen, custMap[topCustId] + " sản phẩm"]];
                }
                break;

            case '4.3.17': // Sản phẩm chưa từng bán
                resultTitle.innerText = "Kết quả: Hàng hóa chưa từng phát sinh giao dịch";
                headers = ["Mã HH", "Tên Sản Phẩm", "Tồn kho"];
                const soldIds = HoaDonGiaoDich.map(hd => hd.MaHH);
                data = HangHoa.filter(h => !soldIds.includes(h.MaHH))
                    .map(h => [h.MaHH, h.Ten, h.SoLuong]);
                break;

            case '4.3.18': // Doanh thu nhân viên
                resultTitle.innerText = "Kết quả: Tổng doanh thu bán hàng theo nhân viên";
                headers = ["Mã NV", "Tên Nhân Viên", "Doanh Thu"];
                const nvSales = {};
                HoaDonGiaoDich.forEach(hd => {
                    nvSales[hd.MaNV] = (nvSales[hd.MaNV] || 0) + hd.ThanhTienSauGiam;
                });
                data = Object.keys(nvSales).map(ma => {
                    const nv = NhanVien.find(n => n.MaNV === ma);
                    return [ma, nv ? nv.HoTen : ma, `<span style="color: #4db6ac; font-weight:bold;">${nvSales[ma].toLocaleString()} đ</span>`];
                });
                break;
        }
        renderTable(headers, data);
    }, 300); // Trễ 300ms tạo cảm giác hệ thống đang tính toán
}

// 4. Hàm vẽ bảng với hiệu ứng xuất hiện
function renderTable(headers, rows) {
    const thead = document.getElementById('thead');
    const tbody = document.getElementById('tbody');

    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 20px;">Không tìm thấy dữ liệu phù hợp.</td></tr>';
        return;
    }

    tbody.innerHTML = rows.map((row, index) => `
        <tr style="animation: fadeIn 0.3s ease forwards; animation-delay: ${index * 0.05}s; opacity: 0;">
            ${row.map(cell => `<td>${cell}</td>`).join('')}
        </tr>
    `).join('');
}

// 5. Tìm kiếm nhanh (Instant Search)
function instantSearch() {
    const input = document.getElementById('mainSearch').value.toLowerCase();
    const resultTitle = document.getElementById('resultTitle');
    
    if (input.length < 1) {
        updateDashboard();
        return;
    }

    resultTitle.innerHTML = `Đang tìm kiếm: <span style="color: #ffc107;">"${input}"</span>`;
    const headers = ["Mã", "Tên Sản Phẩm", "Chất Liệu", "Kho"];
    const data = HangHoa.filter(h => 
        h.Ten.toLowerCase().includes(input) || 
        h.MaHH.toLowerCase().includes(input)
    ).map(h => [
        h.MaHH, 
        h.Ten, 
        BangGiaThiTruong[h.MaNL].Ten, 
        h.SoLuong
    ]);
    
    renderTable(headers, data);
}
