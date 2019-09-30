import React from "react";
import styles from "./wcs_list.less";
import { Row, Col, Typography, Modal, Button, Table, Drawer, Popconfirm, message } from "antd";
// import { connect } from 'dva';
import WrappedWcsListForm from "@/components/wcsListForm";
import WrappedListSearch from "@/components/list_search";

const { Title } = Typography;
const { confirm } = Modal;

const data:
  | Array<{
      sku_code: string;
      sku_name: string;
      sku_category: string;
      sku_type: number;
      safety_stock: number;
      extra_info: any;
    }>
  | undefined = [];
for (let i = 0; i < 4; i++) {
  data.push({
    sku_code: (i + 1).toString(),
    sku_name: `Edward King ${i}`,
    sku_category: "类别",
    sku_type: 1,
    safety_stock: 30,
    extra_info: `extra ${i}`,
  });
}

class WCSList extends React.Component<
  { title?: string, columns: any },
  { drawerVisible: boolean; selectedRowKeys: any; actionName: string; sku_item: any; data: any, filterVisible: boolean }
> {
  public state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    drawerVisible: false,
    filterVisible: false,
    sku_item: {},
    actionName: "",
    data,
  };

  public onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  public handleTableColumnsAction = (columns: any) => {
    const actionCol = {
      title: "Action",
      key: "action",
      align: "center",
      render: (text: any, record: any) => (
        <div className="actionCol">
          <Button type="link" icon="form" onClick={this.handleEdit.bind(this, record)} />
          <Popconfirm
            title={this.props.title ? "确定删除该" + this.props.title + "？" : "确定删除"}
            onConfirm={this.handleDelete.bind(this, [record.sku_code])}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon="close-circle" className={styles.actionDeleteBtn} />
          </Popconfirm>
        </div>
      ),
    };

    return [...columns, actionCol];
  }

  public showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  }

  public handleDelete = (ids: number[]) => {
    console.log(ids);
  }

  public handleEdit = (record: any) => {
    this.setState({
      drawerVisible: true,
      actionName: "编辑SKU对象",
      sku_item: record,
    });
  }

  public handleCreate = () => {
    const record: { [key: string]: any } = {};
    this.props.columns.map((item: { dataType: string; dataIndex: string; editType: string; defaultOption: any}) => {
      if (item.dataType === "string" && item.editType === "input") {
        record[item.dataIndex] = "";
      } else if (item.editType === "select" && item.hasOwnProperty("defaultOption")) {
        record[item.dataIndex] = 0;
      } else {
        record[item.dataIndex] = null;
      }
      return null;
    });

    this.setState({
      drawerVisible: true,
      actionName: "增加SKU对象",
      sku_item: record,
    });
  }

  public onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  }

  // data
  public handleSubmit = () => {
    console.log(data);
    message.success(this.props.title ? this.props.title + "添加成功！" : "添加成功！");
    // this.setState({
    //   this.data.push()
    // });
    this.onClose();
  }

  public deleteConfirm = () => {
    confirm({
      title: "确定要批量删除" + this.state.selectedRowKeys.length + "个对象?",
      onOk() {
        message.success("批量删除成功！");
      },
    });
  }

  public handleFilterShow = () => {
    this.setState({
      filterVisible: true,
    });
  }

  public handleFilterCancel = () => {
    this.setState({
      filterVisible: false,
    });
  }

  public render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className={styles.listWrapper}>
        <div style={{ marginBottom: 16 }}>
          <Row>
            <Col span={12}>
              <Title level={3}>{this.props.title}</Title>
            </Col>
            <Col span={12}>
              <div className={styles.actionBtnGroup}>
                <Button
                  type="link"
                  className={styles.actionButton}
                  icon="search"
                  onClick={this.handleFilterShow}
                />
                <Button
                  type="link"
                  className={styles.actionButton}
                  icon="plus-circle"
                  onClick={this.handleCreate}
                />
                <Button
                  type="link"
                  className={styles.actionButton}
                  disabled={!hasSelected}
                  icon="delete"
                  onClick={this.deleteConfirm}
                />
              </div>
            </Col>
          </Row>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={this.handleTableColumnsAction(this.props.columns)}
          dataSource={data}
          rowKey="uid"
        />
        <Drawer
          title={this.state.actionName}
          placement="right"
          closable={false}
          width={640}
          onClose={this.onClose}
          visible={this.state.drawerVisible}
        >
          <WrappedWcsListForm
            {...this.state.sku_item}
            onSubmitForm={this.handleSubmit}
            field={this.props.columns}
          />
        </Drawer>
        <Modal
          visible={this.state.filterVisible}
          footer={null}
          width="70%"
          onCancel={this.handleFilterCancel}
        >
          <WrappedListSearch search_field={this.props.columns} />
        </Modal>
      </div>
    );
  }
}

export default WCSList;
