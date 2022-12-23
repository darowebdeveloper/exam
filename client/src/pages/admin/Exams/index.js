import { Divider, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteExamById, getAllExams } from '../../../apicalls/exam';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

export default function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Exam name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      keyu: 'category',
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
      key: 'total-marks',
    },
    {
      title: 'Passing Marks',
      dataIndex: 'passingMarks',
      key: 'passing-marks',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <i
              className="ri-pencil-line"
              onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
            ></i>
            <i
              className="ri-delete-bin-7-line"
              onClick={() => deleteExam(record._id)}
            ></i>
          </div>
        );
      },
    },
  ];
  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteExamById({ examId });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getExamsData();
  }, []);
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
      <Table dataSource={exams} columns={columns} rowKey="_id" />
    </div>
  );
}
