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
import React, { useEffect, useRef, useState } from 'react';
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
import axiosInstance from '../../../apicalls';

export default function AddEditQuestion() {
  const [form] = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  let questionId = useRef('');

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
        return record?.options?.A;
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

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
      formData.append('examId', searchParams.get('examId'));
      if (questionId.current) {
        formData.append('questionId', questionId.current);
      }
    });
    setUploading(true);
    try {
      const response = await axiosInstance.post(
        '/exams/questions/upload',
        formData,
      );
      setFileList([]);
      questionId.current = response?.data?.data.questionId;
      message.success('upload successfully.');
      console.log(questionId.current);
    } catch (error) {
      message.error('upload failed.');
    } finally {
      setUploading(false);
    }
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    name: 'file',
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
    if (questionId.current) {
      requiredPayload.questionId = questionId.current;
    }
    if (params.id) {
      // update
      updateQuestion({ questionId: params.id, ...requiredPayload });
      navigate(-1);
      questionId.current = '';
    } else {
      addQuestion(requiredPayload);
      questionId.current = '';
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
            <Input disabled={questionId.current} />
          </Form.Item>

          <div className="mt-1 mb-1 flex ">
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{
                marginRight: 16,
              }}
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>

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
