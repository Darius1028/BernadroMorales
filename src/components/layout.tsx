import { Layout } from "antd";
const { Header, Content } = Layout;

export const LayoutWrap = ({ children }: any) => {
  return (
    <Layout>
      <Header style={{ padding: "0 150px" }} className='header'>
        <div className='title'>HACKER NEWS</div>
      </Header>
      <Content style={{ padding: "0 150px" }}>{children}</Content>
    </Layout>
  );
};
