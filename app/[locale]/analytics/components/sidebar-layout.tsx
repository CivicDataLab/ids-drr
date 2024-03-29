'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Exposure,
  FloodHazard,
  GovtResponse,
  RiskScore,
  Vulnerability,
} from '@/public/FactorIcons';
import { InfoSquare } from '@/public/InfoCircle';
import { useQuery } from '@tanstack/react-query';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Divider,
  ProgressBar,
  ShareDialog,
  Text,
  useScreenshot,
} from 'opub-ui';
import { useMediaQuery } from 'usehooks-ts';

import { RiskColorMap } from '@/config/consts';
import { ANALYTICS_TIME_TRENDS } from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { navigateEnd } from '@/lib/navigation';
import { cn, deSlugify, formatDateString } from '@/lib/utils';
import { DownloadReport } from './download-report';
import { RevenueCircle, ScoreInfo } from './revenue-circle-accordion';
import styles from './styles.module.scss';
import { TimeTrends } from './time-trends';
import { useWindowSize } from '@/hooks/use-window-size';

export function SidebarLayout({ data, indicator, boundary }: any) {
  const searchParams = useSearchParams();
  const indicatorIcon = searchParams.get('indicator') || 'risk-score';
  const timePeriod = searchParams.get('time-period') || '2023_08';
  const formattedTimePeriod = formatDateString(timePeriod);
  const color = '#000000';
  const region = searchParams.get('region') || '1';

  const DEFAULT_PERIOD = '3M';

  const { width,height } = useWindowSize();

  const items = [
    {
      value: '3M',
      label: 'Past 3 months',
    },
    {
      value: '1Y',
      label: 'Past 1 year',
    },
    {
      value: 'ALL',
      label: 'All Data',
    },
  ];

  const [period, setPeriod] = React.useState(items[0].value || DEFAULT_PERIOD);

  const chartData = useQuery(
    [`chartData_${boundary}_${indicator}_${timePeriod}_${region}_${period}`],
    () =>
      GraphQL('analytics', ANALYTICS_TIME_TRENDS, {
        indcFilter: { slug: indicatorIcon },
        dataFilter: { dataPeriod: timePeriod, period: period },
        geoFilter: { code: region?.split(',') },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const IconMap: { [key: string]: React.ReactNode } = {
    'risk-score': <RiskScore color={color} />,
    vulnerability: <Vulnerability color={color} />,
    'flood-hazard': <FloodHazard color={color} />,
    exposure: <Exposure color={color} />,
    'government-response': <GovtResponse color={color} />,
  };

  const districtData = data.filter((item: any) =>
    Object.hasOwnProperty.call(item, 'district')
  );
  // To filter out revenue circles from the district data boundary
  const revenueCircleData = data.filter((item: any) =>
    Object.hasOwnProperty.call(item, 'revenue circle')
  );

  const GeographyMap: { [key: string]: string } = {
    district: 'District',
    'revenue-circle': 'Revenue Circle',
  };

  const DataBasedOnBoundary = boundary === 'district' ? districtData : data;
  const RegionName =
    boundary === 'district'
      ? districtData[0]?.district
      : data[0]?.['revenue-circle'];

  const title = 'IDS DRR';
  const [svgURL, setSvgURL] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { createSvg, svgToPngURL, downloadFile, domToUrl } = useScreenshot();

  async function generateImage() {
    setIsLoading(true);

    const ele = window.document.querySelector('.opub-Tooltip ')

    const dataImgURL = await domToUrl(ele as HTMLElement , {
      width: width,
      height: height,
      backgroundColor: 'white',
    });

    const svg = await createSvg(<Template data={dataImgURL} title={title} />, {
      width: width
    });
    const dataURL = await svgToPngURL(svg);

    setSvgURL(dataURL);
    setIsLoading(false);
  }

  return (
    <aside
      className={cn(
        'p-4',
        'bg-surfaceDefault shadow-basicMd',
        'shadow-inset z-1 hidden min-w-[500px] shrink-0 md:block',
        'overflow-y-auto border-r-1 border-solid border-borderSubdued'
      )}
    >
      <header className="mb-5 mt-4 flex items-center justify-between">
        <Text
          variant="heading2xl"
          fontWeight="regular"
          className="flex items-center gap-2"
        >
          {IconMap[indicatorIcon || 'risk-score']}
          {deSlugify(indicatorIcon)}
        </Text>
        <DownloadReport />
      </header>
      <Divider className="mt-2" />
      {(data.length === 1 || districtData.length === 1) && (
        <div className=" mb-2 mt-5 flex flex-col">
          <Text variant="heading2xl" fontWeight="regular">
            {RegionName} {GeographyMap[boundary]}
          </Text>
        </div>
      )}
      <div className="flex items-center justify-between self-stretch">
        <div className="mt-4 flex items-center gap-4">
          <Text variant="bodyMd" color="subdued" fontWeight="regular">
            Cumulative till {formattedTimePeriod}
          </Text>
          <InfoSquare color="#6A6A6A" />
        </div>
      </div>

      <section className="mt-4">
        {DataBasedOnBoundary.map((data: any, index: any) => (
          <div key={index} className="mb-4">
            <Text variant="headingXl" fontWeight="regular">
              {data[boundary]}
            </Text>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <div className=" mr-3 basis-2/4">
                  <ProgressBar
                    size="small"
                    customColor={RiskColorMap[parseInt(data[indicator])]}
                    value={(parseInt(data[indicator]) / 5) * 100}
                  />
                </div>
                <Text variant="heading2xl">{parseInt(data?.[indicator])}</Text>
                /5
              </div>
              <OtherFactorScores
                data={data}
                boundary={boundary}
                indicator={indicator}
              />
            </div>
          </div>
        ))}
      </section>
      <Accordion type="single" defaultValue="time-trends" collapsible>
        <AccordionItem value="revenue-circle" className="mt-4">
          {districtData.length === 1 && (
            <div className="mt-7">
              <div className={styles.SidebarAccordionTitle}>
                <Text variant="bodyLg" fontWeight="bold">
                  REVENUE CIRCLE SCORE
                </Text>
                <AccordionTrigger />
              </div>
              <AccordionContent
                className={cn(styles.RevenueBox, 'px-2 pb-4 md:px-4 ')}
              >
                <RevenueCircle
                  revenueCircleData={revenueCircleData}
                  indicator={indicator}
                />
              </AccordionContent>
            </div>
          )}
        </AccordionItem>
        <AccordionItem value="time-trends" className="mt-4">
          <div className="mt-5">
            <div className={styles.SidebarAccordionTitle}>
              <Text variant="bodyLg" fontWeight="bold">
                TIME TRENDS
              </Text>
              <AccordionTrigger />
            </div>

            <AccordionContent
              className={cn(styles.TrendsBox, 'px-2 pb-4 md:px-4 ')}
            >
              <div className="mt-4 flex items-center gap-2">
                {items.map(({ label, value: itemValue }) => {
                  const isActiveValue = itemValue === period;
                  return (
                    <button
                      key={itemValue}
                      type="button"
                      className={cn(
                        styles.TabItem,
                        isActiveValue && styles.TabItemActive
                      )}
                      onClick={() => {
                        setPeriod(itemValue);
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {chartData.isFetched ? (
                <TimeTrends
                  chartData={chartData?.data?.getTimeTrends}
                  indicator={indicatorIcon}
                  boundary={boundary}
                />
              ) : null}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export function OtherFactorScores({ data, boundary, indicator }: any) {
  const clonedData = structuredClone(data);
  delete clonedData[boundary];
  delete clonedData[`${boundary}-code`];
  delete clonedData[indicator];

  const FactorVariables = Object.keys(clonedData);

  return FactorVariables.map((scoreType) => (
    <div key={scoreType} className="ml-3">
      <ScoreInfo
        indicator={indicator}
        label={`${deSlugify(scoreType)}`}
        value={data?.[scoreType]}
      />
    </div>
  ));
}

const Template = ({
  data,
  title,
  props,
}: {
  data: string | null;
  title: string;
  props?: {
    height: number;
    width: number;
  };
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        {title}
      </p>
      {data ? (
        <img src={data} {...props} className="w-full" alt="SVG" />
      ) : (
        'Loading...'
      )}
    </div>
  );
};