import { FontSizeOutlined } from "@ant-design/icons";
import { theme } from "antd";
import axios from "axios";

const defaultTheme = {
  token: {
    fontFamily: "'IBM Plex Sans',Inter",
    fontSize: 12,
    padding: 16,
  },
  algorithm: [theme.darkAlgorithm],
};

const instance = axios.create();

function useEndeavour() {
  return {};
}

export default useEndeavour;

export { defaultTheme, instance };
