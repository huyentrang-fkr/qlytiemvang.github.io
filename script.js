// Hàm thực thi tổng hợp các bộ lọc
function executeQueries() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const minPrice = parseFloat(document.getElementById('priceFilter').value);

    // Chạy bộ lọc (Tương đương lệnh SELECT ... FROM HangHoa JOIN BangGia ...)
    const filteredData = HangHoa.filter(item => {
        const giaBanRa = BangGiaThiTruong[item.MaNL].Ban;
        const thanhTien = item.TrongLuong * giaBanRa;

        // 1. Điều kiện LIKE (Tìm kiếm tên hoặc mã)
        const matchSearch = item.Ten.toLowerCase().includes(searchTerm) || 
                            item.MaHH.toLowerCase().includes(searchTerm);

        // 2. Điều kiện WHERE giá trị (Giống câu truy vấn > 15,000,000 của bạn)
        const matchPrice = thanhTien >= minPrice;

        // 3. Điều kiện Nhóm hàng (Mô phỏng CASE WHEN)
        let matchCategory = true;
        if (category === "VangMieng") {
            matchCategory = item.Ten.includes("miếng") || item.Ten.includes("Thỏi");
        } else if (category === "Nhan") {
            matchCategory = item.Ten.includes("Nhẫn");
        } else if (category === "DayChuyen") {
            matchCategory = item.Ten.includes("Dây chuyền") || item.Ten.includes("Kiềng");
        } else if (category === "Bac") {
            matchCategory = item.MaNL.startsWith("B");
        }

        return matchSearch && matchPrice && matchCategory;
    });

    renderResults(filteredData);
}

// Hàm hiển thị kết quả ra bảng
function renderResults(data) {
    const tableBody = document.getElementById('resultTable');
    const status = document.getElementById('queryStatus');
    
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Không tìm thấy dữ liệu phù hợp!</td></tr>`;
        status.innerText = `Tìm thấy 0 kết quả.`;
        return;
    }

    let html = '';
    data.forEach(item => {
        const giaBanRa = BangGiaThiTruong[item.MaNL].Ban;
        const thanhTien = item.TrongLuong * giaBanRa;

        html += `
            <tr>
                <td><span class="badge bg-secondary">${item.MaHH}</span></td>
                <td><strong>${item.Ten}</strong></td>
                <td>${item.TrongLuong} chỉ</td>
                <td>${giaBanRa.toLocaleString()} /chỉ</td>
                <td class="text-primary fw-bold">${thanhTien.toLocaleString()} VNĐ</td>
                <td><button class="btn btn-sm btn-outline-success" onclick="alert('Xem chi tiết ${item.MaHH}')">Chi tiết</button></td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
    status.className = "alert alert-success py-2";
    status.innerText = `Truy vấn thành công! Tìm thấy ${data.length} sản phẩm.`;
}

// Gọi hàm lần đầu khi load trang
window.onload = executeQueries;
