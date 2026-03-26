// 1. Khởi tạo dữ liệu khi trang web tải xong
window.onload = function() {
    updateDashboard();
};

// 2. Hàm cập nhật các con số trên Dashboard
function updateDashboard() {
    // Tổng số lượng hàng tồn kho
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
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Vui lòng chọn một truy vấn...</td></tr>';
        return;
    }

    let data = [];
    let headers = [];

    switch (queryId) {
        case '4.3.1': // Giá > 15.000.000
            resultTitle.innerText = "Kết quả: Hàng hóa có giá trên 15.000.000 VNĐ";
            headers = ["Mã HH", "Tên Sản Phẩm", "Giá Niêm Yết"];
            data = HangHoa.filter(h => {
                const gia = h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban;
                return gia > 15000000;
            }).map(h => [
                h.MaHH, 
                h.Ten, 
                (h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban).toLocaleString() + " đ"
            ]);
            break;

        case '4.3.3': // Nhẫn hoặc Dây chuyền
            resultTitle.innerText = "Kết quả: Các loại Nhẫn và Dây chuyền";
            headers = ["Mã HH", "Tên Sản Phẩm", "Chất liệu"];
            data = HangHoa.filter(h => h.Ten.includes("Nhẫn") || h.Ten.includes("Dây chuyền"))
                .map(h => [h.MaHH, h.Ten, BangGiaThiTruong[h.MaNL].Ten]);
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

        case '4.3.13': // Sản phẩm bán chạy (dựa trên HoaDonGiaoDich)
            resultTitle.innerText = "Kết quả: Các sản phẩm đã phát sinh giao dịch";
            headers = ["Mã HH", "Tên Sản Phẩm", "Số lượng bán"];
            const salesCount = {};
            HoaDonGiaoDich.forEach(hd => {
                salesCount[hd.MaHH] = (salesCount[hd.MaHH] || 0) + hd.SoLuong;
            });
            data = Object.keys(salesCount).map(ma => {
                const h = HangHoa.find(item => item.MaHH === ma);
                return [ma, h ? h.Ten : "N/A", salesCount[ma]];
            }).sort((a, b) => b[2] - a[2]);
            break;

        case '4.3.14': // Hóa đơn trị giá cao nhất
            resultTitle.innerText = "Kết quả: Giao dịch có trị giá cao nhất";
            headers = ["Mã GD", "Khách Hàng", "Ngày GD", "Tổng Tiền"];
            const topInvoice = [...HoaDonGiaoDich].sort((a, b) => b.ThanhTienSauGiam - a.ThanhTienSauGiam)[0];
            if (topInvoice) {
                data = [[topInvoice.MaGD, topInvoice.TenKH, topInvoice.ThoiGian, topInvoice.ThanhTienSauGiam.toLocaleString() + " đ"]];
            }
            break;

        case '4.3.15': // Giao dịch của Hoàng Thị Ngọc (KH10)
            resultTitle.innerText = "Kết quả: Lịch sử giao dịch của Hoàng Thị Ngọc (KH10)";
            headers = ["Mã GD", "Ngày GD", "Sản phẩm", "Thành tiền"];
            data = HoaDonGiaoDich.filter(hd => hd.MaKH === 'KH10')
                .map(hd => {
                    const h = HangHoa.find(item => item.MaHH === hd.MaHH);
                    return [hd.MaGD, hd.ThoiGian, h ? h.Ten : hd.MaHH, hd.ThanhTienSauGiam.toLocaleString() + " đ"];
                });
            break;

        case '4.3.16': // Khách hàng mua nhiều nhất
            resultTitle.innerText = "Kết quả: Khách hàng mua nhiều sản phẩm nhất";
            headers = ["Mã KH", "Tên Khách Hàng", "Tổng SP"];
            const custMap = {};
            HoaDonGiaoDich.forEach(hd => {
                custMap[hd.MaKH] = (custMap[hd.MaKH] || 0) + hd.SoLuong;
            });
            const topCustId = Object.keys(custMap).sort((a, b) => custMap[b] - custMap[a])[0];
            const kh = KhachHang.find(k => k.MaKH === topCustId);
            if (kh) {
                data = [[topCustId, kh.HoTen, custMap[topCustId]]];
            }
            break;

        case '4.3.17': // Hàng tồn kho chưa từng bán
            resultTitle.innerText = "Kết quả: Hàng hóa chưa từng phát sinh giao dịch";
            headers = ["Mã HH", "Tên Sản Phẩm", "Tồn kho"];
            const soldIds = HoaDonGiaoDich.map(hd => hd.MaHH);
            data = HangHoa.filter(h => !soldIds.includes(h.MaHH))
                .map(h => [h.MaHH, h.Ten, h.SoLuong]);
            break;

        case '4.3.18': // Doanh thu nhân viên
            resultTitle.innerText = "Kết quả: Tổng doanh thu bán hàng theo nhân viên";
            headers = ["Mã NV", "Tên Nhân Viên", "Doanh Thu"];
            const sales = {};
            HoaDonGiaoDich.forEach(hd => {
                sales[hd.MaNV] = (sales[hd.MaNV] || 0) + hd.ThanhTienSauGiam;
            });
            data = Object.keys(sales).map(ma => {
                const nv = NhanVien.find(n => n.MaNV === ma);
                return [ma, nv ? nv.HoTen : "N/A", sales[ma].toLocaleString() + " đ"];
            });
            break;
    }

    renderTable(headers, data);
}

// 4. Hàm vẽ bảng
function renderTable(headers, rows) {
    const thead = document.getElementById('thead');
    const tbody = document.getElementById('tbody');

    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center">Không tìm thấy dữ liệu.</td></tr>';
        return;
    }

    tbody.innerHTML = rows.map(row => `
        <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
    `).join('');
}

// 5. Tìm kiếm nhanh
function instantSearch() {
    const input = document.getElementById('mainSearch').value.toLowerCase();
    const resultTitle = document.getElementById('resultTitle');
    if(input.length < 2) return;
    resultTitle.innerText = `Tìm kiếm: "${input}"`;
    const headers = ["Mã", "Tên", "Loại/Giá"];
    const data = HangHoa.filter(h => h.Ten.toLowerCase().includes(input))
        .map(h => [h.MaHH, h.Ten, BangGiaThiTruong[h.MaNL].Ten]);
    renderTable(headers, data);
}
