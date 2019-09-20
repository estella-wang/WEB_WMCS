/*
 * @Author: Estella Wang
 * @Date: 2019-08-26 11:55:26
 * @LastEditors: Estella Wang
 * @LastEditTime: 2019-08-26 11:55:26
 */
import { IConfig } from "umi-types";

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ["umi-plugin-react", {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: "自动化仓库",
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
};

export default config;
