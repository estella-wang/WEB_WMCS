import React from "react";
import { Row, Col, Typography, Button, Select, Input, Form, message } from "antd";
import styles from "./list_search.less";

const { Title } = Typography;

interface ISelection {
  field: string;
  op: string;
  data: any;
}

class ListSearch extends React.Component<
  { search_field: any; form: any },
  { selection: Array<{ field: string; op: string; data: any }>; selectAllowClear: boolean }
> {
  public state = {
    selection: [] as ISelection[],
    selectAllowClear: true,
  };

  public operatorI18n: { [key: string]: string } = {
    eq: "等于",
    ne: "不等于",
    lt: "小于",
    le: "小于等于",
    gt: "大于",
    ge: "大于等于",
    bw: "开始于",
    bn: "不开始于",
    in: "属于",
    ni: "不属于",
    ew: "结束于",
    en: "不结束于",
    cn: "包含",
    nc: "不包含",
  };

  public operator: { [key: string]: string } = {
    eq: "=",
    ne: "≠",
    lt: "＜",
    le: "≤",
    gt: "＞",
    ge: "≥",
    bw: this.operatorI18n.bw,
    bn: this.operatorI18n.bn,
    in: this.operatorI18n.in,
    ni: this.operatorI18n.ni,
    ew: this.operatorI18n.ew,
    en: this.operatorI18n.en,
    cn: this.operatorI18n.cn,
    nc: this.operatorI18n.nc,
  };

  // public handleOperatorOption = () => {
  //     for(let item in this.operatorI18n) {
  //         return (<Select.Option value={item}>123</Select.Option>);
  //     }
  // }

  public handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: { field: string; op: string; data: any }) => {
      if (!err) {
        if (this.isUnique(values)) {
            this.state.selection.push(values);
        } else {
            message.warning("该条件已被添加, 请勿重复添加！");
        }
        console.log("Received values of form: ", values);
        // this.props.onSubmitForm(values);
      }
    });
  }

  public isUnique = (addItem: ISelection) => {
    const data = this.state.selection.filter((item: ISelection) => {
      return item.field === addItem.field && item.op === addItem.op && item.data === addItem.data;
    });

    return data.length === 0;
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.filterWrapper}>
        <div className="filteredItem">
          <Row>
            <Col span={12}>
              <Title level={4}>已选选项{this.state.selection.length > 0 ? "" : " - None"}</Title>
            </Col>
            <Col span={12} className={styles.alignRight}>
              <Button className={styles.marginRight20}>重置</Button>
              <Button type="primary" className={styles.marginRight20}>
                查询
              </Button>
            </Col>
          </Row>
          <Row>
            {this.state.selection.map((item) => {
              // tslint:disable-next-line: jsx-key
              return <Col span={4}>物料编码 = K001</Col>;
            })}
          </Row>
        </div>
        <div className={styles.filterSettingWrapper}>
          <Title level={4}>添加筛选条件</Title>
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("field", {
                    rules: [
                      {
                        required: true,
                        message: "请选择字段！",
                        type: "string",
                      },
                    ],
                  })(
                    <Select
                      optionLabelProp="children"
                      className={styles.filterSelect}
                      placeholder="选择字段"
                      allowClear={this.state.selectAllowClear}
                    >
                      {this.props.search_field.map((item: any) => {
                        // tslint:disable-next-line: jsx-key
                        return <Select.Option value={item.dataIndex}>{item.title}</Select.Option>;
                      })}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("op", {
                    rules: [
                      {
                        required: true,
                        message: "请选择逻辑！",
                        type: "string",
                      },
                    ],
                  })(
                    <Select
                      optionLabelProp="children"
                      className={styles.filterSelect}
                      placeholder="逻辑判断"
                      allowClear={this.state.selectAllowClear}
                    >
                      {Object.keys(this.operatorI18n).map((value, index) => {
                        return (
                          // tslint:disable-next-line: jsx-key
                          <Select.Option value={value}>{this.operatorI18n[value]}</Select.Option>
                        );
                      })}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator("data", {
                    rules: [
                      {
                        required: true,
                        message: "请填写要搜索的内容！",
                        type: "string",
                      },
                    ],
                  })(<Input placeholder="输入您要搜索的内容" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit">
                  添加
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedListSearch = Form.create({
  name: "list_search_form",
  mapPropsToFields(props: any) {
    const fieldDefault: { [key: string]: any } = {};
    // tslint:disable-next-line: forin
    for (const item in props) {
      fieldDefault[item] = Form.createFormField({
        ...props[item],
        value: props[item],
      });
    }
    console.log(fieldDefault);
    return fieldDefault;
  },
})(ListSearch);
export default WrappedListSearch;
