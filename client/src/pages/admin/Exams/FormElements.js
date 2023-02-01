import {
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Spin,
} from 'antd';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../../../apicalls/api';
import { addExam, editExamById } from '../../../apicalls/exam';
import { useAddExamMutation } from '../../../apicalls/examApi';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function FormElements() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  const [getCategories, { data, isLoading, isFetching, isUninitialized }] =
    api.endpoints.searchCategory.useLazyQuery();
  const [addExam, { data: exam, isLoading: loadingAddExam }] =
    useAddExamMutation();

  const delaySearch = useCallback(
    debounce(
      (newValue) =>
        getCategories(
          { searchTerm: newValue, categoryId: searchParams.get('categoryId') },
          true,
        ),
      600,
    ),
    [],
  );
  const onFinish = async (values) => {
    addExam(values);
    form.setFieldValue('name', '');
  };
  const handleSearch = (newValue) => {
    if (newValue) {
      delaySearch(newValue);
    }
  };
  useEffect(() => {
    getCategories(
      { searchTerm: '', categoryId: searchParams.get('categoryId') },
      true,
    );
  }, []);

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      disabled={loadingAddExam}
    >
      <Row gutter={[10, 10]}>
        <Col sm={12} md={8}>
          <Form.Item
            label="Exam Name"
            name="name"
            initialValue={data?.name ?? ''}
            rules={[
              {
                required: true,
                message: 'Name is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={12} md={8}>
          <Form.Item
            label="Exam Duration (Mins)"
            name="duration"
            initialValue={20}
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
          {isLoading || isUninitialized ? (
            <Form.Item label="Category" name="category-loading">
              <Spin size="small" />
            </Form.Item>
          ) : (
            <Form.Item
              label="Category"
              name="category"
              initialValue={[searchParams.get('categoryId')]}
            >
              <Select
                loading={isFetching ? <Spin size="small" /> : null}
                notFoundContent={isFetching ? <Spin size="small" /> : null}
                onSearch={handleSearch}
                filterOption={false}
                showSearch
                style={{ width: '100%' }}
                options={(data?.data || []).map((d) => ({
                  value: d._id,
                  label: d.name,
                }))}
              />
            </Form.Item>
          )}
        </Col>
        <Col sm={12} md={8}>
          <Form.Item label="Total Marks" name="totalMarks" initialValue={10}>
            <InputNumber
              min={0}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>
        <Col sm={12} md={8}>
          <Form.Item label="Passing Marks" name="passingMarks" initialValue={5}>
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
        <button
          className="primary-contained-btn"
          type="submit"
          disabled={loadingAddExam}
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default FormElements;
