/**
 * HÀM THỰC THI TRUY VẤN THEO MÃ SỐ (Từ 4.3.1 đến 4.3.19)
 * @param {string} queryId - Mã câu hỏi trong báo cáo (VD: '4.3.1')
 */
function executeQuery(queryId) {
    let result = [];
    let title = "";
    let headers = [];

    switch (queryId) {
        case '4.3.1': // Liệt kê hàng hóa có giá trên 15.000.000
            title = "4.3.1. Hàng hóa giá trị > 15 triệu";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Tổng giá trị"];
            result = HangHoa.map(hh => {
                const giaBanRa = BangGiaThiTruong[hh.MaNL].Ban;
                return { ...hh, TongGiaTri: hh.TrongLuong * giaBanRa };
            }).filter(h => h.TongGiaTri > 15000000)
              .sort((a, b) => b.TongGiaTri - a.TongGiaTri);
            break;

        case '4.3.3': // Loại "Nhẫn" hoặc "Dây chuyền"
            title = "4.3.3. Nhẫn hoặc Dây chuyền";
            headers = ["Mã HH", "Tên", "Nguyên liệu", "Giá trị 1 món"];
            result = HangHoa.filter(h => h.Ten.includes("Nhẫn") || h.Ten.includes("Dây chuyền"))
                .map(h => ({
                    ...h, 
                    DonGia: BangGiaThiTruong[h.MaNL].Ban,
                    GiaTriMotMon: h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban
                }));
            break;

        case '4.3.4': // TOP 5 hàng hóa giá nhỏ nhất
            title = "4.3.4. 5 hàng hóa giá thấp nhất";
            headers = ["Mã HH", "Tên", "Giá trị"];
            result = HangHoa.map(h => ({
                ...h, 
                GiaTri: h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban
            })).sort((a, b) => a.GiaTri - b.GiaTri).slice(0, 5);
            break;

        case '4.3.6': // Đếm số lượng theo loại (GROUP BY + CASE WHEN)
            title = "4.3.6. Thống kê theo loại hàng hóa";
            headers = ["Nhóm Hàng Hóa", "Tổng Số Lượng Tồn"];
            const stats = {};
            HangHoa.forEach(h => {
                let nhom = "Khác";
                if (h.Ten.includes("Nhẫn") && h.MaNL.startsWith("V")) nhom = "Nhẫn Vàng";
                else if (h.Ten.includes("Nhẫn") && h.MaNL.startsWith("B")) nhom = "Nhẫn Bạc";
                else if (h.Ten.includes("miếng")) nhom = "Vàng tích trữ";
                
                stats[nhom] = (stats[nhom] || 0) + h.SoLuong;
            });
            result = Object.keys(stats).map(k => ({ Nhom: k, Tong: stats[k] }));
            break;

        case '4.3.13': // 4 hàng hóa mua nhiều nhất
            title = "4.3.13. Top 4 hàng hóa bán chạy";
            headers = ["Mã HH", "Tên", "Tổng lượng bán"];
            const salesCount = {};
            ChiTietHoaDon.forEach(ct => {
                salesCount[ct.MaHH] = (salesCount[ct.MaHH] || 0) + ct.SoLuong;
            });
            result = Object.keys(salesCount).map(id => {
                const hh = HangHoa.find(h => h.MaHH === id);
                return { MaHH: id, Ten: hh.Ten, Tong: salesCount[id] };
            }).sort((a, b) => b.Tong - a.Tong).slice(0, 4);
            break;

        case '4.3.17': // Hàng hóa chưa từng được mua (LEFT JOIN ... NULL)
            title = "4.3.17. Hàng hóa chưa từng được mua";
            headers = ["Mã HH", "Tên", "Trọng lượng"];
            const soldIds = ChiTietHoaDon.map(ct => ct.MaHH);
            result = HangHoa.filter(h => !soldIds.includes(h.MaHH));
            break;

        case '4.3.18': // Doanh thu theo nhân viên
            title = "4.3.18. Doanh thu theo nhân viên";
            headers = ["Mã NV", "Tên NV", "Doanh thu"];
            const nvSales = {};
            HoaDonGiaoDich.forEach(hd => {
                const total = ChiTietHoaDon.filter(ct => ct.MaGD === hd.MaGD)
                              .reduce((s, ct) => s + ct.ThanhTienSauGiam, 0);
                nvSales[hd.MaNV] = (nvSales[hd.MaNV] || 0) + total;
            });
            result = Object.keys(nvSales).map(id => {
                const nv = NhanVien.find(n => n.MaNV === id);
                return { MaNV: id, Ten: nv.HoTen, DoanhThu: nvSales[id] };
            }).sort((a, b) => b.DoanhThu - a.DoanhThu);
            break;

        default:
            alert("Truy vấn này đang được cập nhật!");
            return;
    }

    renderTable(title, headers, result);
}

/**
 * HÀM HIỂN THỊ KẾT QUẢ RA BẢNG HTML
 */
function renderTable(title, headers, data) {
    document.getElementById('queryTitle').innerText = title;
    const headerRow = document.getElementById('queryHeader');
    const bodyRow = document.getElementById('queryBody');

    headerRow.innerHTML = headers.map(h => `<th>${h}</th>`).join('');
    bodyRow.innerHTML = data.map(row => {
        const values = Object.values(row);
        // Định dạng tiền tệ cho các cột liên quan đến giá
        return `<tr>${values.map(v => 
            `<td>${typeof v === 'number' && v > 1000 ? v.toLocaleString() + ' đ' : v}</td>`
        ).join('')}</tr>`;
    }).join('');
}
