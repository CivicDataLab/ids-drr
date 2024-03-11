'use client';

import { FilterProps } from '@/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Checkbox, Icon, Text } from 'opub-ui';

import { Icons } from '@/components/icons';
import styles from './Filter.module.scss';

export const FilterBox = ({ filters }: { filters: FilterProps[] }) => (
  <div className="flex flex-col gap-4">
    <Text className="text-[#8B8D98] " variant="bodyMd" fontWeight="medium">
      FILTERS
    </Text>
    {filters.slice(1).map((item, index) => (
      <div key={index}>
        {Object.entries(item).map(
          ([key, value], keyIndex) =>
            key !== 'duration' && (
              <Collapsible
                key={`${key}-${keyIndex}`}
                defaultOpen
                className="rounded-1 border-1 border-solid border-borderSubdued"
              >
                <div className=" bg-surfaceNeutral border-t-0 min-w-max max-w-full rounded-1 border-1 border-solid border-borderSubdued bg-[#96E79E]">
                  <CollapsibleTrigger className={styles.CollapseTrigger}>
                    <Text
                      className="capitalize text-[#1C2024]"
                      key={key}
                      variant="headingMd"
                      as="h3"
                    >
                      {key}
                    </Text>
                    <Icon source={Icons.down} />
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="min-w-max max-w-full px-2 pb-4">
                  <div className="mt-4 flex flex-col gap-3">
                    {value.map((itemValue, itemIndex) => (
                      <Checkbox
                        key={itemIndex}
                        name={itemValue}
                        onChange={() => {}}
                      >
                        {itemValue}
                      </Checkbox>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
        )}
      </div>
    ))}
  </div>
);
