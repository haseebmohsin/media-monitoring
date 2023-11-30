import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'landing-component',
    title: 'Forbmax',
    translate: 'Forbmax',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'landing',
  },
  // {
  //   id: 'channels',
  //   title: 'Channels',
  //   translate: 'Channels',
  //   type: 'group',
  //   icon: 'heroicons-outline:star',
  //   children: [
  //     {
  //       id: 'channels.channel',
  //       title: 'Channel',
  //       type: 'collapse',
  //       icon: 'heroicons-outline:support',
  //       translate: 'Channels',
  //       children: [
  //         {
  //           id: 'geo-news',
  //           title: 'Geo News',
  //           type: 'item',
  //           url: 'channels/geo-news',
  //           end: true,
  //         },
  //         {
  //           id: 'ary-news',
  //           title: 'ARY News',
  //           type: 'item',
  //           url: 'channels/ary-news',
  //           end: true,
  //         },
  //         {
  //           id: 'dunya-news',
  //           title: 'Dunya News',
  //           type: 'item',
  //           url: 'channels/dunya-news',
  //           end: true,
  //         },
  //         {
  //           id: 'express-news',
  //           title: 'Express News',
  //           type: 'item',
  //           url: 'channels/express-news',
  //           end: true,
  //         },
  //         {
  //           id: 'samaa-news',
  //           title: 'Samaa News',
  //           type: 'item',
  //           url: 'channels/samaa-news',
  //           end: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 'apps',
    title: 'Applications',
    subtitle: 'Forbmax Trakk Applications',
    type: 'group',
    icon: 'heroicons-outline:cube',
    translate: 'APPLICATIONS',
    children: [
      {
        id: 'apps.tickers',
        title: 'Tickers',
        type: 'collapse',
        icon: 'heroicons-outline:support',
        translate: 'Tickers',
        children: [
          {
            id: 'tickers-dashboard',
            title: 'Dashboard',
            type: 'item',
            url: 'apps/tickers/dashboard',
            end: true,
          },
          {
            id: 'tickers-keywords-cloud',
            title: 'Keywords Cloud',
            type: 'item',
            url: 'apps/tickers/keywords-cloud',
            end: true,
          },
          {
            id: 'topic-modeling',
            title: 'Topic Modeling',
            type: 'item',
            url: 'apps/tickers/topic-modeling',
            end: true,
          },
        ],
      },
      {
        id: 'apps.face-trakk',
        title: 'Face Trakk',
        type: 'collapse',
        icon: 'heroicons-outline:support',
        children: [
          {
            id: 'face-trakk-dashboard',
            title: 'Dashboard',
            type: 'item',
            url: 'apps/face-trakk/dashboard',
            end: true,
          },
          {
            id: 'face-trakk-faces-cloud',
            title: 'Faces Cloud',
            type: 'item',
            url: 'apps/face-trakk/faces-cloud',
            end: true,
          },
          {
            id: 'face-trakk-training',
            title: 'Training',
            type: 'item',
            url: 'apps/face-trakk/training/clusters',
            end: true,
          },
          {
            id: 'face-trakk-upload',
            title: 'Upload',
            type: 'item',
            url: 'apps/face-trakk/upload',
            end: true,
          },
        ],
      },
      {
        id: 'apps.stt',
        title: 'STT',
        type: 'collapse',
        icon: 'heroicons-outline:support',
        children: [
          {
            id: 'stt-dashboard',
            title: 'Dashboard',
            type: 'item',
            url: 'apps/stt/dashboard',
            end: true,
          },
          {
            id: 'stt-keywords-cloud',
            title: 'Keywords Cloud',
            type: 'item',
            url: 'apps/stt/keywords-cloud',
            end: true,
          },
          {
            id: 'stt-topic-modeling',
            title: 'Topic Modeling',
            type: 'item',
            url: 'apps/stt/topic-modeling',
            end: true,
          },
          {
            id: 'stt-upload',
            title: 'Upload',
            type: 'item',
            url: 'apps/stt/upload',
            end: true,
          },
        ],
      },
      {
        id: 'apps.scraping',
        title: 'Social Media Scraping',
        type: 'collapse',
        icon: 'heroicons-outline:support',
        children: [
          {
            id: 'scraping-dashboard',
            title: 'Dashboard',
            type: 'item',
            url: 'apps/scraping/dashboard',
            end: true,
          },
        ],
      },
    ],
  },

  {
    id: 'reports',
    title: 'Reports',
    subtitle: 'Forbmax Reports',
    type: 'group',
    icon: 'heroicons-outline:cube',
    translate: 'Reports',
    children: [
      {
        id: 'reports',
        title: 'Reports',
        type: 'collapse',
        icon: 'heroicons-outline:support',
        translate: 'Reports',
        children: [
          {
            id: 'reports-headlines-reports',
            title: 'Headlines Reports',
            type: 'item',
            url: 'http://192.168.2.168:8081/actus/report.php',
            end: true,
          },
          {
            id: 'reports-media-coverage-reports',
            title: 'Media Coverage Reports',
            type: 'item',
            url: 'http://192.168.2.223/Headline/report.php',
            end: true,
          },
        ],
      },
    ],
  },

  {
    id: 'apps.adminPanel',
    auth: authRoles.admin,
    title: 'Admin Panel',
    subtitle: 'Admin Panel',
    type: 'group',
    icon: 'heroicons-outline:cube',
    translate: 'Admin',
    children: [
      {
        id: 'admin-panel-users',
        title: 'Admin Panel Users',
        type: 'collapse',
        icon: 'heroicons-outline:support',
        translate: 'Users',
        children: [
          {
            id: 'admin-panel-users',
            title: 'All Users',
            type: 'item',
            url: 'apps/admin-panel/users',
            end: true,
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
