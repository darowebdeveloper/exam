import { Col, Form, Input, InputNumber, Row, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../apicalls/api';

function FormElements() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [getCategories, { data, isLoading, isFetching, isUninitialized }] =
    api.endpoints.searchCategory.useLazyQuery();

  const delaySearch = useCallback(
    debounce((newValue) => getCategories({ searchTerm: newValue }, true), 600),
    []
  );
  const handleSearch = (newValue) => {
    if (newValue) {
      delaySearch(newValue);
    }
  };
  useEffect(() => {
    getCategories({ searchTerm: '' }, true);
  }, []);

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
