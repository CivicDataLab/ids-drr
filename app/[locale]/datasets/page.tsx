import { Datasets, FilterProps } from '@/types';

import { backendUrl, elasticSearchParams } from '@/config/site';
import { getData } from '@/lib/api';
import { Content } from './components/dataset-layout';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const params = new URLSearchParams(searchParams);
  // Check if the params contain 'search'
  if (params.has('search')) {
    // Replace 'search' with 'q' as the elastic search needs the param to be it
    const searchValue = params.get('search') || '';
    params.set('q', searchValue);
    params.delete('search');
  }

  const urlToFetch = params
    ? `${backendUrl.datasets}/${elasticSearchParams.default}&${decodeURIComponent(params.toString())}`
    : `${backendUrl.datasets}/${elasticSearchParams.default}`;

  const datasetData = await getData(urlToFetch);

  const filters: FilterProps[] = Object.keys(datasetData?.aggregations).map(
    (key) => ({
      [key]: datasetData?.aggregations[key]?.all?.buckets.map(
        (bucket: { key: string }) => bucket.key
      ),
    })
  );

  const data: Datasets[] = datasetData?.hits?.hits?.map((item: any) => {
    return {
      title: item._source?.dataset_title,
      slug: item._source?.slug,
      source: item._source?.source,
      description: item._source?.dataset_description,
      categories: item._source?.category,
      organization: {
        logo: item?.org_logo || 'NA',
      },
      metaData: {
        lastUpdated: item._source?.modified || 'NA',
        updateFrequency: item._source?.update_frequency || 'NA',
        period: [item._source?.period_from, item._source?.period_to],
        fileTypes: item?._source?.format || '',
        tags: item._source?.tags,
        licenses: item._source?.license,
      },
    };
  });

  return (
    <Content
      count={datasetData?.hits?.total?.value}
      data={data}
      filters={filters}
      selectedFilters={datasetData?.selected_facets}
    />
  );
}
