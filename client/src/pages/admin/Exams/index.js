import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';

export default function Exams() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between mt-2">
        <PageTitle title="Exams" />
        <button
          onClick={() => navigate('/admin/exams/add')}
          className="primary-outlined-btn flex item-center"
        >
          <i className="ri-add-line"></i>
          Add exam
        </button>
      </div>
    </div>
  );
}
