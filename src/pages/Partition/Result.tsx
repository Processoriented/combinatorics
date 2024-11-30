import React, { useEffect, useMemo, useState } from "react";

import { Pagination } from 'antd';

import { resultObj } from "./types";
import Coin from "../../assets/coin.svg";

export default function Result({ result }: { result: resultObj }) {
  const [variant, setVariant] = useState(0);
  const partitions = useMemo(() => result?.partitions ?? [], [result]);

  const { n, minSize, minPartitions } = useMemo(
    () => result?.params ?? { n: 0, minSize: 0, minPartitions: 0 },
    [result]
  );

  const hasResult = useMemo(() => Array.isArray(partitions) && partitions.length > 0, [partitions]);

  useEffect(() => {
    if (!hasResult) setVariant(0);
  }, [hasResult]);

  const message = useMemo(() => {
    const main = `Found ${partitions.length} different ways to partition ${n} items`;
    const sizeQualifier = `where each subset has at least ${minSize} items`;
    const countQualifier = `and there are at least ${minPartitions} subsets.`;
    return `${main} ${sizeQualifier} ${countQualifier}`;
  }, [n, minSize, minPartitions, partitions.length]);

  const partition = useMemo(() => partitions[variant], [partitions, variant]);

  return !hasResult ? null : (
    <>
      <p>{message}</p>
      <div key={variant} className="partition-grouping">
        <Pagination
          className="result-pagination"
          total={partitions.length}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total) => `Total ${total} variants`}
          pageSize={1}
          current={variant + 1}
          onChange={(page) => setVariant(page - 1)}
          responsive
        />
        <div className="stack-wrapper">
          {Object.entries(partition)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([size, count]) => {
              const sizeInt = parseInt(size);
              const stacks = Array.from({ length: count }, (_, idx) => idx);
              const coins = Array.from({ length: sizeInt }, (_, idx) => idx);
              return (
                <React.Fragment key={`partition-${variant}-${size}`}>
                  {stacks.map((stack) => (
                    <div className="coin-stack" key={`partition-${variant}-${size}-${stack}`}>
                      {coins.map((_coin, j) => (
                        <img
                          src={Coin}
                          alt="coin"
                          className="coin"
                          key={`coin-${variant}-${size}-${stack}-${j}`}
                          style={{ zIndex: coins.length - j }}
                        />
                      ))}
                      <h4>{`${size}`}</h4>
                    </div>
                  ))}
                </React.Fragment>
              );
            })}
        </div>
        <div className="partition-description">
          {Object.entries(partition)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([size, count]) => (
              <span
                key={`partition-desc-${variant}-${size}`}
              >{`${count} stack${count > 1 ? "s" : ""} of ${size}`}</span>
            ))}
        </div>
      </div>
    </>
  );
}
