import React from 'react';
import { Layout } from 'antd';
import ResourceCard from '../Components/ResourceCard';
import PropTypes from "prop-types";
const { Header, Sider, Content } = Layout;

// the main layout (homepage)
const ResourceLayout = ({ siderContent }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
            <Layout>
                <Sider
                    width="auto"
                    style={{ backgroundColor: 'white', padding: "1.5rem" }}
                    breakpoint="lg"
                >
                    {siderContent}
                </Sider>
                <Content style={{ margin: '24px 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <ResourceCard />
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};

ResourceLayout.propTypes = {
    siderContent: PropTypes.node,
};


export default ResourceLayout;