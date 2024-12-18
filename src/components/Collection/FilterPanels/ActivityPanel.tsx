'use client';
import { Bar, BarChart, CartesianGrid, LabelList, Line, XAxis, LineChart, YAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

import ChartWrapper from '@/components/Charts/ChartWrapper';
import { Container } from '@/components/Container';
import { SingleCollectionInscriptionsTable } from '@/components/Tables';
import { useFilter } from '@/lib/hooks/useFilter';
import { useInscriptionsByCollectionSlug } from '@/lib/services/fetchInscriptionsByCollectionSlug';
import { Divider } from '@/components/common';
import LoadingScreen from '@/components/common/LoadingScreen';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 }
];

const CHART_COLOR = 'var(--chart-1)';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: CHART_COLOR
  },
  mobile: {
    label: 'Mobile',
    color: CHART_COLOR
  },
  default: {
    label: 'Default',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig;

export const ActivityPanel = ({ slug }: { slug: string }) => {
  const { offset, limit } = useFilter();
  const { data, isPending, isPlaceholderData } = useInscriptionsByCollectionSlug(slug, {
    offset,
    limit
  });

  if (isPending) return <LoadingScreen />;

  return (
    <Container>
      <div className='flex w-full flex-row flex-wrap gap-8'>
        <ChartWrapper label='Volume / Avg Price' className='w-[48%]'>
          <ChartContainer config={chartConfig} className='min-h-[--inscription-default] w-full'>
            <BarChart accessibilityLayer data={chartData}>
              <ChartLegend
                content={
                  <ChartLegendContent
                    className='flex justify-end text-ob-grey-lighter'
                    children={<span className='text-ob-grey-lighter'>Volume / Avg Price</span>}
                  ></ChartLegendContent>
                }
                layout='horizontal'
                verticalAlign='top'
                align='right'
              />
              <Bar dataKey='desktop' radius={2} fill='var(--color-desktop)' />
              <Bar dataKey='mobile' radius={2} fill='var(--color-mobile)' />
            </BarChart>
          </ChartContainer>
        </ChartWrapper>

        <ChartWrapper label='Volume / Avg Price' className='w-[48%]'>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey='desktop' type='linear' stroke='var(--color-desktop)' strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </ChartWrapper>

        <ChartWrapper label='Volume / Avg Price' className='w-[48%]'>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey='desktop' type='step' stroke='var(--color-desktop)' strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </ChartWrapper>

        <ChartWrapper label='Volume / Avg Price' className='w-[48%]'>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout='vertical'
              margin={{
                right: 16
              }}
            >
              <CartesianGrid horizontal={false} vertical={false} />
              <YAxis
                dataKey='month'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey='desktop' type='number' hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
              <Bar
                dataKey='desktop'
                layout='vertical'
                fill='var(--color-desktop)'
                radius={100}
                barSize={24}
                background={{ fill: 'var(--color-default)', radius: 5 }}
              >
                <LabelList dataKey='month' position='insideLeft' offset={8} className='fill-[--color-label]' fontSize={10} />
                <LabelList dataKey='desktop' position='right' offset={8} className='text-white' fontSize={10} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ChartWrapper>
      </div>

      <Divider className='my-12' />

      {/* @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out. */}
      <SingleCollectionInscriptionsTable inscriptions={data} nextPageLoading={isPlaceholderData} />
    </Container>
  );
};
