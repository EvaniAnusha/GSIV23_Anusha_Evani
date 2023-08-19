import React from "react";
import { Spin } from "antd";

function Loader({ loading = false, children, tip = "Loading..." }) {
  return loading ? <Spin tip={tip}>{children}</Spin> : children;
}

export default Loader;
