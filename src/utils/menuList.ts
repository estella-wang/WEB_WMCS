/*
 * @Author: Estella Wang
 * @Date: 2019-08-26 15:25:54
 * @LastEditors: Estella Wang
 * @LastEditTime: 2019-08-26 18:33:14
 */
let menuList : { value: number , label: string, icon?: string, link?: string, children?: {value: number , label: string, link?: string}[] }[] = [
    {
        value: 0,
        label: "仓库",
        icon: "appstore",
        children: [
            {
                value: 0.1,
                label: '库存',
                link: '/warehouse/inventory'
            },
            {
                value: 0.2,
                label: '库位',
                link: '/warehouse/inventory-location'
            }
        ]
    },
    {
        value: 1,
        label: "物料",
        icon: "gold",
        link: '/material'
    },
    {
        value: 2,
        label: '载具',
        icon: "rocket",
        link: '/vehicle'
    },
    {
        value: 3,
        label: '主数据',
        icon: "setting",
        link: '/main-data'
    }
]

let menuIndex:any = {
    "/warehouse/inventory": 0.1,
    "/warehouse/inventory-location": 0.2,
    "/material": 1,
    "/vehicle": 2,
    "/main-data": 3
}

export {menuList, menuIndex};