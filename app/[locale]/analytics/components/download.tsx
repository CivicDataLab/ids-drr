import React from 'react';
import { useWindowSize } from '@/hooks/use-window-size';
import { ShareDialog, useScreenshot } from 'opub-ui';
import { useMediaQuery } from 'usehooks-ts';
import { navigateEnd } from '@/lib/navigation';

export function Download() {
  const { width = 1024, height } = useWindowSize();

  const title = 'IDS DRR';
  const [svgURL, setSvgURL] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { createSvg, svgToPngURL, downloadFile, domToUrl } = useScreenshot();

  async function generateImage() {
    setIsLoading(true);

    const element = window.document.querySelector('.opub-Tooltip ');

    const dataImgURL = await domToUrl(element as HTMLElement, {
      width: width,
      height: height,
      backgroundColor: 'white',
    });

    const svg = await createSvg(<Template data={dataImgURL} title={title} />, {
      width: width,
    });
    const dataURL = await svgToPngURL(svg);

    setSvgURL(dataURL);
    setIsLoading(false);
  }

  return (
    <ShareDialog
      kind="secondary"
      size="medium"
      image={svgURL}
      loading={isLoading}
      alt="SVG"
      title="Report"
      props={{
        height: isDesktop ? 285 : 175,
      }}
      onOpen={generateImage}
      onDownload={() => downloadFile(svgURL, 'Chart', () => navigateEnd())}
    >
      Download Report
    </ShareDialog>
  );
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
