import { Button, Card, Form, Input } from "antd";
import { useLogin } from "../services/auth/authMutation";

const AuthLogin = () => {
  const [form] = Form.useForm();

  const { mutateLogin, isLoadingLogin } = useLogin();

  const onFinish = async (val) => {
    mutateLogin(val, {
      onSuccess: () => {
        form.resetFields();
      },
    });
    console.log(val);
  };

  return (
    <div className="w-full flex items-center justify-center h-lvh">
      <Card
        title="Authentication"
        variant="borderless"
        className="md:w-md w-xs h-min"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="font-mono"> Please login your credentials</span>
          <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 5 }}
            className="w-full"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoadingLogin}
                block
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AuthLogin;
