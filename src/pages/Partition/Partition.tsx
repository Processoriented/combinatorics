import React, { useCallback, useState } from "react";

import { Form, InputNumber, Button } from "antd";

import Result from "./Result";
import { partitionDef, resultObj } from './types';

import "./Partition.css";

const defaultParams = { n: 60, minSize: 2, minPartitions: 2 };
const defaultResult: resultObj = { partitions: [], params: defaultParams };

export default function Partition() {
  const [n, setN] = useState(defaultParams.n);
  const [minSize, setMinSize] = useState(defaultParams.minSize);
  const [minPartitions, setMinPartitions] = useState(defaultParams.minPartitions);
  const [result, setResult] = useState<resultObj>(defaultResult);

  const handleClick: React.MouseEventHandler = useCallback(
    (evt) => {
      evt.preventDefault();
      const nextResult: resultObj = {
        partitions: partition(n, minSize, minPartitions),
        params: { n, minSize, minPartitions },
      };
      setResult(defaultResult);
      setTimeout(() => {
        setResult(nextResult);
      }, 100);
    },
    [minPartitions, minSize, n]
  );

  return (
    <div>
      <h1>Partition</h1>
      <Form name="partition" initialValues={{ n, minSize, minPartitions }} layout="inline">
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
      <Result result={result} />
    </div>
  );
}

function partition(n: number, minSize: number, minPartitions: number): partitionDef[] {
  const result: partitionDef[] = [];

  function helper(
    n: number,
    minSize: number,
    minPartitions: number,
    currentPartition: Array<partitionDef | number>,
    start: number
  ) {
    if (n === 0 && currentPartition.length >= minPartitions) {
      const partitionObj: partitionDef = {};
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
  const getMaxSize = (partition: partitionDef) => Math.max(...Object.keys(partition).map(Number));
  // const getVariety = (partition: partitionDef) => {
  //   const sizes = new Set([...(Object.keys(partition).map(Number))]);
  //   if (sizes.size <= 1) return 0;
  //   const asArray = Array.from(sizes);
  //   const max = Math.max(...asArray);
  //   const min = Math.min(...asArray);
  //   return sizes.size + ((max - min) / n);
  // };
  return result.sort((a, b) => getMaxSize(b) - getMaxSize(a));
}
