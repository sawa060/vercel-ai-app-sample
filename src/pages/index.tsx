import {Inter} from 'next/font/google';
import {Top} from 'src/components/home';

import {NoSSR} from 'src/libs/no_ssr';

export default function Home() {
  return (
    <NoSSR>
      <Top />
    </NoSSR>
  );
}
