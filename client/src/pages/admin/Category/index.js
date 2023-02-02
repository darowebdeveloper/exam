import { Button, Divider, Form, Input, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryMutation,
  useUpdateCategoryMutation,
} from '../../../apicalls/categoryApi';
import PageTitle from '../../../components/PageTitle';

function Category() {
  const navigate = useNavigate();

  const params = useParams();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const {
    data,
    isLoading: loadingGet,
    reset: resetCategories,
  } = useGetCategoriesQuery({
    pagination: tableParams.pagination,
    searchTerm: '',
  });

  const [addCategory, { isLoading, data: newCategory }] =
    useAddCategoryMutation();

  const [deleteCategory, { isLoading: loadingDelete }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: loadingUpdate, data: updated }] =
    useUpdateCategoryMutation();
  const [getCategory, { isLoading: loadingById, data: category, reset }] =
    useGetCategoryMutation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (params.id) {
      updateCategory({ categoryId: params.id, ...values });
      updated?.message && message.success(updated?.message);
      reset();
      navigate(`/admin/category`);
    } else {
      addCategory(values);
      message.success(newCategory?.message);
    }
    form.resetFields();
  };

  const columns = [
    {
      title: 'Category name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <Link to={`/admin/exams/add?categoryId=${record._id}`}>
            {record.name} ({record?.exam?.length})
          </Link>
        );
      },
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
              onClick={() => {
                getCategory({ categoryId: record._id });
                navigate(`/admin/category/${record._id}`);
              }}
            ></i>
            <i
              className="ri-delete-bin-7-line"
              onClick={() => {
                deleteCategory({ categoryId: record._id });
                reset();
                navigate(`/admin/category`);
              }}
            ></i>
          </div>
        );
      },
    },
  ];
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      resetCategories();
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [category, form]);
  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data?.total,
      },
    });
  }, [data, JSON.stringify(tableParams)]);

  const loadOrNot = () =>
    loadingGet || loadingDelete || loadingUpdate || isLoading;

  return (
    <div>
      <div className="flex justify-between mt-2">
        <PageTitle title="Exam Category" />
      </div>
      <Divider />
      <div className="flex justify-center ">
        <Form
          form={form}
          layout="vertical"
          style={{
            width: '60%',
          }}
          onFinish={onFinish}
          initialValues={category?.data ?? false}
          disabled={loadOrNot()}
        >
          <Form.Item
            rules={[
              { required: true, message: 'Please input your category name!' },
            ]}
            label="Name"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading || loadingUpdate || loadingById}
            >
              {params.id ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <Table
        dataSource={data?.data}
        columns={columns}
        rowKey="_id"
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={loadOrNot()}
      />
    </div>
  );
}

export default Category;
