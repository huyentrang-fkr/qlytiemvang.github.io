// 1. Dữ liệu Chức Vụ (ChucVu)
const ChucVu = [
    { MaCV: 'CV01', TenCV: 'Quản lý', LuongCoBan: 15000000 },
    { MaCV: 'CV02', TenCV: 'Nhân viên bán hàng', LuongCoBan: 8000000 },
    { MaCV: 'CV03', TenCV: 'Thợ kim hoàn', LuongCoBan: 12000000 },
    { MaCV: 'CV04', TenCV: 'Bảo vệ', LuongCoBan: 6000000 }
];

// 2. Dữ liệu Nhân Viên (NhanVien)
const NhanVien = [
    { MaNV: 'NV01', HoTen: 'Nguyễn Văn Tiến', NgaySinh: '2005-10-01', GioiTinh: 'Nam', SDT: '0912000101', DiaChi: 'Hà Nội', MaCV: 'CV01', TrangThai: 'Đang làm' },
    { MaNV: 'NV02', HoTen: 'Nguyễn Minh Toàn', NgaySinh: '2006-07-27', GioiTinh: 'Nam', SDT: '0912000102', DiaChi: 'Hà Nội', MaCV: 'CV02', TrangThai: 'Đang làm' },
    { MaNV: 'NV03', HoTen: 'Lã Huyền Trang', NgaySinh: '2006-12-02', GioiTinh: 'Nữ', SDT: '0912000103', DiaChi: 'Hà Nội', MaCV: 'CV02', TrangThai: 'Đang làm' },
    { MaNV: 'NV04', HoTen: 'Nguyễn Văn Triều', NgaySinh: '2006-02-19', GioiTinh: 'Nam', SDT: '0912000104', DiaChi: 'Hà Nội', MaCV: 'CV03', TrangThai: 'Đang làm' },
    { MaNV: 'NV05', HoTen: 'Triệu Quang Trung', NgaySinh: '2006-12-02', GioiTinh: 'Nam', SDT: '0912000105', DiaChi: 'Hà Nội', MaCV: 'CV01', TrangThai: 'Đã nghỉ' },
    { MaNV: 'NV06', HoTen: 'Đào Anh Vũ', NgaySinh: '2006-07-28', GioiTinh: 'Nam', SDT: '0912000106', DiaChi: 'Hà Nội', MaCV: 'CV01', TrangThai: 'Đang làm' }
];

// 3. Dữ liệu Khách Hàng (KhachHang)
const KhachHang = [
    { MaKH: 'KH01', HoTen: 'Đỗ Quang Anh', SDT: '0912000001', DiaChi: 'Hà Nội', Loai: 'Đồng', Diem: 0 },
    { MaKH: 'KH02', HoTen: 'Ngô Bùi Thế Anh', SDT: '0912000002', DiaChi: 'Hải Phòng', Loai: 'Đồng', Diem: 20 },
    { MaKH: 'KH03', HoTen: 'Trần Đức Anh', SDT: '0912000003', DiaChi: 'Đà Nẵng', Loai: 'Bạc', Diem: 120 },
    { MaKH: 'KH04', HoTen: 'Vũ Lâm Bách', SDT: '0912000004', DiaChi: 'TP.HCM', Loai: 'Vàng', Diem: 350 },
    { MaKH: 'KH05', HoTen: 'Phạm Thị Khánh Huyền', SDT: '0912000016', DiaChi: 'Hà Nội', Loai: 'Đồng', Diem: 50 },
    { MaKH: 'KH06', HoTen: 'Nguyễn Thị Mai', SDT: '0912000017', DiaChi: 'Quảng Ninh', Loai: 'Bạc', Diem: 180 },
    { MaKH: 'KH07', HoTen: 'Lê Văn Hoàng', SDT: '0912000018', DiaChi: 'Huế', Loai: 'Vàng', Diem: 400 },
    { MaKH: 'KH10', HoTen: 'Hoàng Thị Ngọc', SDT: '0912000021', DiaChi: 'Hà Nam', Loai: 'Vàng', Diem: 500 },
    { MaKH: 'KH15', HoTen: 'Đặng Quốc Bảo', SDT: '0912000026', DiaChi: 'Bình Dương', Loai: 'Vàng', Diem: 450 }
];

