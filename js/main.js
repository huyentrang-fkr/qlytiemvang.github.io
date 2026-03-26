// js/main.js - PHIÊN BẢN HOÀN CHỈNH THEO SQL 4.3.x (27/03/2026)
function populateStats() {
    document.getElementById('totalProducts').textContent = HangHoa.reduce((sum, h) => sum + h.SoLuong, 0);
    document.getElementById('totalCustomers').textContent = KhachHang.length;
    document.getElementById('totalInvoices').textContent = HoaDonGiaoDich.length;
}

function renderResult(title, headers, rows) {
    document.getElementById('resultTitle').innerHTML = `📊 ${title}`;
    const thead = document.getElementById('thead');
    const tbody = document.getElementById('tbody');

    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;

    let html = '';
    if (rows.length === 0) {
        html = `<tr><td colspan="${headers.length}" class="text-center py-5 text-warning">Không có dữ liệu cho truy vấn này</td></tr>`;
    } else {
        rows.forEach(row => {
            html += '<tr>';
            Object.values(row).forEach(v => {
                let val = v;
                if (typeof v === 'number' && v > 10000) val = v.toLocaleString('vi-VN') + ' đ';
                html += `<td>${val}</td>`;
            });
            html += '</tr>';
        });
    }
    tbody.innerHTML = html;
}

