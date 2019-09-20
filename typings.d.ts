/*
 * @Author: Estella Wang
 * @Date: 2019-09-19 16:50:38
 * @LastEditors: Estella Wang
 * @LastEditTime: 2019-09-19 16:50:38
 */
declare module "dva";
declare module "*.css";
declare module "*.less";
declare module "*.svg";
declare module "*.png";
declare module "*.json" {
  const content: object;
  export default content;
}
