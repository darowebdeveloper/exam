import React, { useEffect, useState } from 'react';
import { getAllExams } from '../../../apicalls/exam';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { Button, Card, Col, message, Row } from 'antd';
import PageTitle from '../../../components/PageTitle';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [exams, setExams] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
        message.success(response.message);
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
    getExams();
  }, []);
  return (
    <div className="mt-2">
      <PageTitle title={`Hi, ${user?.name}`} />
      <Row gutter={[16, 16]} className="mt-2">
        {exams.map((exam) => (
          <Col span={6} key={exam._id}>
            <Card
              title={exam.name}
              style={{
                width: 300,
              }}
            >
              <p>Category: {exam.category}</p>
              <p>Total marks: {exam.totalMarks}</p>
              <p>Duration: {exam.duration}</p>
              <Button
                type="primary"
                onClick={() => navigate(`/user/write-exam/${exam._id}`)}
              >
                Start Exam
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
