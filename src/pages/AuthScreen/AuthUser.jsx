import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Select,
} from "antd";

import { useQueryClient } from "@tanstack/react-query";
import { FilePlusCorner, PencilLine, SearchCheck, Trash } from "lucide-react";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { useAllUsers } from "../../services/auth/authQuery";
import {
  useCreateUser,
  useDelUser,
  useUpdateUser,
} from "../../services/auth/authMutation";

const AuthUser = () => {
  const dataUsers = useAllUsers();
  const delUser = useDelUser();
  const addUser = useCreateUser();
  const editUser = useUpdateUser();

  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [addEdit, setAddEdit] = useState(true);
  const [uid, setUid] = useState();

  const searchInput = useRef(null);

  const onFinishData = (values) => {
    if (addEdit) {
      let newData = { ...values, status: "Draft" };
      addUser.mutate(newData, {
        onError: (e) => {
          message.error(e.message);
        },
        onSuccess: async () => {
          message.success("New User was added successfully!");
          form.resetFields();
          await queryClient.invalidateQueries("allUsers");
        },
      });
    } else {
      editUser.mutate(
        {
          id: uid,
          ...values,
        },
        {
          onError: (e) => {
            message.error(e.message);
          },
          onSuccess: async () => {
            message.success("User details was updated successfully!");
            form.resetFields();
            setAddEdit(true);
            setIsModalOpen(false);
            await queryClient.invalidateQueries("allUsers");
          },
        },
      );
    }
  };

  const onFill = (data) => {
    setUid(data.id);
    form.setFieldsValue({
      ...data,
      depart: dayjs(data.depart),
      return: dayjs(data.return),
      status: Number(data.status) === 1 ? "Active" : "InActive",
    });
    setAddEdit(false);
    showModal();
    message.info("You are about editing user details.");
  };

  const handleDelete = (id) => {
    delUser.mutate(id, {
      onError: (e) => {
        message.error(e.message);
      },
      onSuccess: async () => {
        message.success("Successfully deleted!");
        await queryClient.invalidateQueries("allUsers");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchCheck size="12" />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchCheck
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        // eslint-disable-next-line react/jsx-no-undef
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const colUsers = [
    {
      title: <span className="text-gray-400">No.</span>,
      dataIndex: "id",
      key: "id",
      render: (text) => <div className="font-mono text-gray-400">{text}.</div>,
    },
    {
      title: <span className="text-gray-400">FullName</span>,
      dataIndex: "fullname",
      key: "fullname",
      ...getColumnSearchProps("fullname"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Username</span>,
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Password</span>,
      dataIndex: "upassword",
      key: "upassword",
      ...getColumnSearchProps("upassword"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Role</span>,
      dataIndex: "role",
      key: "role",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (_, text) => (
        <div>
          {Number(text.status) == 1 ? (
            <div>
              <p className="text-sm text-green-600">Active</p>
            </div>
          ) : (
            Number(text.status)(
              <div>
                <p className="text-sm text-blue-600">InActive</p>
              </div>,
            )
          )}
        </div>
      ),
    },

    {
      title: <span className="text-gray-400">Action</span>,
      render: (_, text) => (
        <div className="gap-3 font-medium items-center justify-center flex">
          <div className="text-green-600">
            <Tooltip title="Edit Details" placement="top">
              <PencilLine onClick={() => onFill(text)} size="18" />
            </Tooltip>
          </div>
          <div className="text-red-400">
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete the supplier"
                description="Are you sure to delete this travel order?"
                onConfirm={() => handleDelete(text.id)}
                okText="Yes"
                cancelText="No"
              >
                <Trash />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-2">
        <Button type="dashed" onClick={showModal}>
          <FilePlusCorner />
          <span className="font-bold">Add New</span>
        </Button>
      </div>
      <div className="px-1 py-4 uppercase text-sm bg-amber-50 rounded-sm font-bold">
        List of System users
      </div>
      <div className="border-t-pink-700 border-t-2 shadow-sm">
        <Table
          rowKey={(dataUsers) => dataUsers.id}
          dataSource={dataUsers.data}
          columns={colUsers}
          size="small"
        />
      </div>
      <Modal
        title="Add New User"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          autoCapitalize="true"
          autoComplete="off"
          onFinish={onFinishData}
          variant="filled"
          labelCol={{ span: 6 }}
        >
          <Form.Item
            label="FullName"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input fullname!",
              },
            ]}
          >
            <Input placeholder="Jon Wick" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input username!",
              },
            ]}
          >
            <Input placeholder="ex. username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="upassword"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input placeholder="ex. pass143." />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input date departure!",
              },
            ]}
          >
            <Select
              placeholder="Select Role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "Encoder" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please input status!",
              },
            ]}
          >
            <Select
              defaultValue="1"
              placeholder="Select status"
              options={[
                { value: "1", label: "Active" },
                { value: "0", label: "InActive" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuthUser;
