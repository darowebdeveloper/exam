import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getExamById } from '../../../apicalls/exam';
import { useParams } from 'react-router-dom';
import Instructions from './Instructions';

export default function WriteExam() {
  const [examData, setExamData] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [view, setView] = useState('instructions');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [result, setResult] = useState({});
  const [secondLeft, setsecondLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const calculateResult = () => {
    let correctAnswers = [];
    let wrongAnswers = [];
    questions.forEach((question, index) => {
      if (question.correctAnswer === selectedOption[index]) {
        correctAnswers.push(question);
      } else {
        wrongAnswers.push(question);
      }
    });
    let verdict = 'Pass';
    if (correctAnswers.length < examData.passingMarks) {
      verdict = 'Failed';
    }
    setResult({
      correctAnswers,
      wrongAnswers,
      verdict,
    });
    setView('result');
  };

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setsecondLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp) {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.questions);
        setsecondLeft(response.data.duration);
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
    examData && (
      <>
        <Divider />
        <h1 className="text-center">{examData?.name}</h1>
        <Divider />
        {view === 'instructions' && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
        )}
        {view === 'questions' && (
          <div>
            <div className="flex justify-between">
              <h1>
                {selectedQuestionIndex + 1}:{' '}
                {questions[selectedQuestionIndex].name}
              </h1>
              <div className="timer">{secondLeft}</div>
            </div>
            <div>
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => (
                  <div
                    key={index}
                    className={`text-xl ${
                      selectedOption[selectedQuestionIndex] === option
                        ? 'selected-option'
                        : 'option'
                    }`}
                    onClick={() =>
                      setSelectedOption({
                        ...selectedOption,
                        [selectedQuestionIndex]: option,
                      })
                    }
                  >
                    {option}: {questions[selectedQuestionIndex].options[option]}
                  </div>
                )
              )}
            </div>
            <div className="flex gap-1">
              {selectedQuestionIndex > 0 && (
                <Button
                  type="default"
                  onClick={() =>
                    setSelectedQuestionIndex(selectedQuestionIndex - 1)
                  }
                >
                  Previous
                </Button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <Button
                  type="default"
                  onClick={() =>
                    setSelectedQuestionIndex(selectedQuestionIndex + 1)
                  }
                >
                  Next
                </Button>
              )}
              {selectedQuestionIndex === questions.length - 1 && (
                <Popconfirm
                  title="Are you sure to submit this test?"
                  description="Are you sure to submit this test?"
                  onConfirm={() => {
                    setTimeUp(true);
                    clearInterval(intervalId);
                    calculateResult();
                  }}
                  onCancel={() => null}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">Submit</Button>
                </Popconfirm>
              )}
            </div>
          </div>
        )}
        {view === 'result' && (
          <div className="flex justify-center ">
            <div className="flex flex-col result">
              <h2>Result</h2>
              <div>
                <h3>Total marks: {examData.totalMarks}</h3>
                <h3>Obtained marks: {result?.correctAnswers.length}</h3>
                <h3>Wrong answers: {result?.wrongAnswers.length}</h3>
                <h3>VERDIT: {result?.verdict}</h3>
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
}
