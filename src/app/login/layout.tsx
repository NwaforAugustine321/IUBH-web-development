import { ReactNode } from 'react';

export default function PageLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
