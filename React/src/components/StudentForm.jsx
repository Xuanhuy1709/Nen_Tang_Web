import React, { useState } from 'react';

export default function StudentForm() {
  const [student, setStudent] = useState({
    maSV: '', hoTen: '', email: '', ngaySinh: '', gioiTinh: '', ghiChu: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};


    if (!student.maSV.trim()) {
      e.maSV = 'Mã sinh viên không được để trống';
    } else if (student.maSV.length > 20) {
      e.maSV = 'Mã sinh viên không hợp lệ';
    }

    if (!student.hoTen.trim()) {
      e.hoTen = 'Họ và tên không được để trống';
    } else if (!/^[\p{L}\s'.-]{2,100}$/u.test(student.hoTen.trim())) {
      e.hoTen = 'Họ và tên không hợp lệ';
    }

    if (!student.email.trim()) {
      e.email = 'Email không được để trống';
    } else if (!/^\S+@\S+\.\S+$/.test(student.email.trim())) {
      e.email = 'Email không hợp lệ';
    }

    if (!student.ngaySinh) {
      e.ngaySinh = 'Ngày sinh không được để trống';
    }

    if (!student.gioiTinh) {
      e.gioiTinh = 'Giới tính không được để trống';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const list = JSON.parse(localStorage.getItem('students')) || [];
    const newStudent = {
      id: Date.now().toString(),
      maSV: student.maSV.trim(),
      hoTen: student.hoTen.trim(),
      email: student.email.trim(),
      gioiTinh: student.gioiTinh,
      ngaySinh: student.ngaySinh,
      ghiChu: student.ghiChu
    };
    list.push(newStudent);
    localStorage.setItem('students', JSON.stringify(list));

  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="maSV">Mã sinh viên</label>
          <input
            id="maSV" type="text" value={student.maSV}
            onChange={e => setStudent({ ...student, maSV: e.target.value })}
          />
          {errors.maSV && <div className="error-text">{errors.maSV}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="hoTen">Họ và tên</label>
          <input
            id="hoTen" type="text" value={student.hoTen}
            onChange={e => setStudent({ ...student, hoTen: e.target.value })}
          />
          {errors.hoTen && <div className="error-text">{errors.hoTen}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email" type="text" value={student.email}
            onChange={e => setStudent({ ...student, email: e.target.value })}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="ngaySinh">Ngày sinh</label>
          <input
            id="ngaySinh" type="date" value={student.ngaySinh}
            onChange={e => setStudent({ ...student, ngaySinh: e.target.value })}
          />
          {errors.ngaySinh && <div className="error-text">{errors.ngaySinh}</div>}
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <div className="radio-group">
            <label className="radio-inline">
              <input
                type="radio" name="gioiTinh" value="Nam"
                checked={student.gioiTinh === 'Nam'}
                onChange={e => setStudent({ ...student, gioiTinh: e.target.value })}
              />
              Nam
            </label>
            <label className="radio-inline">
              <input
                type="radio" name="gioiTinh" value="Nữ"
                checked={student.gioiTinh === 'Nữ'}
                onChange={e => setStudent({ ...student, gioiTinh: e.target.value })}
              />
              Nữ
            </label>
          </div>
          {errors.gioiTinh && <div className="error-text">{errors.gioiTinh}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="ghiChu">Ghi chú</label>
          <textarea
            id="ghiChu" rows="1" value={student.ghiChu}
            onChange={e => setStudent({ ...student, ghiChu: e.target.value })}
          />
        </div>

        <button type="submit">Thêm sinh viên</button>
      </form>
    </div>
  );
}
