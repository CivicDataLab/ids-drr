import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ProgressBar,
  Text,
  Tooltip,
} from 'opub-ui';

import { RiskColorMap } from '@/config/consts';
import { cn, deSlugify } from '@/lib/utils';

interface RevenueProps {
  revenueCircleData: any;
  indicator: string;
}

export const RevenueCircle = ({
  revenueCircleData,
  indicator,
}: RevenueProps) => {
  const clonedRevenueCircleData = structuredClone(revenueCircleData[0]);
  delete clonedRevenueCircleData['revenue circle'];
  delete clonedRevenueCircleData['revenue-circle-code'];
  delete clonedRevenueCircleData[indicator];

  const FactorVariables = Object.keys(clonedRevenueCircleData);

  return (
    <Accordion type="single" collapsible>
      {revenueCircleData.map((item: any, index: number) => (
        <AccordionItem
          key={`revenue-circle-${index}`}
          value={`revenue-circle-${index}`}
          className="border-none"
        >
          <div className="flex items-center gap-3">
            <Text
              variant="headingMd"
              fontWeight="regular"
              className=" basis-4/6"
            >
              {item?.['revenue circle']}
            </Text>
            <ProgressBar
              size="small"
              customColor={RiskColorMap[item?.[indicator]]}
              value={(item?.[indicator] / 5) * 100}
            />
            <Tooltip
              content={
                <div className="flex flex-col px-2 py-1">
                  <Text variant="headingXl">{item?.[indicator]} / 5 </Text>
                  <Text>HIGH RISK</Text>
                </div>
              }
            >
              <AccordionTrigger />
            </Tooltip>
          </div>

          <AccordionContent className="px-3 pb-4 md:px-6">
            {FactorVariables.map(
              (scoreType) =>
                item?.[scoreType] !== undefined && (
                  <ScoreInfo
                    key={scoreType}
                    indicator={indicator}
                    label={`${deSlugify(scoreType)} Score`}
                    value={item?.[scoreType]}
                  />
                )
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

interface ScoreProps {
  label: string;
  value: string;
  indicator: string;
}

export const ScoreInfo = ({ label, value, indicator }: ScoreProps) => (
  <div className="mt-2">
    {label} :{' '}
    {indicator === 'risk-score' ? (
      <strong className="pl-2">{value}/5</strong>
    ) : (
      <strong className="pl-2">{parseFloat(value).toFixed(2)}</strong>
    )}
  </div>
);
