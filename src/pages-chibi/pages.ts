import { PageInterface } from './pageInterface';

import { mangaNato } from './implementations/mangaNato/main';
import { animeLib } from './implementations/animeLib/main';
import { mangaLib } from './implementations/mangaLib/main';
import { ranobeLib } from './implementations/ranobeLib/main';

export const pages: { [key: string]: PageInterface } = {
  mangaNato,
  animeLib,
  mangaLib,
  ranobeLib,
};
