import { FC, ReactNode } from 'react';

import { QueryClientProvider as Provider } from 'react-query';
import queryClient from './queryClient';

type Props = {
  children: ReactNode;
};

const QueryClientProvider: FC<Props> = ({ children }) => (
  <Provider client={queryClient}>
    {children}
  </Provider>
);

export default QueryClientProvider;
