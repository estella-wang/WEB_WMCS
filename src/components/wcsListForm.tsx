import { Form, Input, Button, Select } from "antd";
import React, { Component } from "react";
import TextArea from "antd/lib/input/TextArea";

class WcsListForm extends Component<{ form: any; onSubmitForm: any; data: any; field: any }> {
  public handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.onSubmitForm(values);
      }
    });
  }

  public formValidator = (callback: any, rule?: any, value?: any) => {
    console.log(rule, value);
    callback();
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.props.field.map((item: any) => {
          let formItem;
          const rules = [];

          if (item.required) {
            rules.push({
              required: true,
              message: "请填写" + item.title + "！",
              type: item.dataType,
            });
          }

          switch (item.editType) {
            case "select":
              formItem = (
                <Select optionLabelProp="children">
                  {item.selectOption.map((optionItem: any) => {
                    return (
                      // tslint:disable-next-line: jsx-key
                      <Select.Option value={optionItem.value}>{optionItem.label}</Select.Option>
                    );
                  })}
                </Select>
              );
              break;
            case "input":
              formItem = <Input placeholder={"请填写" + item.title} />;
              break;
            case "textarea":
              formItem = <TextArea />;
              break;
            default:
              formItem = <Input placeholder={"请填写" + item.title} />;
              break;
          }
          return (
            // tslint:disable-next-line: jsx-key
            <Form.Item label={item.title}>
              {getFieldDecorator(item.dataIndex, {
                rules,
              })(formItem)}
            </Form.Item>
          );
        })}
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedWcsListForm = Form.create({
  name: "wcs_list_form",
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
})(WcsListForm);

export default WrappedWcsListForm;

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
