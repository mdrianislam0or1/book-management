/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/main.routes";
import { managerPaths } from "../../routes/manager.routes";
import { userPaths } from "../../routes/user.routes";

const { Sider } = Layout;

const userRole = {
  ADMIN: "superAdmin",
  MANAGER: "manager",
  USER: "user",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log("user", user);

  let sidebarItems;

  switch ((user as any)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.MANAGER:
      sidebarItems = sidebarItemsGenerator(managerPaths, userRole.MANAGER);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="text-xl ">Blind Date With Book</h1>
      </div>
      <Menu
        style={{
          minHeight: "100vh",
        }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
