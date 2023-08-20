import React from "react";
import { Spin } from "antd";

function Loader({ loading = false, children }) {
  return loading ? <Spin>{children}</Spin> : children;
}

export default Loader;
