import { PageInterface } from './pageInterface';

import { test } from './implementations/test/main';
import { mangaNato } from './implementations/mangaNato/main';
import { animeLib } from './implementations/animeLib/main';
import { mangaLib } from './implementations/mangaLib/main';
import { ranobeLib } from './implementations/ranobeLib/main';

export const pages: { [key: string]: PageInterface } = {
  test,
  mangaNato,
  animeLib,
  mangaLib,
  ranobeLib,
};
