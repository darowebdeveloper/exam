import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Switch,
  Table,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionQuery,
  useGetQuestionsInExamQuery,
  useUpdateQuestionMutation,
} from '../../../apicalls/questionApi';

export default function AddEditQuestion() {
  const [form] = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [addQuestion] = useAddQuestionMutation();

  const [updateQuestion] = useUpdateQuestionMutation();

  const [deleteQuestion] = useDeleteQuestionMutation();

  const { data: questions } = useGetQuestionsInExamQuery(
    {
      examId: searchParams.get('examId'),
    },
    {
      skip: params.id ? true : false,
    },
  );

  const { data: question } = useGetQuestionQuery(
    {
      questionId: params.id,
    },
    {
      skip: params.id ? false : true,
    },
  );

  const columns = [
    {
      title: 'Question',
      dataIndex: 'name',
      key: 'question',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => {
        return record.oneAnswer ? 'MCQ' : 'Blank';
      },
    },
    {
      title: 'Answer',
      dataIndex: 'Answer',
      key: 'Answer',
      render: (text, record) => {
        return record.options.A;
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
              onClick={() => navigate(`/admin/questions/edit/${record._id}`)}
            ></i>
            <i
              className="ri-delete-bin-7-line"
              onClick={() =>
                deleteQuestion({
                  questionId: record._id,
                  examId: searchParams.get('examId'),
                })
              }
            ></i>
          </div>
        );
      },
    },
  ];
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleFinish = (values) => {
    const requiredPayload = {
      name: values.name,
      options: {
        A: values.A,
        B: values.B,
        C: values.C,
        D: values.D,
      },
      oneAnswer: values.oneAnswer,
      exam: searchParams.get('examId') || question?.data.exam,
    };
    if (params.id) {
      // update
      updateQuestion({ questionId: params.id, ...requiredPayload });
      navigate(-1);
    } else {
      addQuestion(requiredPayload);
    }
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
    if (question) {
      form.setFieldsValue(question?.data);
    }
  }, [question]);

  return (
    <>
      <div className="mt-2">
        <PageTitle title={params.id ? 'Edit Question' : 'Add Question'} />
        <Divider />
        <Form onFinish={handleFinish} form={form} layout="vertical">
          <Form.Item
            name="oneAnswer"
            label="MCQ / Fill in the Blank"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="MCQ" unCheckedChildren="Blank" />
          </Form.Item>
          <Form.Item name="name" label="Question">
            <Input />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col sm={12}>
              <Form.Item name="A" label="Option A (Correct Answer)">
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
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button className="primary-contained-btn" type="submit">
              {params.id ? 'Update' : 'Save'}
            </button>
          </div>
        </Form>
      </div>
      <Divider />
      {questions?.data && (
        <Table columns={columns} dataSource={questions?.data} rowKey="_id" />
      )}
    </>
  );
}
