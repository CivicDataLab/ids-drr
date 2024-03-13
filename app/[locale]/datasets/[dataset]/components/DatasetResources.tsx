import { useState } from 'react';
import Link from 'next/link';
import { Button, ButtonGroup, Tag, Text } from 'opub-ui';
import { TRUE } from 'sass';

import { backendUrl } from '@/config/site';
import { cn, formatDate } from '@/lib/utils';
import styles from './styles.module.scss';

export const DatasetResources = ({
  id,
  fileName,
  description,
  modified,
  tag,
}: {
  id: string;
  fileName: string;
  description: string;
  modified: string;
  tag: string;
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex h-[110px] flex-col gap-1 p-2 ">
      <div className="flex flex-row items-start justify-between gap-5 self-stretch pl-2">
        <div className="flex w-[356px] flex-col gap-1">
          <div className="flex gap-3">
            <Text fontWeight="semibold" variant="headingMd">
              {fileName}
            </Text>
            <Tag>{tag}</Tag>
          </div>

          <Text variant="headingXs" fontWeight="medium">
            Updated : {formatDate(modified)}
          </Text>
        </div>

        <Button className="w-[136px] bg-[#71E57D] text-baseGraySlateSolid12 shadow-insetButton ">
          <Link href={`${backendUrl.datasets}/download/${parseInt(id)}/`}>
            Download
          </Link>
        </Button>
      </div>
      <div className="gap-2 pl-2">
        <Text
          className={cn(styles[`line-clamp-${showMore ? 'none' : '1'}`])}
          variant="headingXs"
          fontWeight="medium"
          color="default"
        >
          {showMore ? description : `${description.substring(0, 40)}`}
        </Text>

        <Button
          className="w-[120px]"
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
