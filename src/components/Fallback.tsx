import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const Fallback: React.FC<FallbackProps> = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
      <p className="text-center">SOMETHING WENT WRONG.</p>
    </div>
  );
};

export default Fallback;
