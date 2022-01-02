import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { FC, ReactNode } from "react";
import logo from "../logo.png";

interface Props {
    children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
    return (
        <Layout>
            <Header style={{ textAlign: 'center', height: 'auto' }}>
                <img src={logo} style={{ width: '250px', verticalAlign: 'middle'}} className="App-logo" alt="logo" />
            </Header>
            <Content style={{ height: "100%" }}>{children}</Content>
        </Layout>
    );
};
