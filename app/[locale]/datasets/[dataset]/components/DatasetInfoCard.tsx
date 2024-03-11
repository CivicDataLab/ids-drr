import Image from 'next/image';
import Link from 'next/link';
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
      <div className="shadow-card flex grow border-r-1 border-solid border-borderDisabled py-6 pl-5 pr-8">
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
              <Text>Visit source website</Text>
              <IconButton color="interactive" size="slim" icon={Icons.link}>
                Share
              </IconButton>
            </Link>
            <Link href={homepage} className={cn(styles.dataSetLink)}>
              Share dataset
              <IconButton
                className="absolute top-3 flex flex-col items-center justify-center"
                color="interactive"
                size="slim"
                icon={Icons.databaseShare}
              >
                Share
              </IconButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-surface shadow-card flex shrink-0 basis-[350px] place-content-center place-items-center rounded-1 p-3">
        <Image
          className="object-contain"
          alt="dataset-icon"
          height={'55'}
          width="211"
          src={logo}
        />
      </div>
    </div>
  );
};
