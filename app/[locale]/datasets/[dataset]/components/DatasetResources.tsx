import { Button, ButtonGroup, Text } from 'opub-ui';

import { formatDate } from '@/lib/utils';

export const DatasetResources = ({
  fileName,
  size,
  modified,
}: {
  fileName: string;
  size: number;
  modified: string;
}) => {
  return (
    <div className="flex flex-row items-start justify-between gap-5 self-stretch p-2 ">
      <div className="flex flex-col gap-1">
        <Text fontWeight="semibold" variant="headingMd">
          {fileName}
        </Text>
        <Text variant="headingXs" fontWeight="medium">
          Updated : {formatDate(modified)}
        </Text>
      </div>
      <Text className="min-w-[50px]" variant="headingXs" fontWeight="medium">
        {size.toString()}
      </Text>

      <Button className="w-[136px] bg-[#71E57D] text-baseGraySlateSolid12 ">
        Download
      </Button>
    </div>
  );
};
