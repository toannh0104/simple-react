import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

function Dashboard() {
  return (
      <div>
        <h2>Dashboard</h2>
      </div>
  );
}

function Report() {
  return (
      <div>
        <h2>Report</h2>
      </div>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState({name: ''});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(res => res.json())
        .then((result) => {
              console.log(result);
              setUserProfile(result);
              localStorage.setItem("user-profile", JSON.stringify(result));
            },
            (error) => {
              console.error(error);
            }
        )
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="App">
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {userProfile && <div className="user-detail">
            Welcome: {userProfile.name}
          </div>}
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="appstore" />
              <span>
                <Link to="/">Dashboard</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="bar-chart" />
              <span>
                <Link to="/report">Report</Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggle}
            />
          </Header>
          <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
          >
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
            </Switch>

          </Content>
        </Layout>
      </Layout>
    </Router>
    </div>
  );
}

export default App;