// 4. Bảng Giá Thị Trường (BangGiaThiTruong)
const BangGiaThiTruong = {
    'V9999': { Ten: 'Vàng 24K (9999)', Mua: 183000000, Ban: 186000000 },
    'V999':  { Ten: 'Vàng 999', Mua: 182000000, Ban: 185000000 },
    'V750':  { Ten: 'Vàng 18K (750)', Mua: 137000000, Ban: 142000000 },
    'V750W': { Ten: 'Vàng Trắng 18K', Mua: 136500000, Ban: 141500000 },
    'V750R': { Ten: 'Vàng Hồng 18K', Mua: 136000000, Ban: 141000000 },
    'V750I': { Ten: 'Vàng Ý 750', Mua: 135000000, Ban: 140000000 },
    'B999':  { Ten: 'Bạc Nguyên Chất', Mua: 3000000, Ban: 3200000 },
    'B925':  { Ten: 'Bạc 925', Mua: 2200000, Ban: 2500000 },
    'B925T': { Ten: 'Bạc Thái', Mua: 2300000, Ban: 2600000 }
};

// 5. Danh Sách Hàng Hóa (HangHoa)
const HangHoa = [
    { MaHH: 'HH01', Ten: 'Vàng miếng SJC 1 lượng', TrongLuong: 10.00, MaNL: 'V9999', SoLuong: 10 },
    { MaHH: 'HH03', Ten: 'Nhẫn trơn 9999 1 chỉ', TrongLuong: 1.00, MaNL: 'V9999', SoLuong: 50 },
    { MaHH: 'HH05', Ten: 'Nhẫn nam đính đá Sapphire 18K', TrongLuong: 4.50, MaNL: 'V750', SoLuong: 5 },
    { MaHH: 'HH06', Ten: 'Dây chuyền nam mắt xích 18K', TrongLuong: 8.20, MaNL: 'V750', SoLuong: 8 },
    { MaHH: 'HH10', Ten: 'Nhẫn cầu hôn Kim cương Moissanite', TrongLuong: 1.25, MaNL: 'V750W', SoLuong: 4 },
    { MaHH: 'HH15', Ten: 'Đồng hồ đính vàng hồng 18K', TrongLuong: 22.00, MaNL: 'V750R', SoLuong: 2 },
    { MaHH: 'HH20', Ten: 'Lắc tay bạc 925 kiểu Pandora', TrongLuong: 2.10, MaNL: 'B925', SoLuong: 85 },
    { MaHH: 'HH24', Ten: 'Tượng hổ vàng 999 (Phong thủy)', TrongLuong: 15.00, MaNL: 'V999', SoLuong: 2 },
    { MaHH: 'HH25', Ten: 'Thỏi vàng tài lộc 1 chỉ 999', TrongLuong: 1.00, MaNL: 'V999', SoLuong: 40 }
];

// 6. Hóa Đơn Chi Tiết (Ket hop HoaDonGiaoDich + ChiTietHoaDon)
const HoaDonGiaoDich = [
    { MaGD: 'GD2503', ThoiGian: '2025-03-10', MaNV: 'NV01', MaKH: 'KH10', TenKH: 'Hoàng Thị Ngọc', MaHH: 'HH01', SoLuong: 5, ThanhTienSauGiam: 9253500000 },
    { MaGD: 'GD2508', ThoiGian: '2025-12-24', MaNV: 'NV03', MaKH: 'KH15', TenKH: 'Đặng Quốc Bảo', MaHH: 'HH20', SoLuong: 2, ThanhTienSauGiam: 9975000 },
    { MaGD: 'GD2601', ThoiGian: '2026-01-15', MaNV: 'NV02', MaKH: 'KH03', TenKH: 'Trần Đức Anh', MaHH: 'HH06', SoLuong: 1, ThanhTienSauGiam: 123750000 },
    { MaGD: 'GD2608', ThoiGian: '2026-03-24', MaNV: 'NV03', MaKH: 'KH04', TenKH: 'Vũ Lâm Bách', MaHH: 'HH15', SoLuong: 1, ThanhTienSauGiam: 3049200000 },
    { MaGD: 'GD2610', ThoiGian: '2026-03-26', MaNV: 'NV02', MaKH: 'KH10', TenKH: 'Hoàng Thị Ngọc', MaHH: 'HH24', SoLuong: 1, ThanhTienSauGiam: 271950000 }
];

// 7. Lương Nhân Viên (LuongNhanVien)
const LuongNhanVien = [
    { MaLuong: 'L20260301', MaNV: 'NV01', SoNgayLam: 26, Thuong: 2000000, TongLuong: 17000000 },
    { MaLuong: 'L20260302', MaNV: 'NV02', SoNgayLam: 24, Thuong: 1000000, TongLuong: 14846153 },
    { MaLuong: 'L20260303', MaNV: 'NV03', SoNgayLam: 26, Thuong: 3000000, TongLuong: 11000000 }
];

const ChiTietHoaDon = HoaDonGiaoDich.map(gd => ({
    MaGD: gd.MaGD,
    MaHH: gd.MaHH,
    SoLuong: gd.SoLuong,
    ThanhTienSauGiam: gd.ThanhTienSauGiam
}));


