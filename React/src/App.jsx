import React, { useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import studentsData from './data';
import './style.css';

export default function App() {
  useEffect(() => {
    const existing = localStorage.getItem('students');
    if (!existing) {
      localStorage.setItem('students', JSON.stringify(studentsData));
    }
  }, []);

  return (
    <>
      <div className="navbar">Quản Lý Sinh Viên</div>
      <div className="main-content">
        <div className="section">
          <h2>Form thêm sinh viên</h2>
          <StudentForm />
        </div>

        <div className="section">
          <h2>Bảng danh sách sinh viên</h2>
          <div className="table-responsive">
            <StudentTable />
          </div>
        </div>
      </div>
    </>
  );
}
