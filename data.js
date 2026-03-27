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
    { MaKH: 'KH01', HoTen: 'Đỗ Quang Anh', NgaySinh: '2006-08-09', GioiTinh: 'Nam', SDT: '0912000001', DiaChi: 'Hà Nội', Loai: 'Đồng', Diem: 0 },
    { MaKH: 'KH02', HoTen: 'Ngô Bùi Thế Anh', NgaySinh: '2006-07-11', GioiTinh: 'Nam', SDT: '0912000002', DiaChi: 'Hải Phòng', Loai: 'Đồng', Diem: 20 },
    { MaKH: 'KH03', HoTen: 'Trần Đức Anh', NgaySinh: '2006-07-29', GioiTinh: 'Nam', SDT: '0912000003', DiaChi: 'Đà Nẵng', Loai: 'Bạc', Diem: 120 },
    { MaKH: 'KH04', HoTen: 'Vũ Lâm Bách', NgaySinh: '2006-12-22', GioiTinh: 'Nam', SDT: '0912000004', DiaChi: 'TP.HCM', Loai: 'Vàng', Diem: 350 },
    { MaKH: 'KH05', HoTen: 'Phạm Thị Khánh Huyền', NgaySinh: '2006-10-17', GioiTinh: 'Nữ', SDT: '0912000016', DiaChi: 'Hà Nội', Loai: 'Đồng', Diem: 50 },
    { MaKH: 'KH06', HoTen: 'Nguyễn Thị Mai', NgaySinh: '1998-03-12', GioiTinh: 'Nữ', SDT: '0912000017', DiaChi: 'Quảng Ninh', Loai: 'Bạc', Diem: 180 },
    { MaKH: 'KH07', HoTen: 'Lê Văn Hoàng', NgaySinh: '1995-06-25', GioiTinh: 'Nam', SDT: '0912000018', DiaChi: 'Huế', Loai: 'Vàng', Diem: 400 },
    { MaKH: 'KH08', HoTen: 'Trần Thị Lan', NgaySinh: '2000-09-14', GioiTinh: 'Nữ', SDT: '0912000019', DiaChi: 'Cần Thơ', Loai: 'Đồng', Diem: 30 },
    { MaKH: 'KH09', HoTen: 'Phạm Minh Tuấn', NgaySinh: '1992-11-05', GioiTinh: 'Nam', SDT: '0912000020', DiaChi: 'Nghệ An', Loai: 'Bạc', Diem: 220 },
    { MaKH: 'KH10', HoTen: 'Hoàng Thị Ngọc', NgaySinh: '1999-01-20', GioiTinh: 'Nữ', SDT: '0912000021', DiaChi: 'Hà Nam', Loai: 'Vàng', Diem: 500 },
    { MaKH: 'KH11', HoTen: 'Bùi Văn Nam', NgaySinh: '1997-04-18', GioiTinh: 'Nam', SDT: '0912000022', DiaChi: 'Thanh Hóa', Loai: 'Đồng', Diem: 40 },
    { MaKH: 'KH12', HoTen: 'Nguyễn Thị Hạnh', NgaySinh: '2001-06-30', GioiTinh: 'Nữ', SDT: '0912000023', DiaChi: 'Bắc Ninh', Loai: 'Bạc', Diem: 150 },
    { MaKH: 'KH13', HoTen: 'Lê Minh Đức', NgaySinh: '1993-09-09', GioiTinh: 'Nam', SDT: '0912000024', DiaChi: 'Hải Dương', Loai: 'Vàng', Diem: 320 },
    { MaKH: 'KH14', HoTen: 'Phan Thị Thu', NgaySinh: '1996-12-12', GioiTinh: 'Nữ', SDT: '0912000025', DiaChi: 'Nam Định', Loai: 'Bạc', Diem: 210 },
    { MaKH: 'KH15', HoTen: 'Đặng Quốc Bảo', NgaySinh: '1990-02-25', GioiTinh: 'Nam', SDT: '0912000026', DiaChi: 'Bình Dương', Loai: 'Vàng', Diem: 450 }
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
    { MaHH: 'HH01', Ten: 'Vàng miếng SJC 1 lượng', TrongLuong: 10.00, NgayNhap: '2026-03-20', SoLuong: 10, MaNL: 'V9999' },
    { MaHH: 'HH02', Ten: 'Vàng miếng SJC 5 chỉ', TrongLuong: 5.00, NgayNhap: '2026-03-20', SoLuong: 15, MaNL: 'V9999' },
    { MaHH: 'HH03', Ten: 'Nhẫn trơn 9999 1 chỉ', TrongLuong: 1.00, NgayNhap: '2026-03-21', SoLuong: 50, MaNL: 'V9999' },
    { MaHH: 'HH04', Ten: 'Nhẫn trơn 9999 0.5 chỉ', TrongLuong: 0.50, NgayNhap: '2026-03-21', SoLuong: 70, MaNL: 'V9999' },
    { MaHH: 'HH05', Ten: 'Nhẫn nam đính đá Sapphire 18K', TrongLuong: 4.50, NgayNhap: '2026-03-10', SoLuong: 5, MaNL: 'V750' },
    { MaHH: 'HH06', Ten: 'Dây chuyền nam mắt xích 18K', TrongLuong: 8.20, NgayNhap: '2026-03-10', SoLuong: 8, MaNL: 'V750' },
    { MaHH: 'HH07', Ten: 'Lắc tay nữ kết bi Vàng 18K', TrongLuong: 3.15, NgayNhap: '2026-03-12', SoLuong: 12, MaNL: 'V750' },
    { MaHH: 'HH08', Ten: 'Bông tai nụ đá quý 18K', TrongLuong: 0.60, NgayNhap: '2026-03-15', SoLuong: 20, MaNL: 'V750' },
    { MaHH: 'HH09', Ten: 'Mặt dây chuyền cỏ 4 lá 18K', TrongLuong: 1.10, NgayNhap: '2026-03-18', SoLuong: 25, MaNL: 'V750' },
    { MaHH: 'HH10', Ten: 'Nhẫn cầu hôn Kim cương Moissanite', TrongLuong: 1.25, NgayNhap: '2026-03-22', SoLuong: 4, MaNL: 'V750W' },
    { MaHH: 'HH11', Ten: 'Vòng tay Vàng Trắng đính đá CZ', TrongLuong: 3.40, NgayNhap: '2026-03-22', SoLuong: 6, MaNL: 'V750W' },
    { MaHH: 'HH12', Ten: 'Bông tai kim cương tấm Vàng Trắng', TrongLuong: 0.80, NgayNhap: '2026-03-24', SoLuong: 3, MaNL: 'V750W' },
    { MaHH: 'HH13', Ten: 'Kiềng cổ Vàng Ý thiết kế 750', TrongLuong: 7.50, NgayNhap: '2026-03-05', SoLuong: 3, MaNL: 'V750I' },
    { MaHH: 'HH14', Ten: 'Lắc chân Vàng Ý thanh mảnh', TrongLuong: 1.45, NgayNhap: '2026-03-14', SoLuong: 15, MaNL: 'V750I' },
    { MaHH: 'HH15', Ten: 'Đồng hồ đính vàng hồng 18K', TrongLuong: 22.00, NgayNhap: '2026-02-28', SoLuong: 2, MaNL: 'V750R' },
    { MaHH: 'HH16', Ten: 'Dây chuyền mảnh Vàng Hồng', TrongLuong: 1.90, NgayNhap: '2026-03-01', SoLuong: 18, MaNL: 'V750R' },
    { MaHH: 'HH17', Ten: 'Nhẫn nữ đính đá màu 14K', TrongLuong: 1.85, NgayNhap: '2026-03-01', SoLuong: 22, MaNL: 'V583' },
    { MaHH: 'HH18', Ten: 'Dây chuyền nam sợi mảnh 10K', TrongLuong: 4.20, NgayNhap: '2026-03-08', SoLuong: 15, MaNL: 'V417' },
    { MaHH: 'HH19', Ten: 'Dây chuyền bạc nguyên chất cho bé', TrongLuong: 2.50, NgayNhap: '2026-03-15', SoLuong: 60, MaNL: 'B999' },
    { MaHH: 'HH20', Ten: 'Lắc tay bạc 925 kiểu Pandora', TrongLuong: 2.10, NgayNhap: '2026-03-17', SoLuong: 85, MaNL: 'B925' },
    { MaHH: 'HH21', Ten: 'Nhẫn bạc 925 đính đá CZ', TrongLuong: 0.75, NgayNhap: '2026-03-18', SoLuong: 120, MaNL: 'B925' },
    { MaHH: 'HH22', Ten: 'Bộ trang sức bạc Thái (Bạc đen)', TrongLuong: 12.00, NgayNhap: '2026-03-10', SoLuong: 10, MaNL: 'B925T' },
    { MaHH: 'HH23', Ten: 'Cài áo bạc Thái hình rồng', TrongLuong: 4.80, NgayNhap: '2026-03-12', SoLuong: 15, MaNL: 'B925T' },
    { MaHH: 'HH24', Ten: 'Tượng hổ vàng 999 (Phong thủy)', TrongLuong: 15.00, NgayNhap: '2026-03-15', SoLuong: 2, MaNL: 'V999' },
    { MaHH: 'HH25', Ten: 'Thỏi vàng tài lộc 1 chỉ 999', TrongLuong: 1.00, NgayNhap: '2026-03-25', SoLuong: 40, MaNL: 'V999' }
];

