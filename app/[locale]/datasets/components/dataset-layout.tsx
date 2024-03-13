'use client';

// import { graphql } from '@/gql';
import SearchSvg from '@/public/searchSvg';
import { Datasets, FilterProps } from '@/types';
import { IconButton, Select, Text, TextField } from 'opub-ui';

import { datasetsPageHeader } from '@/config/consts';
import { Icons } from '@/components/icons';
import { DatasetCard } from './DatasetCard';
import { FilterBox } from './FilterBox';

export function Content({
  count,
  data,
  filters,
  selectedFilters,
}: {
  count: number;
  data: Datasets[];
  filters: FilterProps[];
  selectedFilters: FilterProps[];
}) {
  return (
    <div className="container mb-6 grid gap-4">
      <div className="mt-6 pl-5">
        <Text variant="heading2xl">{datasetsPageHeader}</Text>
      </div>

      <div className=" container  ">
        {/* <div className=" mr-6 flex items-center justify-end gap-20 border-b-1 bg-[#96E79E] px-8 py-3 "> */}
        <div className="mr-6 flex flex-row items-center justify-end gap-6 border-b-1 bg-[#96E79E] px-8 py-3">
          <div className="flex w-1/5 justify-end">
            <Text
              className="shrink-0"
              variant="bodyLg"
              fontWeight="semibold"
              color="subdued"
            >
              Showing {count} datasets
            </Text>
          </div>

          <div className="flex w-4/5 flex-row items-stretch justify-between gap-8  ">
            <div className="flex h-[36px] w-[700px] items-center justify-start gap-2 pl-6">
              <div className="flex-1">
                <TextField
                  placeholder="Search by title, keyword, source, etc."
                  name="Search"
                  label="Search"
                  type="search"
                  labelHidden
                />
              </div>
              <div className="h-[35px] w-[36px] rounded-1 bg-[#F9F9FB] ">
                <SearchSvg />
              </div>
            </div>
            <div className="flex w-[290px] flex-row items-center justify-end  gap-2 ">
              <Text
                variant="headingMd"
                fontWeight="semibold"
                alignment="center"
                color="subdued"
              >
                SORT BY:
              </Text>
              <Select
                defaultValue="SORT BY :"
                className="w-[150px]"
                // className=" flex w-fit flex-row items-center justify-end gap-2 "
                label=""
                name="Sort-by"
                options={[
                  {
                    label: 'A-Z',
                    value: 'A-Z',
                  },
                  {
                    label: 'Recent',
                    value: 'Recent',
                  },
                ]}
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="container flex gap-10">
        <div className=" w-1/5 pt-6">
          <FilterBox filters={filters} selectedFilters={selectedFilters} />
        </div>
        <div className="rounded flex w-4/5 flex-col gap-4 border-solid p-6">
          {data.map((dataset, index) => (
            <DatasetCard
              key={index}
              keyIndex={index}
              title={dataset?.title || 'NA'}
              source={dataset?.source || 'NA'}
              description={dataset?.description || 'NA'}
              lastUpdated={dataset?.metaData?.lastUpdated || 'NA'}
              updateFrequency={dataset?.metaData?.updateFrequency || 'NA'}
              period={dataset?.metaData?.period}
              fileTypes={dataset?.metaData?.fileTypes}
              slug={dataset?.slug || 'NA'}
              categories={dataset?.categories}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
