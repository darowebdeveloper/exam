export const columnsForExamTable = [
  {
    title: 'Exam name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text, record) => record.category.name,
  },
  {
    title: 'Total Marks',
    dataIndex: 'totalMarks',
    key: 'total-marks',
  },
  {
    title: 'Passing Marks',
    dataIndex: 'passingMarks',
    key: 'passing-marks',
  },
];
