import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

function FormElements() {
  const navigate = useNavigate();
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col sm={12} md={8}>
          <Form.Item label="Exam Name" name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col sm={12} md={8}>
          <Form.Item label="Exam Duration (Mins)" name="duration">
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
      <div className="flex justify-end gap-2">
        <button
          className="primary-outlined-btn"
          type="button"
          onClick={() => navigate('/admin/exams')}
        >
          Cancel
        </button>
        <button className="primary-contained-btn" type="submit">
          Save
        </button>
      </div>
    </>
  );
}

export default FormElements;
