'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FilterProps } from '@/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Checkbox, Icon, Text } from 'opub-ui';

import { Icons } from '@/components/icons';
import styles from './Filter.module.scss';

export const FilterBox = ({
  filters,
  selectedFilters,
}: {
  filters: FilterProps[];
  selectedFilters: any;
}) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = React.useState<{
    [key: string]: string[];
  }>({});

  const generateURL = (key: string, filtersSelected: string[]) => {
    const params = new URLSearchParams(window.location.search);

    const existingKey = params?.has(key);

    if (existingKey) {
      // If the key already exists, append the new filters to it with a comma
      params.set(key, `${filtersSelected.join(',')}`);
    } else {
      // If the key doesn't exist, set the filtersSelected directly under that key
      params.set(key, filtersSelected.join(','));
    }

    const updatedQueryString = params.toString();

    return router.push(`/datasets/?${updatedQueryString}`);
  };

  const checkIfPresent = (filterGroup: string, filterValue: string) => {
    return selectedFilters.some((item: { [x: string]: string | string[] }) => {
      if (Object.prototype.hasOwnProperty.call(item, filterGroup)) {
        return item[filterGroup][0].split(',').includes(filterValue);
      }
      return false;
    });
  };

  return (
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
                          checked={
                            checkIfPresent(key, itemValue) ? true : false
                          }
                          onChange={(changed) => {
                            setSelectedFilter((prevSelectedFilter) => {
                              let updatedArray;
                              if (!changed) {
                                updatedArray = (
                                  prevSelectedFilter[key] || []
                                ).filter((value) => value !== itemValue);
                              } else {
                                updatedArray = [
                                  ...(prevSelectedFilter[key] || []),
                                  itemValue,
                                ];
                              }
                              const updatedFilter = {
                                ...prevSelectedFilter,
                                [key]: updatedArray,
                              };
                              generateURL(key, updatedFilter[key]);
                              return updatedFilter;
                            });
                          }}
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
};