function handleQueryChange() {
    const q = document.getElementById('querySelector').value;
    if (!q) return;

    let title = "", headers = [], rows = [];

    switch (q) {
        case '4.3.1':
            title = "4.3.1. Hàng hóa giá trị > 15.000.000 VNĐ";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Số lượng", "Mã NL", "Tổng giá trị"];
            rows = HangHoa.map(h => {
                const gia = BangGiaThiTruong[h.MaNL].Ban * h.TrongLuong;
                return { MaHH: h.MaHH, Ten: h.Ten, TL: h.TrongLuong, SL: h.SoLuong, MaNL: h.MaNL, TongGiaTri: gia };
            }).filter(r => r.TongGiaTri > 15000000).sort((a, b) => b.TongGiaTri - a.TongGiaTri);
            break;

        case '4.3.2':
            title = "4.3.2. Hàng hóa giá từ 20.000.000 – 40.000.000 VNĐ";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Số lượng", "Mã NL", "Giá trị"];
            rows = HangHoa.map(h => {
                const gia = BangGiaThiTruong[h.MaNL].Ban * h.TrongLuong;
                return { MaHH: h.MaHH, Ten: h.Ten, TL: h.TrongLuong, SL: h.SoLuong, MaNL: h.MaNL, GiaTri: gia };
            }).filter(r => r.GiaTri >= 20000000 && r.GiaTri <= 40000000);
            break;

        case '4.3.3':
            title = "4.3.3. Hàng hóa thuộc loại Nhẫn hoặc Dây chuyền";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Số lượng", "Mã NL", "Giá trị"];
            rows = HangHoa.filter(h => h.Ten.includes("Nhẫn") || h.Ten.includes("Dây chuyền"))
                .map(h => {
                    const gia = BangGiaThiTruong[h.MaNL].Ban * h.TrongLuong;
                    return { MaHH: h.MaHH, Ten: h.Ten, TL: h.TrongLuong, SL: h.SoLuong, MaNL: h.MaNL, GiaTri: gia };
                });
            break;

        case '4.3.4':
            title = "4.3.4. Top 5 hàng hóa có giá nhỏ nhất";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Giá trị"];
            rows = HangHoa.map(h => {
                const gia = BangGiaThiTruong[h.MaNL].Ban * h.TrongLuong;
                return { MaHH: h.MaHH, Ten: h.Ten, TL: h.TrongLuong, GiaTri: gia };
            }).sort((a, b) => a.GiaTri - b.GiaTri).slice(0, 5);
            break;

        case '4.3.5':
            title = "4.3.5. Khách hàng và hàng hóa họ đã thanh toán";
            headers = ["Mã KH", "Tên KH", "SĐT", "Mã HD", "Ngày", "Tên HH", "SL", "Thanh tiền"];
            rows = HoaDonGiaoDich.map(gd => {
                const kh = KhachHang.find(k => k.MaKH === gd.MaKH) || {};
                const hh = HangHoa.find(h => h.MaHH === gd.MaHH) || {};
                return {
                    MaKH: gd.MaKH,
                    TenKH: kh.HoTen || 'N/A',
                    SDT: kh.SDT || 'N/A',
                    MaHD: gd.MaGD,
                    Ngay: gd.ThoiGian,
                    TenHH: hh.Ten || 'N/A',
                    SL: gd.SoLuong,
                    ThanhTien: gd.ThanhTienSauGiam
                };
            }).sort((a, b) => new Date(b.Ngay) - new Date(a.Ngay));
            break;

        case '4.3.6':
            title = "4.3.6. Thống kê số lượng tồn kho theo nhóm hàng";
            headers = ["Nhóm hàng hóa", "Tổng số lượng tồn"];
            const group = {};
            HangHoa.forEach(h => {
                let nhom = "Các loại khác";
                if (h.Ten.includes("Nhẫn") && h.MaNL.startsWith("V")) nhom = "Nhẫn Vàng";
                else if (h.Ten.includes("Nhẫn") && h.MaNL.startsWith("B")) nhom = "Nhẫn Bạc";
                else if ((h.Ten.includes("Dây chuyền") || h.Ten.includes("Kiềng")) && h.MaNL.startsWith("V")) nhom = "Dây chuyền/Kiềng Vàng";
                else if ((h.Ten.includes("Dây chuyền") || h.Ten.includes("Kiềng")) && h.MaNL.startsWith("B")) nhom = "Dây chuyền/Kiềng Bạc";
                else if ((h.Ten.includes("Lắc") || h.Ten.includes("Vòng")) && h.MaNL.startsWith("V")) nhom = "Lắc/Vòng Vàng";
                else if ((h.Ten.includes("Lắc") || h.Ten.includes("Vòng")) && h.MaNL.startsWith("B")) nhom = "Lắc/Vòng Bạc";
                else if (h.Ten.includes("miếng") || h.Ten.includes("Thỏi")) nhom = "Vàng tích trữ (Miếng/Thỏi)";

                group[nhom] = (group[nhom] || 0) + h.SoLuong;
            });
            rows = Object.keys(group).map(k => ({ Nhom: k, Tong: group[k] }));
            break;

        case '4.3.7':
            title = "4.3.7. Hóa đơn từ 24/03/2026 đến 26/03/2026";
            headers = ["Mã GD", "Thời gian", "Mã NV", "Mã KH"];
            const start = new Date('2026-03-24');
            const end = new Date('2026-03-26');
            rows = HoaDonGiaoDich.filter(gd => {
                const d = new Date(gd.ThoiGian);
                return d >= start && d <= end;
            }).sort((a, b) => a.MaKH.localeCompare(b.MaKH));
            break;

        case '4.3.8':
            title = "4.3.8. Hóa đơn trong năm 2026";
            headers = ["Mã HD", "Ngày", "Mã NV", "Tên NV", "Mã KH", "Tên KH"];
            rows = HoaDonGiaoDich.filter(gd => gd.ThoiGian.startsWith('2026'))
                .map(gd => {
                    const nv = NhanVien.find(n => n.MaNV === gd.MaNV) || {};
                    const kh = KhachHang.find(k => k.MaKH === gd.MaKH) || {};
                    return { MaHD: gd.MaGD, Ngay: gd.ThoiGian, MaNV: gd.MaNV, TenNV: nv.HoTen || 'N/A', MaKH: gd.MaKH, TenKH: kh.HoTen || 'N/A' };
                })
                .sort((a, b) => b.MaNV.localeCompare(a.MaNV));
            break;

        case '4.3.9':
            title = "4.3.9. Giá hàng hóa trung bình / thấp nhất / cao nhất";
            headers = ["Giá TB", "Giá thấp nhất", "Giá cao nhất", "Tổng số loại"];
            const prices = HangHoa.map(h => h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban);
            const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
            rows = [{ GiaTB: Math.round(avg), GiaMin: Math.min(...prices), GiaMax: Math.max(...prices), Tong: HangHoa.length }];
            break;

        case '4.3.10':
            title = "4.3.10. Nhóm hàng có giá trung bình > 20.000.000";
            headers = ["Mã NL", "Giá TB nhóm"];
            const stats = {};
            HangHoa.forEach(h => {
                if (!stats[h.MaNL]) stats[h.MaNL] = { sum: 0, cnt: 0 };
                stats[h.MaNL].sum += h.TrongLuong * BangGiaThiTruong[h.MaNL].Ban;
                stats[h.MaNL].cnt++;
            });
            rows = Object.keys(stats).map(key => {
                const tb = stats[key].sum / stats[key].cnt;
                if (tb > 20000000) return { MaNL: key, GiaTB: Math.round(tb) };
            }).filter(Boolean);
            break;

        case '4.3.11':
            title = "4.3.11. Khách hàng đã mua HH06";
            headers = ["Mã KH", "Họ tên", "SĐT", "Loại", "Mã GD", "Ngày mua"];
            rows = HoaDonGiaoDich.filter(g => g.MaHH === 'HH06')
                .map(g => {
                    const kh = KhachHang.find(k => k.MaKH === g.MaKH) || {};
                    return { MaKH: g.MaKH, HoTen: kh.HoTen, SDT: kh.SDT, Loai: kh.Loai, MaGD: g.MaGD, NgayMua: g.ThoiGian };
                })
                .sort((a, b) => new Date(b.NgayMua) - new Date(a.NgayMua));
            break;

        case '4.3.12':
            title = "4.3.12. Tổng tiền của từng hóa đơn";
            headers = ["Mã GD", "Thời gian", "Tên KH", "Tổng tiền"];
            const map = {};
            HoaDonGiaoDich.forEach(gd => {
                if (!map[gd.MaGD]) map[gd.MaGD] = { MaGD: gd.MaGD, ThoiGian: gd.ThoiGian, TenKH: gd.TenKH, Tong: gd.ThanhTienSauGiam };
            });
            rows = Object.values(map).sort((a, b) => new Date(b.ThoiGian) - new Date(a.ThoiGian));
            break;

        case '4.3.13':
            title = "4.3.13. Top 4 hàng hóa bán chạy nhất";
            headers = ["Mã HH", "Tên", "Số lượng bán"];
            const count = {};
            HoaDonGiaoDich.forEach(g => count[g.MaHH] = (count[g.MaHH] || 0) + g.SoLuong);
            rows = Object.keys(count).map(id => {
                const hh = HangHoa.find(h => h.MaHH === id) || {};
                return { MaHH: id, Ten: hh.Ten || 'N/A', SL: count[id] };
            }).sort((a, b) => b.SL - a.SL).slice(0, 4);
            break;

        case '4.3.14':
            title = "4.3.14. Top 5 hóa đơn có tổng tiền lớn nhất";
            headers = ["Mã GD", "Thời gian", "Tên KH", "Tổng tiền"];
            const inv = {};
            HoaDonGiaoDich.forEach(gd => {
                if (!inv[gd.MaGD]) inv[gd.MaGD] = { MaGD: gd.MaGD, ThoiGian: gd.ThoiGian, TenKH: gd.TenKH, Tong: gd.ThanhTienSauGiam };
            });
            rows = Object.values(inv).sort((a, b) => b.Tong - a.Tong).slice(0, 5);
            break;

        case '4.3.15':
            title = "4.3.15. Chi tiết mua hàng của KH04";
            headers = ["Mã KH", "Họ tên", "Mã GD", "Ngày", "Tên HH", "SL", "Thành tiền"];
            rows = HoaDonGiaoDich.filter(g => g.MaKH === 'KH04')
                .map(g => {
                    const hh = HangHoa.find(h => h.MaHH === g.MaHH) || {};
                    return { MaKH: 'KH04', HoTen: 'Vũ Lâm Bách', MaGD: g.MaGD, Ngay: g.ThoiGian, TenHH: hh.Ten, SL: g.SoLuong, ThanhTien: g.ThanhTienSauGiam };
                });
            break;

        case '4.3.16':
            title = "4.3.16. Khách hàng mua nhiều hàng nhất";
            headers = ["Mã KH", "Họ tên", "Tổng số hàng mua"];
            const cusCount = {};
            HoaDonGiaoDich.forEach(g => cusCount[g.MaKH] = (cusCount[g.MaKH] || 0) + g.SoLuong);
            rows = Object.keys(cusCount).map(id => {
                const kh = KhachHang.find(k => k.MaKH === id) || {};
                return { MaKH: id, HoTen: kh.HoTen || 'N/A', Tong: cusCount[id] };
            }).sort((a, b) => b.Tong - a.Tong).slice(0, 1);
            break;

        case '4.3.17':
            title = "4.3.17. Hàng hóa chưa từng được mua";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Mã NL"];
            const sold = new Set(HoaDonGiaoDich.map(g => g.MaHH));
            rows = HangHoa.filter(h => !sold.has(h.MaHH))
                .map(h => ({ MaHH: h.MaHH, Ten: h.Ten, TL: h.TrongLuong, MaNL: h.MaNL }));
            break;

        case '4.3.18':
            title = "4.3.18. Doanh thu theo từng nhân viên";
            headers = ["Mã NV", "Họ tên", "Doanh thu"];
            const rev = {};
            HoaDonGiaoDich.forEach(g => rev[g.MaNV] = (rev[g.MaNV] || 0) + g.ThanhTienSauGiam);
            rows = Object.keys(rev).map(id => {
                const nv = NhanVien.find(n => n.MaNV === id) || {};
                return { MaNV: id, HoTen: nv.HoTen || 'N/A', DoanhThu: rev[id] };
            }).sort((a, b) => b.DoanhThu - a.DoanhThu);
            break;

        case '4.3.19':
            title = "4.3.19. Tổng doanh thu từ 01/10/2025 đến 01/12/2025";
            headers = ["Tổng doanh thu"];
            let total = 0;
            const s = new Date('2025-10-01');
            const e = new Date('2025-12-01');
            HoaDonGiaoDich.forEach(gd => {
                const d = new Date(gd.ThoiGian);
                if (d >= s && d <= e) total += gd.ThanhTienSauGiam;
            });
            rows = [{ TongDoanhThu: total }];
            break;

        default:
            title = "Truy vấn chưa được hỗ trợ";
            headers = ["Thông báo"];
            rows = [{ ThongBao: "Chưa có dữ liệu" }];
    }

    renderResult(title, headers, rows);
}

function instantSearch() {
    const term = document.getElementById('mainSearch').value.toLowerCase();
    if (!term) return;
    const found = HangHoa.filter(h => h.Ten.toLowerCase().includes(term) || h.MaHH.toLowerCase().includes(term));
    alert(found.length ? `✅ Tìm thấy ${found.length} sản phẩm:\n` + found.map(h => h.Ten).join('\n') : '❌ Không tìm thấy!');
}

window.onload = () => {
    populateStats();
    console.log('%c🚀 Tiệm Vàng 2026 - Tất cả truy vấn SQL đã load!', 'color:#ffc107;font-size:16px;font-weight:bold');
};
