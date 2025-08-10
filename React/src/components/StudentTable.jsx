import React, { useEffect, useState } from 'react';

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []); 

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa sinh viên này?')) {
      const updated = students.filter(s => s.id !== id);
      localStorage.setItem('students', JSON.stringify(updated));
      setStudents(updated);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Mã SV</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, i) => (
          <tr key={s.id} className="student-row">
            <td>{i + 1}</td>
            <td>{s.maSV}</td>
            <td>{s.hoTen}</td>
            <td>{s.email}</td>
            <td>{s.gioiTinh}</td>
            <td>{s.ngaySinh}</td>
            <td className="actions">
              <a href="#" onClick={(e) => e.preventDefault()}>Sửa</a> |{' '}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleDelete(s.id); }}
              >
                Xoá
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
