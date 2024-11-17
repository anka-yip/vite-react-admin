import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Form, Row, Space, Table, theme } from "antd";
import React from "react";

function DataTable({
  uri,
  tableRowKey = "id",
  size = "small",
  tableBordered,
  tableColumns = [],
}) {
  const { token } = theme.useToken();
  const query = useQuery({
    queryKey: ["data-table", uri],
    queryFn: () => {
      return fetch(uri)
        .then((res) => res.json())
        .then((res) => {
          return res;
          O;
        });
    },
  });

  return (
    <Row gutter={[token.padding, token.padding]}>
      <Col span={24}>
        <Card title="Filters" size={size}>
          <Form layout="vertical">
            <Form.Item>
              <Space>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Search
                </Button>
                <Button icon={<ClearOutlined />}>Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Table
          loading={query.isFetching}
          rowKey={tableRowKey}
          size={size}
          columns={tableColumns}
          dataSource={query.data}
          bordered={tableBordered}
        />
      </Col>
    </Row>
  );
}

export default DataTable;