// 6. Hóa Đơn Chi Tiết (Ket hop HoaDonGiaoDich + ChiTietHoaDon)
const HoaDonGiaoDich = [
    { MaGD: 'GD2501', ThoiGian: '2025-02-14 10:00:00', MaNV: 'NV02', MaKH: 'KH01', TenKH: 'Đỗ Quang Anh', MaHH: 'HH03', SoLuong: 3, ThanhTienSauGiam: 558000000 },
    { MaGD: 'GD2502', ThoiGian: '2025-02-14 15:30:00', MaNV: 'NV03', MaKH: 'KH04', TenKH: 'Vũ Lâm Bách', MaHH: 'HH04', SoLuong: 2, ThanhTienSauGiam: 186000000 },
    { MaGD: 'GD2503', ThoiGian: '2025-03-10 09:15:00', MaNV: 'NV01', MaKH: 'KH10', TenKH: 'Hoàng Thị Ngọc', MaHH: 'HH05', SoLuong: 1, ThanhTienSauGiam: 639000000 },
    { MaGD: 'GD2504', ThoiGian: '2025-03-10 14:00:00', MaNV: 'NV02', MaKH: 'KH07', TenKH: 'Lê Văn Hoàng', MaHH: 'HH06', SoLuong: 1, ThanhTienSauGiam: 1164400000 },
    { MaGD: 'GD2505', ThoiGian: '2025-06-20 11:20:00', MaNV: 'NV03', MaKH: 'KH02', TenKH: 'Ngô Bùi Thế Anh', MaHH: 'HH07', SoLuong: 2, ThanhTienSauGiam: 894600000 },
    { MaGD: 'GD2506', ThoiGian: '2025-08-15 16:45:00', MaNV: 'NV01', MaKH: 'KH09', TenKH: 'Phạm Minh Tuấn', MaHH: 'HH08', SoLuong: 5, ThanhTienSauGiam: 426000000 },
    { MaGD: 'GD2507', ThoiGian: '2025-10-20 09:00:00', MaNV: 'NV02', MaKH: 'KH05', TenKH: 'Phạm Thị Khánh Huyền', MaHH: 'HH19', SoLuong: 10, ThanhTienSauGiam: 80000000 },
    { MaGD: 'GD2508', ThoiGian: '2025-12-24 19:30:00', MaNV: 'NV03', MaKH: 'KH15', TenKH: 'Đặng Quốc Bảo', MaHH: 'HH20', SoLuong: 8, ThanhTienSauGiam: 42000000 },
    { MaGD: 'GD2509', ThoiGian: '2025-12-31 10:00:00', MaNV: 'NV01', MaKH: 'KH13', TenKH: 'Lê Minh Đức', MaHH: 'HH21', SoLuong: 15, ThanhTienSauGiam: 28125000 },
    { MaGD: 'GD2601', ThoiGian: '2026-01-15 08:30:00', MaNV: 'NV02', MaKH: 'KH03', TenKH: 'Trần Đức Anh', MaHH: 'HH03', SoLuong: 4, ThanhTienSauGiam: 744000000 },
    { MaGD: 'GD2602', ThoiGian: '2026-02-05 11:00:00', MaNV: 'NV03', MaKH: 'KH08', TenKH: 'Trần Thị Lan', MaHH: 'HH09', SoLuong: 3, ThanhTienSauGiam: 468600000 },
    { MaGD: 'GD2603', ThoiGian: '2026-02-14 14:20:00', MaNV: 'NV01', MaKH: 'KH12', TenKH: 'Nguyễn Thị Hạnh', MaHH: 'HH10', SoLuong: 1, ThanhTienSauGiam: 176875000 },
    { MaGD: 'GD2604', ThoiGian: '2026-02-27 10:15:00', MaNV: 'NV02', MaKH: 'KH06', TenKH: 'Nguyễn Thị Mai', MaHH: 'HH06', SoLuong: 1, ThanhTienSauGiam: 1164400000 },
    { MaGD: 'GD2605', ThoiGian: '2026-02-27 16:00:00', MaNV: 'NV03', MaKH: 'KH14', TenKH: 'Phan Thị Thu', MaHH: 'HH07', SoLuong: 1, ThanhTienSauGiam: 447300000 },
    { MaGD: 'GD2606', ThoiGian: '2026-03-08 09:45:00', MaNV: 'NV01', MaKH: 'KH11', TenKH: 'Bùi Văn Nam', MaHH: 'HH08', SoLuong: 4, ThanhTienSauGiam: 340800000 },
    { MaGD: 'GD2607', ThoiGian: '2026-03-15 13:10:00', MaNV: 'NV02', MaKH: 'KH01', TenKH: 'Đỗ Quang Anh', MaHH: 'HH22', SoLuong: 1, ThanhTienSauGiam: 31200000 },
    { MaGD: 'GD2608', ThoiGian: '2026-03-24 08:30:00', MaNV: 'NV03', MaKH: 'KH04', TenKH: 'Vũ Lâm Bách', MaHH: 'HH01', SoLuong: 1, ThanhTienSauGiam: 1860000000 },
    { MaGD: 'GD2609', ThoiGian: '2026-03-25 11:30:00', MaNV: 'NV01', MaKH: 'KH15', TenKH: 'Đặng Quốc Bảo', MaHH: 'HH05', SoLuong: 1, ThanhTienSauGiam: 639000000 },
    { MaGD: 'GD2610', ThoiGian: '2026-03-26 15:50:00', MaNV: 'NV02', MaKH: 'KH10', TenKH: 'Hoàng Thị Ngọc', MaHH: 'HH06', SoLuong: 1, ThanhTienSauGiam: 1164400000 }
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


