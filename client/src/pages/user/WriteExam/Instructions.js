import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Instructions({ examData, setView, startTimer }) {
  return (
    <div className="flex flex-col item-center">
      <h2>Instructions</h2>
      <ul>
        <li className="mb-2">
          Exam must be completed in {examData.duration} minutes
        </li>
        <li className="mb-2">
          Exam will be submitted automatically after {examData.duration} minutes
        </li>
        <li className="mb-2">Once submitted, you cannot change your answers</li>
        <li className="mb-2">Do not refresh the page</li>
        <li className="mb-2">
          You can use the <b>Previous</b> and <b>Next</b> buttons to navigate
          between questions
        </li>
        <li className="mb-2">
          Total marks of the exam is {examData.totalMarks}
        </li>
      </ul>
      <Button
        type="primary"
        onClick={() => {
          startTimer();
          setView('questions');
        }}
      >
        Start Exam
      </Button>
    </div>
  );
}
