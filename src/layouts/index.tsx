import React from "react";
import styles from "./index.css";
import Link from "umi/link";
import { Layout, Menu, Icon } from "antd";
import { menuList, menuIndex } from "../utils/menuList";
// import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const location = window.location;

class BasicLayout extends React.Component {
  public state = {
    collapsed: false,
  };

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  public handleMenuList(
    data: Array<{
      value: number;
      label: string;
      icon?: string | undefined;
      link?: string | undefined;
      children?: Array<{ value: number; label: string; link?: string | undefined }> | undefined;
    }>,
  ) {
    return (
      data &&
      data.map((item) => {
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
            <Link to={item.link ? item.link : "/404"}>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.label}</span>
            </Link>
          </Menu.Item>
        );
      })
    );
  }

  public handleDefaultSelected() {
    if (menuIndex.hasOwnProperty(location.pathname)) {
      const selectedValue = menuIndex[location.pathname];
      const props: { defaultOpenKeys?: string[]; defaultSelectedKeys: string[] } = {
        defaultSelectedKeys: [selectedValue.toString()],
      };
      selectedValue > 5 ? props.defaultOpenKeys = [Math.floor(selectedValue).toString()] : props.defaultOpenKeys = [];
      return props;
    } else {
      return null;
    }
  }

  public render() {
    const { children } = this.props;
    return (
      <Layout className={styles.basicLayout}>
        <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
          <div className={this.state.collapsed ? styles.collapsedLogo : styles.logo} />
          <Menu theme="dark" mode="inline" {...this.handleDefaultSelected()}>
            {this.handleMenuList(menuList)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: "0 16px" }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
            }}
          >
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames={"fade"}
                timeout={300}
                unmountOnExit={true}
                appear={true}
              >
                <div className={styles.pageContentWrapper}>{children}</div>
              </CSSTransition>
            </TransitionGroup>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
