import { Button, Divider, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllReports } from '../../../apicalls/report';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import moment from 'moment';

function AdminReport() {
  const [reportData, setReportData] = useState([]);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    examName: '',
    userName: '',
  });

  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReports(tempFilters);
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
    getData(filters);
  }, []);
  const columns = [
    {
      title: 'Exam name',
      dataIndex: 'examName',
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: 'User name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => <>{record.user?.name}</>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => (
        <>{moment(record.createdAt).format('DD-MM-YYYY hh:mm:ss')}</>
      ),
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
      <div className="flex gap-2">
        <input
          type="text"
          name="exam"
          placeholder="Exam"
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          type="text"
          name="user"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <Button
          type="default"
          onClick={() => {
            setFilters({ examName: '', userName: '' });
            getData({ examName: '', userName: '' });
          }}
        >
          Clear Filters
        </Button>
        <Button type="primary" onClick={() => getData(filters)}>
          Search
        </Button>
      </div>
      <Divider />
      <Table columns={columns} dataSource={reportData} rowKey="_id" />
    </div>
  );
}

export default AdminReport;
