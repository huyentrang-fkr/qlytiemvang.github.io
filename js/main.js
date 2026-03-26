// js/main.js - PHIÊN BẢN ĐÃ SỬA (27/03/2026)
function populateStats() {
    document.getElementById('totalProducts').textContent = HangHoa.reduce((sum, h) => sum + h.SoLuong, 0);
    document.getElementById('totalCustomers').textContent = KhachHang.length;
    document.getElementById('totalInvoices').textContent = HoaDonGiaoDich.length;
}

function renderResult(title, headers, rows) {
    console.log(`%c🎯 Render: ${title} | ${rows.length} dòng`, 'color:#ffc107;font-weight:bold');

    document.getElementById('resultTitle').innerHTML = `📊 ${title}`;
    const thead = document.getElementById('thead');
    const tbody = document.getElementById('tbody');

    // Set header
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
                if (typeof v === 'number' && v <= 10000) val = v; // tồn kho nhỏ
                html += `<td>${val}</td>`;
            });
            html += '</tr>';
        });
    }
    tbody.innerHTML = html;
}

function handleQueryChange() {
    const q = document.getElementById('querySelector').value;
    console.log('%c🔍 Truy vấn được chọn:', 'color:#4db6ac', q);

    if (!q) return;

    let title = "", headers = [], rows = [];

    switch (q) {
        case '4.3.1':
            title = "Hàng hóa giá trị cao (> 15 triệu)";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Nguyên liệu", "Giá trị"];
            rows = HangHoa.map(h => {
                const gia = BangGiaThiTruong[h.MaNL].Ban * h.TrongLuong;
                return { MaHH: h.MaHH, Ten: h.Ten, TL: h.TrongLuong + " chỉ", NL: BangGiaThiTruong[h.MaNL].Ten, Gia: gia };
            }).filter(r => r.Gia > 15000000).sort((a,b) => b.Gia - a.Gia);
            break;

        case '4.3.3':   // ← Đây là truy vấn bạn đang chọn
            title = "CÁC LOẠI NHẪN VÀ DÂY CHUYỀN";
            headers = ["Mã HH", "Tên sản phẩm", "Chất liệu", "Tồn kho"];
            rows = HangHoa.filter(h => h.Ten.includes("Nhẫn") || h.Ten.includes("Dây chuyền"))
                .map(h => ({
                    MaHH: h.MaHH,
                    Ten: h.Ten,
                    Loai: BangGiaThiTruong[h.MaNL].Ten,
                    Ton: h.SoLuong
                }));
            console.log('✅ 4.3.3 - Số sản phẩm nhẫn/dây chuyền:', rows.length);
            break;

        // Các truy vấn khác (đã hoàn chỉnh)
        case '4.3.4':
            title = "Top 5 sản phẩm giá thấp nhất";
            headers = ["Mã HH", "Tên", "Giá niêm yết"];
            rows = [...HangHoa].map(h => {
                const gia = BangGiaThiTruong[h.MaNL].Ban * h.TrongLuong;
                return { MaHH: h.MaHH, Ten: h.Ten, Gia: gia };
            }).sort((a,b) => a.Gia - b.Gia).slice(0,5);
            break;

        case '4.3.6':
            title = "Thống kê tồn kho theo loại";
            headers = ["Loại nguyên liệu", "Số mẫu", "Tổng tồn"];
            const stats = {};
            HangHoa.forEach(h => {
                const ten = BangGiaThiTruong[h.MaNL].Ten;
                if (!stats[ten]) stats[ten] = {c:0, t:0};
                stats[ten].c++; stats[ten].t += h.SoLuong;
            });
            rows = Object.keys(stats).map(k => ({Loai: k, Mau: stats[k].c, Ton: stats[k].t}));
            break;

        case '4.3.13':
            title = "Top 4 sản phẩm bán chạy nhất";
            headers = ["Mã HH", "Tên", "Số lượng bán"];
            const count = {};
            HoaDonGiaoDich.forEach(g => count[g.MaHH] = (count[g.MaHH]||0) + g.SoLuong);
            rows = Object.keys(count).map(id => {
                const hh = HangHoa.find(h => h.MaHH === id);
                return {MaHH:id, Ten: hh?hh.Ten:'N/A', SL: count[id]};
            }).sort((a,b)=>b.SL-a.SL).slice(0,4);
            break;

        case '4.3.14':
            title = "Hóa đơn có giá trị kỷ lục";
            headers = ["Mã GD", "Ngày", "Nhân viên", "Khách hàng", "Hàng hóa", "Thành tiền"];
            const max = [...HoaDonGiaoDich].sort((a,b)=>b.ThanhTienSauGiam - a.ThanhTienSauGiam)[0];
            if (max) {
                const nv = NhanVien.find(n=>n.MaNV===max.MaNV)||{HoTen:'N/A'};
                const hh = HangHoa.find(h=>h.MaHH===max.MaHH)||{Ten:'N/A'};
                rows = [{MaGD:max.MaGD, Ngay:max.ThoiGian, NV:nv.HoTen, KH:max.TenKH, Hang:hh.Ten, Tien:max.ThanhTienSauGiam}];
            }
            break;

        case '4.3.15':
            title = "Lịch sử mua hàng KH10 (Hoàng Thị Ngọc)";
            headers = ["Mã GD", "Ngày", "Hàng hóa", "SL", "Thành tiền"];
            rows = HoaDonGiaoDich.filter(g=>g.MaKH==='KH10').map(g=>{
                const hh = HangHoa.find(h=>h.MaHH===g.MaHH)||{Ten:'N/A'};
                return {MaGD:g.MaGD, Ngay:g.ThoiGian, Hang:hh.Ten, SL:g.SoLuong, Tien:g.ThanhTienSauGiam};
            });
            break;

        case '4.3.16':
            title = "Khách hàng thân thiết (mua nhiều nhất)";
            headers = ["Mã KH", "Họ tên", "Tổng giá trị"];
            const cus = {};
            HoaDonGiaoDich.forEach(g => cus[g.MaKH] = (cus[g.MaKH]||0) + g.ThanhTienSauGiam);
            rows = Object.keys(cus).map(id => {
                const k = KhachHang.find(x=>x.MaKH===id);
                return {MaKH:id, Ten: k?k.HoTen:'N/A', Tong: cus[id]};
            }).sort((a,b)=>b.Tong-a.Tong);
            break;

        case '4.3.17':
            title = "Hàng hóa tồn kho lâu ngày (chưa từng bán)";
            headers = ["Mã HH", "Tên", "Trọng lượng", "Tồn kho"];
            const sold = new Set(HoaDonGiaoDich.map(g=>g.MaHH));
            rows = HangHoa.filter(h => !sold.has(h.MaHH))
                .map(h => ({MaHH:h.MaHH, Ten:h.Ten, TL:h.TrongLuong+" chỉ", Ton:h.SoLuong}));
            break;

        case '4.3.18':
            title = "Doanh thu theo nhân viên";
            headers = ["Mã NV", "Họ tên", "Doanh thu"];
            const rev = {};
            HoaDonGiaoDich.forEach(g => rev[g.MaNV] = (rev[g.MaNV]||0) + g.ThanhTienSauGiam);
            rows = Object.keys(rev).map(id => {
                const nv = NhanVien.find(n=>n.MaNV===id);
                return {MaNV:id, Ten: nv?nv.HoTen:'N/A', DoanhThu: rev[id]};
            }).sort((a,b)=>b.DoanhThu-a.DoanhThu);
            break;

        default:
            title = "Truy vấn chưa được hỗ trợ";
            headers = ["Thông báo"];
            rows = [{ThongBao: "Chưa có dữ liệu cho truy vấn này"}];
    }

    renderResult(title, headers, rows);
}

function instantSearch() {
    // giữ nguyên như cũ
    const term = document.getElementById('mainSearch').value.toLowerCase();
    if (!term) return;
    const found = HangHoa.filter(h => h.Ten.toLowerCase().includes(term) || h.MaHH.toLowerCase().includes(term));
    if (found.length) alert(`✅ Tìm thấy ${found.length} sản phẩm:\n` + found.map(h=>h.Ten).join('\n'));
    else alert('❌ Không tìm thấy!');
}

// Khởi tạo
window.onload = () => {
    populateStats();
    console.log('%c🚀 Tiệm Vàng 2026 - main.js đã load thành công!', 'color:#ffc107;font-size:16px;font-weight:bold');
};
