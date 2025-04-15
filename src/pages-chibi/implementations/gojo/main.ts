import { PageInterface } from '../../pageInterface';

export const gojo: PageInterface = {
  name: 'Gojo',
  domain: ['https://gojo.wtf'],
  languages: ['English'],
  type: 'anime',
  urls: {
    match: ['*://gojo.wtf/*'],
  },
  search: 'https://gojo.wtf/search?query={searchtermPlus}',
  sync: {
    isSyncPage($c) {
      return $c.url().urlPart(3).equals('watch').run();
    },
    getTitle($c) {
      return $c.querySelector('.INFO a[href^="/anime/"] > span').text().trim().run();
    },
    getIdentifier($c) {
      return $c.url().urlPart(4).run();
    },
    getOverviewUrl($c) {
      return $c
        .string('/anime/<identifier>')
        .replace('<identifier>', $c.url().this('sync.getIdentifier').run())
        .urlAbsolute()
        .run();
    },
    getEpisode($c) {
      return $c.url().urlParam('ep').number().run();
    },
    nextEpUrl($c) {
      return $c
        .querySelector('.Episode > div > button.order-\\[-999999\\]')
        .ifThen($el => $el.this('list.elementUrl').return().run())
        .boolean(false)
        .run();
    },
    getMalUrl($c) {
      return $c
        .provider()
        .equals('ANILIST')
        .ifThen($el =>
          $el
            .string('https://anilist.co/anime/<identifier>')
            .replace('<identifier>', $c.url().this('sync.getIdentifier').run())
            .return()
            .run(),
        )
        .boolean(false)
        .run();
    },
  },
  overview: {
    isOverviewPage($c) {
      return $c.url().urlPart(3).equals('anime').run();
    },
    getTitle($c) {
      return $c.title().run();
    },
    getIdentifier($c) {
      return $c.url().urlPart(4).run();
    },
    uiInjection($c) {
      return $c.querySelector('#root > main div:has(> a[href^="/watch/"])').uiAfter().run();
    },
    getMalUrl($c) {
      return $c.provider().this('sync.getMalUrl').run();
    },
  },
  list: {
    elementsSelector($c) {
      return $c
        .querySelectorAll('.Episode > div > button')
        .filter($el => $el.elementMatches('.order-\\[-999999\\]').not().run())
        .run();
    },
    elementUrl($c) {
      return $c
        .string('/watch/<identifier>?ep=<ep>')
        .replace('<identifier>', $c.url().this('sync.getIdentifier').run())
        .replace('<ep>', $c.element().this('list.elementEp').run())
        .urlAbsolute()
        .run();
    },
    elementEp($c) {
      return $c.find('.smoothie').text().regex('\\d+', 0).number().run();
    },
  },
  lifecycle: {
    setup($c) {
      return $c
        .addStyle(require('!to-string-loader!css-loader!less-loader!./style.less').toString())
        .run();
    },
    ready($c) {
      return $c.detectURLChanges($c.trigger().run()).domReady().trigger().run();
    },
    syncIsReady($c) {
      return $c.waitUntilTrue($c.url().this('sync.getTitle').run()).trigger().run();
    },
    overviewIsReady($c) {
      return $c
        .waitUntilTrue(
          $c.querySelectorAll('#root > main a[href^="/watch/"]').length().boolean().run(),
        )
        .trigger()
        .run();
    },
  },
};
