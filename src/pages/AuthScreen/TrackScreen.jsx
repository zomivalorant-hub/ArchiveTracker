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
  DatePicker,
} from "antd";

import { useQueryClient } from "@tanstack/react-query";
import { FilePlusCorner, SearchCheck, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useAllTravel } from "../../services/travel/travQuery";
import {
  useCreateTravel,
  useDelTravel,
} from "../../services/travel/travMutation";

const TrackScreen = () => {
  const dataTravel = useAllTravel();
  const delTravel = useDelTravel();
  const addTravel = useCreateTravel();

  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const onFinishData = (values) => {
    let newData = { ...values, status: "Draft" };
    addTravel.mutate(newData, {
      onError: (e) => {
        message.error(e.message);
      },
      onSuccess: async () => {
        message.success("New travel order was added successfully!");
        form.resetFields();
        await queryClient.invalidateQueries("allTravel");
      },
    });
  };

  const handleDelete = (id) => {
    delTravel.mutate(id, {
      onError: (e) => {
        message.error(e.message);
      },
      onSuccess: async () => {
        message.success("Successfully deleted!");
        await queryClient.invalidateQueries("allTravel");
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

  const colTravel = [
    {
      title: <span className="text-gray-400">ToNo.</span>,
      dataIndex: "toid",
      key: "toid",
      ...getColumnSearchProps("toid"),
      render: (text) => <div className="font-mono text-gray-400">{text}.</div>,
    },
    {
      title: <span className="text-gray-400">Purpose of Trip</span>,
      dataIndex: "purpose",
      key: "purpose",
      ...getColumnSearchProps("purpose"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Destination</span>,
      dataIndex: "destination",
      key: "destination",
      ...getColumnSearchProps("destination"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Departure Date</span>,
      dataIndex: "depart",
      key: "depart",
      ...getColumnSearchProps("depart"),
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Return Date</span>,
      dataIndex: "return",
      key: "return",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (text) => <div className="font-mono text-gray-400">{text}</div>,
    },
    {
      title: <span className="text-gray-400">CreatedBy</span>,
      dataIndex: "createdby",
      key: "createdby",
      ...getColumnSearchProps("createdby"),
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
        List of travel roders
      </div>
      <div className="border-t-pink-700 border-t-2 shadow-sm">
        <Table
          rowKey={(dataTravel) => dataTravel.id}
          dataSource={dataTravel.data}
          columns={colTravel}
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
            label="TOno."
            name="toid"
            rules={[
              {
                required: true,
                message: "Please input Travel order no!",
              },
            ]}
          >
            <Input placeholder="ex. 2026-00394" />
          </Form.Item>

          <Form.Item
            label="Purpose of Trip"
            name="purpose"
            rules={[
              {
                required: true,
                message: "Please input purpose of trip!",
              },
            ]}
          >
            <Input placeholder="ex. seminar of learners" />
          </Form.Item>

          <Form.Item
            label="Destination"
            name="destination"
            rules={[
              {
                required: true,
                message: "Please input destination!",
              },
            ]}
          >
            <Input placeholder="ex. Iligan city." />
          </Form.Item>
          <Form.Item
            label="Departure Date"
            name="depart"
            rules={[
              {
                required: true,
                message: "Please input date departure!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Return Date"
            name="return"
            rules={[
              {
                required: true,
                message: "Please input dataman!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Created By"
            name="createdby"
            rules={[
              {
                required: true,
                message: "Please input created by!",
              },
            ]}
          >
            <Input placeholder="ex. John Wick" />
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

export default TrackScreen;
