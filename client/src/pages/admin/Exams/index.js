import { Divider, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteExamById, getAllExams } from '../../../apicalls/exam';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { columnsForExamTable } from './shared';

export default function Exams() {
  const navigate = useNavigate();

  const columns = [...columnsForExamTable];

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
      <Divider />
      <Table dataSource={[]} columns={columns} rowKey="_id" />
    </div>
  );
}
