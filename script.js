// Biến lưu trữ chế độ truy vấn hiện tại
let currentQueryMode = 'default';

// Hàm để thay đổi truy vấn từ giao diện (gọi khi bấm nút)
function setQueryMode(mode) {
    currentQueryMode = mode;
    executeQueries();
}

function executeQueries() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const category = document.getElementById('categoryFilter')?.value || "all";
    const minPrice = parseFloat(document.getElementById('priceFilter')?.value || 0);

    let displayData = [];
    let customHeaders = null; // Dùng cho các bảng có cấu trúc khác nhau (như thống kê)

    // MÔ PHỎNG CÁC TRUY VẤN SQL
    switch (currentQueryMode) {
        
        case '4.3.4': // Liệt kê 5 hàng hóa có giá nhỏ nhất (TOP 5 ... ORDER BY ASC)
            displayData = [...HangHoa]
                .sort((a, b) => (a.TrongLuong * BangGiaThiTruong[a.MaNL].Ban) - (b.TrongLuong * BangGiaThiTruong[b.MaNL].Ban))
                .slice(0, 5);
            break;

        case '4.3.6': // Đếm số lượng theo loại (GROUP BY + CASE WHEN)
            const groups = {};
            HangHoa.forEach(item => {
                let type = "Khác";
                if (item.Ten.includes("Nhẫn")) type = "Nhẫn Vàng/Bạc";
                else if (item.Ten.includes("Dây chuyền") || item.Ten.includes("Kiềng")) type = "Dây chuyền/Kiềng";
                else if (item.Ten.includes("miếng")) type = "Vàng tích trữ";
                
                groups[type] = (groups[type] || 0) + item.SoLuong;
            });
            displayData = Object.keys(groups).map(key => ({ label: key, value: groups[key] }));
            customHeaders = ["Nhóm Hàng Hóa", "Tổng Số Lượng Tồn"];
            break;

        case '4.3.17': // Hàng hóa chưa từng được mua (LEFT JOIN ... WHERE ... IS NULL)
            const soldIds = HoaDonGiaoDich.map(hd => hd.MaHH);
            displayData = HangHoa.filter(item => !soldIds.includes(item.MaHH));
            break;

        case '4.3.18': // Doanh thu theo nhân viên (GROUP BY + SUM)
            const nvSales = {};
            HoaDonGiaoDich.forEach(hd => {
                nvSales[hd.MaNV] = (nvSales[hd.MaNV] || 0) + hd.ThanhTienSauGiam;
            });
            displayData = Object.keys(nvSales).map(ma => ({ label: ma, value: nvSales[ma] }));
            customHeaders = ["Mã Nhân Viên", "Tổng Doanh Thu"];
            break;

        default: // Mặc định (Kết hợp 4.3.1, 4.3.2, 4.3.3)
            displayData = HangHoa.filter(item => {
                const giaBanRa = BangGiaThiTruong[item.MaNL].Ban;
                const thanhTien = item.TrongLuong * giaBanRa;

                const matchSearch = item.Ten.toLowerCase().includes(searchTerm) || item.MaHH.toLowerCase().includes(searchTerm);
                const matchPrice = thanhTien >= minPrice;
                
                let matchCategory = true;
                if (category === "VangMieng") matchCategory = item.Ten.includes("miếng");
                else if (category === "Nhan") matchCategory = item.Ten.includes("Nhẫn");
                else if (category === "Bac") matchCategory = item.MaNL.startsWith("B");

                return matchSearch && matchPrice && matchCategory;
            });
    }

    renderResults(displayData, customHeaders);
}

function renderResults(data, customHeaders) {
    const tableHead = document.querySelector('thead');
    const tableBody = document.getElementById('resultTable');
    const status = document.getElementById('queryStatus');

    // Nếu là báo cáo thống kê (4.3.6, 4.3.18), thay đổi tiêu đề bảng
    if (customHeaders) {
        tableHead.innerHTML = `<tr><th>${customHeaders[0]}</th><th>${customHeaders[1]}</th><th>Thao tác</th></tr>`;
        tableBody.innerHTML = data.map(item => `
            <tr>
                <td><strong>${item.label}</strong></td>
                <td class="text-primary fw-bold">${item.value.toLocaleString()}</td>
                <td><button class="btn btn-sm btn-light">Chi tiết</button></td>
            </tr>
        `).join('');
    } else {
        // Render bảng hàng hóa tiêu chuẩn
        tableHead.innerHTML = `<tr><th>Mã HH</th><th>Tên Sản Phẩm</th><th>Trọng Lượng</th><th>Đơn Giá</th><th>Thành Tiền</th><th>Thao tác</th></tr>`;
        tableBody.innerHTML = data.map(item => {
            const gia = BangGiaThiTruong[item.MaNL].Ban;
            return `
                <tr>
                    <td><span class="badge bg-secondary">${item.MaHH}</span></td>
                    <td>${item.Ten}</td>
                    <td>${item.TrongLuong} chỉ</td>
                    <td>${gia.toLocaleString()}</td>
                    <td class="text-primary fw-bold">${(item.TrongLuong * gia).toLocaleString()} đ</td>
                    <td><button class="btn btn-sm btn-outline-success">Sửa</button></td>
                </tr>`;
        }).join('');
    }

    status.innerText = `Tìm thấy ${data.length} kết quả phù hợp.`;
}
