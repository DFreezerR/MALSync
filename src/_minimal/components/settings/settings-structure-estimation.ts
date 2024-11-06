import { ConfObj } from '../../../_provider/definitions';
import { getDurationFromLocale } from '../../../utils/time';
import SettingsGeneral from './settings-general.vue';
import SettingsProgressDropdown from './settings-progress-dropdown.vue';

function startProgressSync() {
  if (api.type === 'webextension') {
    const inter = parseInt(api.settings.get('progressInterval'));
    if (!inter) return;
    con.log('Trigger Progress update');
    chrome.alarms.create('progressSync', {
      periodInMinutes: inter,
      when: Date.now() + 1000,
    });
  }
}

export const notificationsSection: ConfObj[] = [
  {
    key: 'progressNotificationsAnime',
    title: () => `${api.storage.lang('settings_Notifications')} (${api.storage.lang('Anime')})`,
    condition: () => Boolean(Number(api.settings.get('progressInterval'))),
    props: {
      component: 'checkbox',
      option: 'progressNotificationsAnime',
    },
    component: SettingsGeneral,
  },
  {
    key: 'progressNotificationsManga',
    title: () => `${api.storage.lang('settings_Notifications')} (${api.storage.lang('Manga')})`,
    condition: () => Boolean(Number(api.settings.get('progressInterval'))),
    props: {
      component: 'checkbox',
      option: 'progressNotificationsManga',
    },
    component: SettingsGeneral,
  },
  {
    key: 'notificationsSticky',
    title: () => api.storage.lang('settings_Notifications_Sticky'),
    props: {
      component: 'checkbox',
      option: 'notificationsSticky',
    },
    component: SettingsGeneral,
  },
];

export const estimation: ConfObj[] = [
  {
    key: 'progressInterval',
    title: () => api.storage.lang('settings_Interval'),
    change: () => startProgressSync(),
    props: () => {
      const locale = api.storage.lang('locale');
      return {
        component: 'dropdown',
        option: 'progressInterval',
        props: {
          options: [
            { title: api.storage.lang('settings_Interval_Off'), value: '0' },
            {
              title: `${getDurationFromLocale(locale, { minutes: 30 }, 'long')}`,
              value: '30',
            },
            { title: `${getDurationFromLocale(locale, { hours: 1 }, 'long')}`, value: '60' },
            {
              title: `${getDurationFromLocale(locale, { hours: 2 }, 'long')}`,
              value: '120',
            },
            {
              title: `${getDurationFromLocale(locale, { hours: 4 }, 'long')}`,
              value: '240',
            },
            {
              title: `${getDurationFromLocale(locale, { hours: 12 }, 'long')}`,
              value: '720',
            },
            {
              title: `${getDurationFromLocale(locale, { hours: 24 }, 'long')}`,
              value: '1440',
            },
          ],
        },
      };
    },
    component: SettingsGeneral,
  },
  {
    key: 'progressIntervalDefaultAnime',
    title: () => api.storage.lang('settings_Interval_Default_Anime'),
    change: () => startProgressSync(),
    condition: () => Boolean(Number(api.settings.get('progressInterval'))),
    props: {
      component: 'dropdown',
      option: 'progressIntervalDefaultAnime',
      type: 'anime',
    },
    component: SettingsProgressDropdown,
  },
  {
    key: 'progressIntervalDefaultManga',
    title: () => api.storage.lang('settings_Interval_Default_Manga'),
    change: () => startProgressSync(),
    condition: () => Boolean(Number(api.settings.get('progressInterval'))),
    props: {
      component: 'dropdown',
      option: 'progressIntervalDefaultManga',
      type: 'manga',
    },
    component: SettingsProgressDropdown,
  },
  ...notificationsSection,
  {
    key: 'loadPTWForProgress',
    title: () => api.storage.lang('settings_loadPTWForProgress'),
    condition: () => Boolean(Number(api.settings.get('progressInterval'))),
    props: {
      component: 'checkbox',
      option: 'loadPTWForProgress',
    },
    component: SettingsGeneral,
  },
];
