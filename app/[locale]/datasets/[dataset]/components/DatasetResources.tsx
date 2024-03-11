import Link from 'next/link';
import { Button, ButtonGroup, Text } from 'opub-ui';

import { backendUrl } from '@/config/site';
import { formatDate } from '@/lib/utils';

export const DatasetResources = ({
  id,
  fileName,
  size,
  modified,
}: {
  id: string;
  fileName: string;
  size: number;
  modified: string;
}) => {
  return (
    <div className="flex flex-row items-start justify-between gap-5 self-stretch p-2 ">
      <div className="flex w-[356px] flex-col gap-1">
        <Text fontWeight="semibold" variant="headingMd">
          {fileName}
        </Text>
        <Text variant="headingXs" fontWeight="medium">
          Updated : {formatDate(modified)}
        </Text>
      </div>

      {/* <Text className="min-w-[50px]" variant="headingXs" fontWeight="medium">
        ({size.toString()}K)
      </Text> */}

      <Button className="w-[136px] bg-[#71E57D] text-baseGraySlateSolid12 ">
        <Link href={`${backendUrl.datasets}/download/${parseInt(id)}/`}>
          Download
        </Link>
      </Button>
    </div>
  );
};
