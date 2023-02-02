import {
  Divider,
  Form,
  message,
  Table,
  Tabs,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
} from 'antd';
import React, { useEffect, useCallback, useState } from 'react';
import {
  useAddExamMutation,
  useDeleteExamMutation,
  useGetExamQuery,
  useGetExamsInCategoryQuery,
  useUpdateExamMutation,
} from '../../../apicalls/examApi';
import { debounce, update } from 'lodash';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { api } from '../../../apicalls/api';
import { useSearchCategoryQuery } from '../../../apicalls/categoryApi';

import PageTitle from '../../../components/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { columnsForExamTable } from './shared';

function AddEditExam() {
  const navigate = useNavigate();

  const [form] = useForm();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [
    getCategories,
    {
      data: categories,
      isLoading: loadingCategories,
      isFetching: fetchingCategories,
    },
  ] = api.endpoints.searchCategory.useLazyQuery();
  const [addExam, { isLoading: addExamLoading }] = useAddExamMutation();

  const { data: exams } = useGetExamsInCategoryQuery(
    {
      categoryId: searchParams.get('categoryId'),
    },
    {
      skip: params.id ? true : false,
    },
  );

  const { data: exam } = useGetExamQuery(
    { examId: params?.id },
    {
      skip: params.id ? false : true,
    },
  );

  const [deleteExam] = useDeleteExamMutation();
  const [updateExam] = useUpdateExamMutation();

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

  const columns = [
    {
      title: 'Exam name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <Link to={`/admin/questions/add?examId=${record._id}`}>
            {record.name} ({record?.questions.length})
          </Link>
        );
      },
    },
    ...columnsForExamTable,
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
              onClick={() => deleteExam({ examId: record._id })}
            ></i>
          </div>
        );
      },
    },
  ];

  const handleSearch = (newValue) => {
    if (newValue) {
      delaySearch(newValue);
    }
  };
  const handleFinish = (values) => {
    if (params.id) {
      // update
      updateExam({ examId: params.id, ...values });
      navigate(-1);
    } else {
      addExam(values);
    }
    form.resetFields();
  };
  useEffect(() => {
    getCategories(
      { searchTerm: '', categoryId: searchParams.get('categoryId') },
      true,
    );
  }, []);
  useEffect(() => {
    if (exam) {
      form.setFieldValue('name', exam?.data.name);
      form.setFieldValue('category', exam?.data.category);
    }
  }, [exam]);

  return (
    <div className="mt-2">
      <PageTitle title={params.id ? 'Edit exam' : 'Add exam'} />
      <Divider />
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={[10, 10]}>
          <Col sm={12} md={8}>
            <Form.Item
              label="Exam Name"
              name="name"
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
            {loadingCategories ? (
              <Form.Item label="Category" name="category-loading">
                <Spin size="small" />
              </Form.Item>
            ) : (
              <Form.Item
                label="Category"
                name="category"
                initialValue={searchParams.get('categoryId')}
              >
                <Select
                  loading={fetchingCategories ? <Spin size="small" /> : null}
                  notFoundContent={
                    fetchingCategories ? <Spin size="small" /> : null
                  }
                  onSearch={handleSearch}
                  filterOption={false}
                  showSearch
                  style={{ width: '100%' }}
                  options={categories?.data.map((d) => ({
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
            <Form.Item
              label="Passing Marks"
              name="passingMarks"
              initialValue={5}
            >
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
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="primary-contained-btn"
            type="submit"
            disabled={false}
          >
            {params.id ? 'Update' : 'Save'}
          </button>
        </div>
      </Form>
      <Divider />
      {exams?.data && (
        <Table dataSource={exams?.data} columns={columns} rowKey="_id" />
      )}
    </div>
  );
}

export default AddEditExam;
