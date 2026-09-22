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
} from "antd";
import { useAllArchive } from "../../services/archive/archQuery";
import {
  useCreateArchive,
  useDelArchive,
  useUpdateArchive,
} from "../../services/archive/archMutation";
import { useQueryClient } from "@tanstack/react-query";
import { FilePlusCorner, PencilLine, SearchCheck, Trash } from "lucide-react";
import { useRef, useState } from "react";

const ArchiveScreen = () => {
  const dataArchive = useAllArchive();
  const delArchive = useDelArchive();
  const addArchive = useCreateArchive();
  const editArchive = useUpdateArchive();

  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [addEdit, setAddEdit] = useState(true);
  const [uid, setUid] = useState();

  const onFinishData = (values) => {
    if (addEdit) {
      addArchive.mutate(values, {
        onError: (e) => {
          message.error(e.message);
        },
        onSuccess: async () => {
          message.success("New archive was added successfully!");
          form.resetFields();
          setAddEdit(false);
          await queryClient.invalidateQueries("allArchive");
        },
      });
    } else {
      editArchive.mutate(
        { id: uid, ...values },
        {
          onError: (e) => {
            message.error(e.message);
          },
          onSuccess: async () => {
            message.success("Archive details was updated successfully!");
            form.resetFields();
            setAddEdit(true);
            setIsModalOpen(false);
            await queryClient.invalidateQueries("allArchive");
          },
        },
      );
    }
  };

  const onFill = (data) => {
    setUid(data.id);
    form.setFieldsValue({
      ...data,
    });
    setAddEdit(false);
    showModal();
    message.info("You are about editing archive details.");
  };

  const handleDelete = (id) => {
    delArchive.mutate(id, {
      onError: (e) => {
        message.error(e.message);
      },
      onSuccess: async () => {
        message.success("Successfully deleted!");
        await queryClient.invalidateQueries("allArchive");
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
      ...getColumnSearchProps("title"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Location</span>,
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location"),
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
      ...getColumnSearchProps("folder"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Semester</span>,
      dataIndex: "semester",
      key: "semester",
      ...getColumnSearchProps("semester"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Category</span>,
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
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
                description="Are you sure to delete this archive?"
                onConfirm={() => handleDelete(text.id)}
                okText="Yes"
                cancelText="No"
              >
                <Trash size="18" />
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
              {addEdit ? "Save" : "Save update"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ArchiveScreen;
