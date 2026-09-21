import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Tooltip,
} from "antd";
import { useAllArchive } from "../../services/archive/archQuery";
import {
  useCreateArchive,
  useDelArchive,
} from "../../services/archive/archMutation";
import { useQueryClient } from "@tanstack/react-query";
import { FilePlusCorner, Trash } from "lucide-react";
import { useState } from "react";

const ArchiveScreen = () => {
  const dataArchive = useAllArchive();
  const delArchive = useDelArchive();
  const addArchive = useCreateArchive();

  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const onFinishData = (values) => {
    addArchive.mutate(values, {
      onError: (e) => {
        message.error(e.message);
      },
      onSuccess: async () => {
        message.success("New archive was added successfully!");
        form.resetFields();
        await queryClient.invalidateQueries("allArchive");
      },
    });
  };

  const handleDelete = (id) => {
    delArchive.mutate(id, {
      onError: (e) => {
        message.error(e.message);
      },
      onSuccess: async () => {
        message.success("Successfully deleted!");
        await queryClient.invalidateQueries("listSupplier");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const colArchive = [
    {
      title: <span className="text-gray-400">No.</span>,
      dataIndex: "id",
      key: "id",
      render: (text) => <div className="font-mono text-gray-400">{text}.</div>,
    },
    {
      title: <span className="text-gray-400">Code</span>,
      dataIndex: "code",
      key: "code",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Descriptive Title</span>,
      dataIndex: "title",
      key: "title",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Location</span>,
      dataIndex: "location",
      key: "location",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Shelve</span>,
      dataIndex: "shelve",
      key: "shelve",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">DataMan</span>,
      dataIndex: "dataman",
      key: "dataman",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Folder</span>,
      dataIndex: "folder",
      key: "folder",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Semester</span>,
      dataIndex: "semester",
      key: "semester",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Category</span>,
      dataIndex: "category",
      key: "category",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Action</span>,
      render: (_, text) => (
        <div className="font-medium text-center flex">
          <div className="text-red-400">
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete the supplier"
                description="Are you sure to delete this archive?"
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
      <div className="flex items-center justify-between mb-2">
        <Button type="dashed" onClick={showModal}>
          <FilePlusCorner />
          <span className="font-bold">Add New</span>
        </Button>
      </div>
      <div className="px-2 py-2 uppercase text-sm font-bold text-center">
        List of Archive Records
      </div>
      <div className="border-t-pink-700 border-t-2 shadow-sm">
        <Table
          rowKey={(dataArchive) => dataArchive.id}
          dataSource={dataArchive.data}
          columns={colArchive}
          size="small"
        />
      </div>
      <Modal
        title="Add New Record"
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
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input course code!",
              },
            ]}
          >
            <Input placeholder="ex. BSIT" />
          </Form.Item>

          <Form.Item
            label="Descriptive Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
            ]}
          >
            <Input placeholder="ex. Bachelor's of Science..." />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: "Please input location!",
              },
            ]}
          >
            <Input placeholder="ex. After Enrollment Report ect." />
          </Form.Item>
          <Form.Item
            label="Shelve"
            name="shelve"
            rules={[
              {
                required: true,
                message: "Please input shelve!",
              },
            ]}
          >
            <Input placeholder="ex. 1st, 2nd" />
          </Form.Item>
          <Form.Item
            label="DataMan"
            name="dataman"
            rules={[
              {
                required: true,
                message: "Please input dataman!",
              },
            ]}
          >
            <Input placeholder=" ex. red, blue, green" />
          </Form.Item>
          <Form.Item
            label="Folder"
            name="folder"
            rules={[
              {
                required: true,
                message: "Please input dataman!",
              },
            ]}
          >
            <Input placeholder="ex. 2023-2024" />
          </Form.Item>
          <Form.Item
            label="Semester"
            name="semester"
            rules={[
              {
                required: true,
                message: "Please input semester!",
              },
            ]}
          >
            <Input placeholder="ex. First Sem" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input category!",
              },
            ]}
          >
            <Input placeholder="ex. ROR,ROC" />
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

export default ArchiveScreen;
