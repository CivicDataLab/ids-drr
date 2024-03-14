import Image from 'next/image';
import Link from 'next/link';
import { ShareDB } from '@/public/ShareDB';
import { SourceWebsite } from '@/public/sourceWebsite';
import { IconButton, Text } from 'opub-ui';

import { DatasetSource, DatasetsURL } from '@/config/consts';
import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import styles from './styles.module.scss';

export const DatasetInfoCard = ({
  title,
  description,
  source,
  homepage,
  logo,
}: {
  title: string;
  description: string;
  source: string;
  homepage: string;
  logo: string;
}) => {
  return (
    <div
      id="dataset-info"
      className="flex items-center gap-0 self-stretch bg-surfaceDefault p-0 shadow-basicSm"
    >
      <div className="pb-36 pl-5 pt-4">
        <Link href={DatasetsURL} className={cn(styles.dataSetLink)}>
          <IconButton color="subdued" icon={Icons.left} size="large">
            Left
          </IconButton>
        </Link>
      </div>
      <div className="shadow-card flex grow border-r-1 border-solid border-borderDisabled py-6 pl-5 pr-14">
        <div className="flex grow flex-col gap-2">
          <Text variant="headingLg" fontWeight="semibold">
            {title}
          </Text>
          <Text
            variant="headingMd"
            fontWeight="medium"
            className="text-textSubdued"
          >
            {DatasetSource} : {source}
          </Text>

          <Text className="mb-3 mt-3" variant="bodyMd" fontWeight="regular">
            {description}
          </Text>
          <div className="flex items-center gap-6">
            <Link href={homepage} className={cn(styles.dataSetLink)}>
              <div className="flex items-center gap-1">
                <Text color="interactive" variant="bodyMd">
                  Visit source website
                </Text>
                <SourceWebsite />
              </div>
            </Link>

            <Link href={homepage} className={cn(styles.dataSetLink)}>
              <div className="flex items-center gap-1">
                <Text color="interactive" variant="bodyMd">
                  Go to Github Repo
                </Text>
                <SourceWebsite />
              </div>
            </Link>

            <Link href={homepage} className={cn(styles.dataSetLink)}>
              <div className="flex items-center gap-1">
                <Text color="interactive" variant="bodyMd">
                  Share Dataset
                </Text>
                <ShareDB />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
