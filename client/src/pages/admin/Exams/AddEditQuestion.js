import { Col, Divider, Form, Input, message, Modal, Row, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';

export default function AddEditQuestion() {
  const [form] = useForm();
  const handleFinish = () => true;
  return (
    <>
      <div className="mt-2">
        <PageTitle title={'Question'} />
        <Divider />
        <Form onFinish={handleFinish} form={form} layout="vertical">
          <Form.Item name="name" label="Question">
            <Input />
          </Form.Item>

          <Form.Item name="correctOption" label="Correct option">
            <Input />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col sm={12}>
              <Form.Item name="A" label="Option A">
                <Input />
              </Form.Item>
              <Form.Item name="B" label="Option B">
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item name="C" label="Option C">
                <Input />
              </Form.Item>
              <Form.Item name="D" label="Option D">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="primary-outlined-btn"
              type="button"
              onClick={() => console.log('cancel')}
            >
              Cancel
            </button>
            <button className="primary-contained-btn" type="submit">
              Save
            </button>
          </div>
        </Form>
      </div>
      <Divider />
      {/* <Table columns={columns} dataSource={questions} rowKey="_id" /> */}
    </>
  );
}
