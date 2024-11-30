

export type partitionDef = Record<string, number>;

export type resultObj = {
  partitions: partitionDef[];
  params: {
    n: number;
    minSize: number;
    minPartitions: number;
  };
};
