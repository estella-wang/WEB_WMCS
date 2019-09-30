// import { func } from 'prop-types';

/*
 * @Author: Estella Wang
 * @Date: 2019-09-19 17:09:19
 * @LastEditors: Estella Wang
 * @LastEditTime: 2019-09-30 18:42:00
 */
const tableColumns = {
    sku: [
        {
            title: "SKU编码",
            dataIndex: "sku_code",
            align: "center",
            editType: "input",
            required: true,
            dataType: "string",
        },
        {
            title: "SKU名称",
            dataIndex: "sku_name",
            align: "center",
            editType: "input",
            required: true,
            dataType: "string",
        },
        {
            title: "SKU分类",
            dataIndex: "sku_category",
            align: "center",
            editType: "input",
            required: true,
            dataType: "string",
        },
        {
            title: "SKU种类",
            dataIndex: "sku_type",
            align: "center",
            editType: "select",
            required: true,
            dataType: "number",
            defaultOption: 0,
            selectOption: [
                {
                    label: "资源类",
                    value: 0,
                },
                {
                    label: "原材料类",
                    value: 1,
                },
                {
                    label: "半成品类",
                    value: 2,
                },
                {
                    label: "成品类",
                    value: 3,
                },
            ],
        },
        {
            title: "安全库存",
            dataIndex: "safety_stock",
            align: "center",
            editType: "input",
            dataType: "number",
            required: true,
        },
        {
            title: "额外信息",
            dataIndex: "extra_info",
            align: "center",
            editType: "input",
            dataType: "string",
            required: false,
        },
    ],
};

export default tableColumns;
