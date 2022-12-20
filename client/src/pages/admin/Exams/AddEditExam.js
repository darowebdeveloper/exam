import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addExam } from '../../../apicalls/exam';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      let response;
      dispatch(ShowLoading());
      response = await addExam(values);

      if (response.success) {
        message.success(response.message);
        navigate('/admin/exams');
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <PageTitle title="Add exam" />
      <Divider />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col sm={12} md={8}>
            <Form.Item label="Exam Name" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12} md={8}>
            <Form.Item
              label="Exam Duration (Mins)"
              initialValue={60}
              name="duration"
            >
              <InputNumber
                min={0}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={12} md={8}>
            <Form.Item label="Category" name="category">
              <Select
                style={{ width: '100%' }}
                options={[
                  { value: 'javascript', label: 'Javascript' },
                  { value: 'react', label: 'React' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col sm={12} md={8}>
            <Form.Item label="Total Marks" name="totalMarks">
              <InputNumber
                min={0}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={12} md={8}>
            <Form.Item label="Passing Marks" name="passingMarks">
              <InputNumber
                min={0}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button className="primary-contained-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AddEditExam;
