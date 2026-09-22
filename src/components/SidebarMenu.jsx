import { useQueryClient } from "@tanstack/react-query";
import { Flex, Menu } from "antd";
import {
  BookOpenText,
  ClipboardClock,
  FolderArchive,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SidebarMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const validUser = queryClient.getQueryData(["userInfo"]);

  const items = [
    getItem("Dashboard", "/", <LayoutDashboard />),

    ...(validUser?.role === "admin"
      ? [
          getItem("Archive", "/archive", <FolderArchive />),
          getItem("Tracking", "/track", <ClipboardClock />),
        ]
      : []),

    // getItem("Registrar", "/container", <LayoutDashboard />, [
    //   getItem("Enrollment", "/enrollment"),
    //   getItem("Promotional", "/promotional"),
    //   getItem("Completed", "/ta-records"),
    // ]),
    // ...(validUser?.role === "guest"
    //   ? [
    //       getItem("Guest", "/offices", <UserGroup />),
    //       getItem("Personnel", "/personnel", <UserGroup />),
    //       getItem("System Users", "/users", <UserGroup />),
    //       getItem("Settings", "/settings", <UserGroup />),
    //     ]
    //   : []),
  ];

  return (
    <>
      <Flex align="center" justify="center" className="h-16 border-gray-300">
        <div className="logo">
          <BookOpenText style={{ fontSize: "24px", color: "#1890ff" }} />
        </div>
      </Flex>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={["/"]}
        onClick={(item) => {
          navigate(item.key);
        }}
        items={items}
      />
    </>
  );
};

export default SidebarMenu;
