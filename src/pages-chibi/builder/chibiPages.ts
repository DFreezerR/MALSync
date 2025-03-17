import { $c } from '../../chibiScript/ChibiGenerator';
import { PageInterfaceCompiled } from '../pageInterface';
import { pages } from '../pages';
import { getVersionHashes } from './chibiHelper';

function compilePage(page: PageInterfaceCompiled): PageInterfaceCompiled {
  page.sync.isSyncPage = page.sync.isSyncPage($c) as any;
  page.sync.getTitle = page.sync.getTitle($c) as any;
  page.sync.getIdentifier = page.sync.getIdentifier($c) as any;
  page.sync.getOverviewUrl = page.sync.getOverviewUrl($c) as any;
  page.sync.getEpisode = page.sync.getEpisode($c) as any;
  if (page.sync.getVolume) {
    page.sync.getVolume = page.sync.getVolume($c) as any;
  }
  if (page.sync.nextEpUrl) {
    page.sync.nextEpUrl = page.sync.nextEpUrl($c) as any;
  }
  if (page.sync.uiInjection) {
    page.sync.uiInjection = page.sync.uiInjection($c) as any;
  }
  if (page.sync.getMalUrl) {
    page.sync.getMalUrl = page.sync.getMalUrl($c) as any;
  }

  return page;
}

export default (): { [key: string]: PageInterfaceCompiled } => {
  const definitions: { [key: string]: PageInterfaceCompiled } = {};
  const hashes = getVersionHashes();

  Object.keys(pages).forEach(key => {
    const pageObj = pages[key] as PageInterfaceCompiled;
    pageObj.version = hashes[key];
    definitions[key] = compilePage(pageObj);
  });

  return definitions;
};
