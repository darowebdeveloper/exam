import { Col, Divider, Form, Input, message, Modal, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addQuestionToExam,
  deleteExamById,
  deleteQuestionInExam,
  editQuestionInExam,
} from '../../../apicalls/exam';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

export default function QuestionElement({
  examId,
  refreshData,
  questions = [],
}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedQuestion(null);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async (values) => {
    try {
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };
      dispatch(ShowLoading());
      let response;
      if (selectedQuestion) {
        response = await editQuestionInExam({
          ...requiredPayload,
          questionId: selectedQuestion._id,
        });
      } else {
        response = await addQuestionToExam(requiredPayload);
      }
      if (response.success) {
        message.success(response.message);
        setIsModalOpen(false);
        onReset();
        refreshData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const deleteQuestion = async (questionId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteQuestionInExam({
        questionId,
        examId,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        refreshData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: 'Queston',
      dataIndex: 'name',
      key: 'question',
    },
    {
      title: 'Correction option',
      dataIndex: 'correctOption',
      key: 'correctOption',
      render: (text, record) => {
        return `${record.correctOption}: ${
          record.options[record.correctOption]
        }`;
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedQuestion(record);
                setIsModalOpen(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-7-line"
              onClick={() => deleteQuestion(record._id)}
            ></i>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: selectedQuestion?.name,
        correctOption: selectedQuestion?.correctOption,
        A: selectedQuestion?.options.A,
        B: selectedQuestion?.options.B,
        C: selectedQuestion?.options.C,
        D: selectedQuestion?.options.D,
      });
    }
  }, [selectedQuestion]);

  return (
    <>
      <div className="">
        <h1>Questions</h1>
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          onReset={onReset}
        >
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
              onClick={handleCancel}
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
      <Table columns={columns} dataSource={questions} rowKey="_id" />
    </>
  );
}
