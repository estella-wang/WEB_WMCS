import React from "react";
import styles from "./wcs_list.less";
import { Row, Col, Typography, Modal, Button, Table, Drawer, Popconfirm, message } from "antd";
import tableColumns from "@/utils/tableColumns";
// import { connect } from 'dva';
import WrappedSkuItemForm from "@/components/skuItemForm";

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
  { title?: string },
  { visible: boolean; selectedRowKeys: any; actionName: string; sku_item: any; data: any }
> {
  public state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    visible: false,
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
            title="确定删除该SKU对象？"
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
      visible: true,
    });
  }

  public handleDelete = (ids: number[]) => {
    console.log(ids);
  }

  public handleEdit = (record: any) => {
    this.setState({
      visible: true,
      actionName: "编辑SKU对象",
      sku_item: record,
    });
  }

  public handleCreate = () => {
    this.setState({
      visible: true,
      actionName: "增加SKU对象",
      sku_item: {},
    });
  }

  public onClose = () => {
    this.setState({
      visible: false,
    });
  }

  // data
  public handleSubmit = () => {
    console.log(data);
    message.success("SKU对象添加成功！");
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
          columns={this.handleTableColumnsAction(tableColumns.sku)}
          dataSource={data}
          rowKey="uid"
        />
        <Drawer
          title={this.state.actionName}
          placement="right"
          closable={false}
          width={640}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <WrappedSkuItemForm
            {...this.state.sku_item}
            onSubmitForm={this.handleSubmit}
          />
        </Drawer>
      </div>
    );
  }
}

export default WCSList;
