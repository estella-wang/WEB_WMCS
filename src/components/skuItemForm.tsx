import { Form, Input, Button, Select } from "antd";
import React, { Component } from "react";
import TextArea from "antd/lib/input/TextArea";

class SkuItemForm extends Component<{form: any, onSubmitForm: any, data: any}> {
  public handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.onSubmitForm(values);
      }
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="SKU编码">
          {getFieldDecorator("sku_code", {
            rules: [{ required: true, message: "请填写唯一的SKU编码！", type: "string" }],
          })(<Input placeholder="请填写SKU编码" />)}
        </Form.Item>
        <Form.Item label="SKU名称">
          {getFieldDecorator("sku_name", {
            rules: [{ required: true, message: "请填写SKU名称！", type: "string" }],
          })(<Input placeholder="请填写SKU名称" />)}
        </Form.Item>
        <Form.Item label="SKU分类">
          {getFieldDecorator("sku_category")(<Input placeholder="请填写SKU分类" />)}
        </Form.Item>
        <Form.Item label="SKU种类">
          {getFieldDecorator("sku_type", {
            rules: [{ required: true, message: "请选择SKU种类！" }],
          })(
            <Select optionLabelProp="children">
              <Select.Option value="0">资源类</Select.Option>
              <Select.Option value="1">原材料类</Select.Option>
              <Select.Option value="2">半成品类</Select.Option>
              <Select.Option value="3">成品类</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="安全库存">
          {getFieldDecorator("safety_stock", {
            rules: [{ required: true, message: "请填写安全库存！", type: "integer" }],
          })(<Input placeholder="请填写安全库存" />)}
        </Form.Item>
        <Form.Item label="额外信息">{getFieldDecorator("extra_info")(<TextArea />)}</Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSkuItemForm = Form.create({
  name: "sku_item",
  mapPropsToFields(props: any) {
    return {
      sku_code: Form.createFormField({
        ...props.sku_code,
        value: props.sku_code ? props.sku_code : "",
      }),
      sku_name: Form.createFormField({
        ...props.sku_name,
        value: props.sku_name ? props.sku_name : "",
      }),
      sku_category: Form.createFormField({
        ...props.sku_category,
        value: props.sku_category ? props.sku_category : "",
      }),
      sku_type: Form.createFormField({
        ...props.sku_type,
        value: props.sku_type ? props.sku_type.toString() : "0",
      }),
      safety_stock: Form.createFormField({
        ...props.safety_stock,
        value: props.safety_stock ? props.safety_stock : null,
      }),
      extra_info: Form.createFormField({
        ...props.extra_info,
        value: props.extra_info ? props.extra_info : "",
      }),
    };
  },
})(SkuItemForm);

export default WrappedSkuItemForm;

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
