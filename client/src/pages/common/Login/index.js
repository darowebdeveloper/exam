import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../apicalls/user';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        window.location.href = '/';
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center item-center h-screen w-screen">
      <div className="card w-400 p-3">
        <div className="flex flex-col">
          <h1 className="text-2xl">Login</h1>
          <div className="divider"></div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex flex-col gap-2">
              <Button
                className="primary-contained-btn mt-2 w-100"
                htmlType="submit"
              >
                Submit
              </Button>
              <Link to={'/register'} className="underline">
                Not a member? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
