import React, { useCallback, useState } from "react";

import { Form, InputNumber, Button } from "antd";

type Partition = Record<string, number>;

type resultObj = {
  partitions: Partition[];
  params: {
    n: number;
    minSize: number;
    minPartitions: number;
  };
};

export default function Partition() {
  const [n, setN] = useState(60);
  const [minSize, setMinSize] = useState(2);
  const [minPartitions, setMinPartitions] = useState(2);
  const [result, setResult] = useState<resultObj>({
    partitions: [],
    params: { n, minSize, minPartitions },
  });

  const handleClick: React.MouseEventHandler = useCallback(
    (evt) => {
      evt.preventDefault();
      const nextResult: resultObj = {
        partitions: partition(n, minSize, minPartitions),
        params: { n, minSize, minPartitions },
      };
      setResult(nextResult);
    },
    [minPartitions, minSize, n]
  );

  return (
    <div>
      <h1>Partition</h1>
      <Form name="partition" initialValues={{ n, minSize, minPartitions }}>
        <Form.Item label="n" name="n" rules={[{ required: true, message: "Please input n!" }]}>
          <InputNumber onChange={(value) => setN((prev) => (value as number) ?? prev)} />
        </Form.Item>

        <Form.Item
          label="minSize"
          name="minSize"
          rules={[{ required: true, message: "Please input minSize!" }]}
        >
          <InputNumber onChange={(value) => setMinSize((prev) => (value as number) ?? prev)} />
        </Form.Item>

        <Form.Item
          label="minPartitions"
          name="minPartitions"
          rules={[{ required: true, message: "Please input minPartitions!" }]}
        >
          <InputNumber onChange={(value) => setMinPartitions((prev) => (value as number) ?? prev)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleClick}>
            Partition
          </Button>
        </Form.Item>
      </Form>
      {Array.isArray(result.partitions) && result.partitions.length > 0 && (
        <p>{`Found ${result.partitions.length} different ways to partition ${result.params.n} items where each subset has at least ${result.params.minSize} items and there are at least ${result.params.minPartitions} subsets.`}</p>
      )}
    </div>
  );
}

function partition(n: number, minSize: number, minPartitions: number): Partition[] {
  const result: Partition[] = [];

  function helper(
    n: number,
    minSize: number,
    minPartitions: number,
    currentPartition: Array<Partition | number>,
    start: number
  ) {
    if (n === 0 && currentPartition.length >= minPartitions) {
      const partitionObj: Partition = {};
      currentPartition.forEach((size) => {
        partitionObj[`${size}`] = (partitionObj[`${size}`] || 0) + 1;
      });
      result.push(partitionObj);
      return;
    }

    for (let i = start; i <= n; i++) {
      if (i >= minSize) {
        helper(n - i, minSize, minPartitions, [...currentPartition, i], i);
      }
    }
  }

  helper(n, minSize, minPartitions, [], minSize);
  return result; // .filter((grouping) => Object.keys(grouping).length > 1);
}
