import { Divider, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReportsByUser } from '../../../apicalls/report';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function UserReport() {
  const [reportData, setReportData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReportsByUser({ userId: user._id });
      if (response.success) {
        setReportData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: 'Exam name',
      dataIndex: 'examName',
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => <>{record.createdAt}</>,
    },
    {
      title: 'Total marks',
      dataIndex: 'totalMarks',
      key: 'totalMarks',
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: 'Passing marks',
      dataIndex: 'passingMarks',
      key: 'passingMarks',
      render: (text, record) => <>{record.exam.passingMarks}</>,
    },
    {
      title: 'Obtained marks',
      dataIndex: 'passingMarks',
      key: 'passingMarks',
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: 'Verdict',
      dataIndex: 'verdict',
      key: 'verdict',
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];
  return (
    <div className="mt-2">
      <PageTitle title="Reports" />
      <Divider />
      <Table columns={columns} dataSource={reportData} rowKey="_id" />
    </div>
  );
}

export default UserReport;
