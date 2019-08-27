import React from 'react';
import styles from './index.css';
import Link from 'umi/link';
import { Layout, Menu, Icon } from 'antd';
import {menuList, menuIndex} from '../utils/menuList';
// import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleMenuList(
    data: {
      value: number;
      label: string;
      icon?: string | undefined;
      link?: string | undefined;
      children?: { value: number; label: string; link?: string | undefined }[] | undefined;
    }[],
  ) {
    let menuListNode;
    return (
      data &&
      data.map(item => {
        if (item.children) {
          return (
            <SubMenu
              key={item.value}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.label}</span>
                </span>
              }
            >
              {this.handleMenuList(item.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.value}>
            <Link to={item.link ? item.link : '/404'}>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.label}</span>
            </Link>
          </Menu.Item>
        );
      })
    );
  }


  handleDefaultSelected() {
    if (menuIndex.hasOwnProperty(location.pathname)) {
      let selectedValue = menuIndex[location.pathname];
      let props: { defaultOpenKeys?: Array<string>; defaultSelectedKeys: Array<string> } = {
        defaultSelectedKeys: [selectedValue.toString()],
      };
      selectedValue < 1 ? (props.defaultOpenKeys = [Math.floor(selectedValue).toString()]) : null;
      return props;
    } else {
      return null;
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Layout className={styles.basicLayout}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={this.state.collapsed ? styles.collapsedLogo : styles.logo}></div>
          <Menu theme="dark" mode="inline" {...this.handleDefaultSelected()}>
            {this.handleMenuList(menuList)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 16px' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
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
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames={'fade'}
                timeout={300}
                unmountOnExit={true}
                appear={true}
              >
                {children}
              </CSSTransition>
            </TransitionGroup>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
