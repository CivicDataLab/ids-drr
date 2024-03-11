'use client';

import { useEffect } from 'react';
import { Box, Button, Text } from 'opub-ui';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-full w-full justify-center items-center gap-3">
      <Text variant="headingMd" as="h2">
        Something went wrong!
      </Text>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
