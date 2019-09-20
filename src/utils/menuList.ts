/*
 * @Author: Estella Wang
 * @Date: 2019-08-26 15:25:54
 * @LastEditors: Estella Wang
 * @LastEditTime: 2019-09-20 17:14:07
 */
const menuList = [
    {
        value: 1,
        label: "库存",
        link: "/inventory",
        icon: "appstore",
    },
    {
        value: 2,
        label: "库位",
        link: "/inventory-location",
        icon: "appstore",
    },
    {
        value: 3,
        label: "物料",
        icon: "gold",
        link: "/material",
    },
    {
        value: 4,
        label: "载具",
        icon: "rocket",
        link: "/vehicle",
    },
    {
        value: 5,
        label: "主数据",
        icon: "setting",
        link: "/main-data",
        children: [
            {
                value: 5.1,
                label: "物料SKU",
                link: "/main-data/sku",
            },
            {
                value: 5.2,
                label: "载具类型",
                link: "/main-data/vehicles",
            },
        ],
    },
];

const menuIndex: any = {
    "/inventory": 1,
    "/inventory-location": 2,
    "/material": 3,
    "/vehicle": 4,
    "/main-data": 5,
    "/main-data/sku": 5.1,
    "/main-data/vehicles": 5.2,
};

export {menuList, menuIndex};
