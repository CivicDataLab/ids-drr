import React from 'react';
import Link from 'next/link';
import { Button, Tag, Text } from 'opub-ui';

import { DatasetSource, LastUpdated, UpdateFreq } from '@/config/consts';
import { formatDate } from '@/lib/utils';

export interface DataProps {
  keyIndex: number;
  title: string;
  source: string;
  description: string;
  lastUpdated: string;
  updateFrequency: string;
  period: string[];
  fileTypes: string[];
  tags: string[];
  slug: string;
  datasetDownloadLink: string;
}
export const DatasetCard = ({
  keyIndex,
  title,
  source,
  description,
  lastUpdated,
  updateFrequency,
  fileTypes,
  period,
  tags,
  slug,
  datasetDownloadLink,
}: DataProps) => {
  // console.log('Period[0]', formatDate(lastUpdated));

  return (
    <div
      key={keyIndex}
      className=" flex flex-col gap-4 rounded-1 bg-surfaceDefault p-6 shadow-elementCard "
    >
      <div
        id="leftContainer"
        className="flex-2 text-interactive flex flex-col items-stretch gap-2 truncate"
      >
        <div className="flex items-start gap-6 ">
          <div className="flex w-[324px] flex-shrink-0 flex-col flex-wrap items-start gap-3 p-0">
            <Link href={`/datasets/${slug}`}>
              <Text
                // color="inherit"
                className=" text-textSubdued "
                variant="headingLg"
                fontWeight="semibold"
                truncate
              >
                {title}
              </Text>
            </Link>
            <Text
              color="default"
              className=" text-textDefault "
              variant="headingSm"
              fontWeight="medium"
            >
              {DatasetSource} : {source}
            </Text>
            <span className="flex flex-col items-start gap-1">
              <Text
                color="default"
                className="  text-textSubdued  "
                variant="bodySm"
                fontWeight="regular"
              >
                {LastUpdated} : {formatDate(lastUpdated)} | {UpdateFreq} :{' '}
                {updateFrequency}
              </Text>
              <Text
                color="default"
                className="  text-textSubdued  "
                variant="bodySm"
                fontWeight="regular"
              >
                Reference Period : {formatDate(period[0])} to{' '}
                {formatDate(period[1])}
              </Text>
            </span>

            <span className="flex items-center gap-4 py-1 pr-2">
              {fileTypes?.length > 0 &&
                fileTypes?.slice(0, 3).map((fileType, index) => (
                  <Tag key={index} background-color="#E1F0FF">
                    {fileType}
                  </Tag>
                ))}
            </span>
          </div>

          <div className="flex h-[100%] w-[100%] flex-1 flex-col items-start gap-8 p-0  ">
            <Text
              variant="bodyMd"
              fontWeight="regular"
              className=" self-stretch whitespace-normal"
              color="default"
            >
              {description}
            </Text>
            <span className="flex items-center gap-4 py-1 pr-2">
              {tags?.length > 0 &&
                tags?.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
