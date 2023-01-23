import { Button, Divider, Form, Input, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '../../../apicalls/categoryApi';
import PageTitle from '../../../components/PageTitle';

function Category() {
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const { data: category } = useGetCategoryQuery({
    categoryId: params.id,
  });

  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (params.id) {
      updateCategory({ categoryId: params.id, ...values });
    } else {
      addCategory(values);
    }
    form.resetFields();
  };

  const columns = [
    {
      title: 'Category name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
                navigate(`/admin/category/${record._id}`);
              }}
            ></i>
            <i
              className="ri-delete-bin-7-line"
              onClick={() => deleteCategory({ categoryId: record._id })}
            ></i>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    form.resetFields();
  }, [category]);
  return (
    <div>
      <div className="flex justify-between mt-2">
        <PageTitle title="Category" />
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
            <Button type="primary" htmlType="submit">
              {params.id ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider />
      {data?.data && (
        <Table dataSource={data?.data} columns={columns} rowKey="_id" />
      )}
    </div>
  );
}

export default Category;
