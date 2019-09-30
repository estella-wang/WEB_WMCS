import React from "react";
// import * as styles from './index.less';
import WCSList from "@/layouts/wcs_list";
import tableColumns from "@/utils/tableColumns";

class Sku extends React.Component {
  public render() {
    return (
      <WCSList title="物料SKU" columns={tableColumns.sku}/>
    );
  }
}

export default Sku;
