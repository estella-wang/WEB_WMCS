/*
 * @Author: Estella Wang
 * @Date: 2019-09-19 17:09:19
 * @LastEditors: Estella Wang
 * @LastEditTime: 2019-09-19 19:02:18
 */
const tableColumns = {
    sku: [
        {
            title: "SKU编码",
            dataIndex: "sku_code",
            align: "center",
        },
        {
            title: "SKU名称",
            dataIndex: "sku_name",
            align: "center",
        },
        {
            title: "SKU分类",
            dataIndex: "sku_category",
            align: "center",
        },
        {
            title: "SKU种类",
            dataIndex: "sku_type",
            align: "center",
        },
        {
            title: "安全库存",
            dataIndex: "safety_stock",
            align: "center",
        },
        {
            title: "额外信息",
            dataIndex: "extra_info",
            align: "center",
        },
    ],
};

export default tableColumns;
