import { Divider, Form, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addExam, editExamById, getExamById } from '../../../apicalls/exam';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import FormElements from './FormElements';
import QuestionElement from './QuestionElement';

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);

  const params = useParams();
  const onFinish = async (values) => {
    try {
      let response;
      dispatch(ShowLoading());
      if (params.id) {
        response = await editExamById({ ...values, examId: params.id });
      } else {
        response = await addExam(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate('/admin/exams');
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);
  return (
    <div>
      <PageTitle title={params.id ? 'Edit exam' : 'Add exam'} />
      <Divider />
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: 'Exams',
                key: '1',
                children: <FormElements />,
              },
              {
                label: 'Questions',
                key: '2',
                children: (
                  <QuestionElement
                    examId={params.id}
                    refreshData={getExamData}
                    questions={examData?.questions}
                  />
                ),
                disabled: params.id ? false : true,
              },
            ]}
          />
        </Form>
      )}
    </div>
  );
}

export default AddEditExam;
