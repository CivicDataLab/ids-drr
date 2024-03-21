import { useState } from 'react';
import { Button, Tag, Text } from 'opub-ui';

import { backendUrl } from '@/config/site';
import { formatDate } from '@/lib/utils';

export const DatasetResources = ({
  id,
  fileName,
  description,
  modified,
  format,
}: {
  id: string;
  fileName: string;
  description: string;
  modified: string;
  format: string;
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mb-4 flex flex-col gap-1">
      <div className="flex flex-row items-start justify-between gap-5 self-stretch">
        <div className="flex w-[356px] flex-col gap-1">
          <div className="flex gap-3">
            <Text fontWeight="semibold" variant="headingMd">
              {fileName}
            </Text>
            <Tag>{format}</Tag>
          </div>

          <Text variant="headingXs" fontWeight="medium">
            Updated : {formatDate(modified)}
          </Text>
        </div>

        <Button
          onClick={() =>
            (window.location.href = `${backendUrl.datasets}/download/${parseInt(id)}/`)
          }
          className="w-[136px] bg-[#71E57D] text-baseGraySlateSolid12 shadow-insetButton "
        >
          Download
        </Button>
      </div>
      <div className="flex w-[320px] flex-col">
        <Text
          className=" block w-[320px]"
          variant="headingXs"
          fontWeight="medium"
          color="default"
          truncate={!showMore}
        >
          {description}
        </Text>
        <Button
          className="self-end"
          onClick={() => setShowMore(!showMore)}
          variant="interactive"
          size="slim"
          kind="tertiary"
        >
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      </div>
    </div>
  );
};
