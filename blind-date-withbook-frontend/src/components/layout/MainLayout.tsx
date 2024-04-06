/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Layout } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
const { Header, Content } = Layout;
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout>
      <Sidebar />

      {/* <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            color: "white",

            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <h1>Book Management</h1>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={adminSidebarItems}
        />
      </Sider> */}
      <Layout>
        <Header>
          <Button onClick={handleLogout} type="primary" danger>
            Logout
          </Button>

          <Button type="primary" className="mx-2" danger>
            <Link to="/book/edit">Duplicate</Link>
          </Button>
        </Header>
        <Content>
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
