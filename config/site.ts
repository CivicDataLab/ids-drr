import { MainConfig, SiteConfig } from 'types';
import { AboutUsURL, AnalyticsURL, DatasetsURL } from './consts';

export const siteConfig: SiteConfig = {
  name: 'IDS-DRR',
  description:
    'Intelligent Data Solution for Disaster Risk Reduction (IDS-DRR) is an open-source platform that helps state-level and district-level Disaster Management Authorities to make timely data-driven decisions, prioritise expenditure of public funds and conduct public procurement in a manner that strengthens long-term disaster risk reduction and protects the most vulnerable people from the adverse effects of extreme weather events and climate change. ',
  url: 'https://drr.open-contracting.in/en',
};

export const ckan = {
  homepage:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/1a367191-4c7f-469c-970e-98792988c183/download/dist_data.json',
  department:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/90720dad-7c29-41a4-8780-11121ef31213/download/dept.json',
  overview:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/98bc0fed-3e74-40bd-b6fd-07d1fc4d9494/download/schm_narrative.json',
  indicators:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/6a28cb75-b400-4f52-adb1-0f219338ed03/download/indicators_data.json',
  chart:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/d81d295b-51a8-44f7-b150-77a114b14d57/download/scheme_explorer_data.json',
  table:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/55fa07ae-7147-445e-8eb6-7a76c4f7f2cb/download/scheme_explorer_table_data.json',
  rawTable:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/44c8e98d-7fee-4a0d-909d-4a8999ea017f/download/scheme_explorer_table_data_without_format.json',
};

export const mapPosition: {
  [key: string]: [string, string];
} = {
  morigaon: ['80%', '80%'],
};

export const locales = ['en', 'hi'];

export const gqlConfig: {
  [key: string]: string;
} = {
  datasets: 'https://opub-backend.civicdatalab.in/graphql',
  analytics: 'https://drr.backend.open-contracting.in/graphql',
};

export const backendUrl = {
  datasets: 'https://opub-backend.civicdatalab.in',
};

export const elasticSearchParams = {
  default: 'facets/?from=0&size=10&sort=desc&sort_by=relevance',
};

export const navbarConfig = {
  homeUrl: '/',
  links: [
    {
      label: 'Explore Departments',
      href: '/',
      icon: 'department',
    },
    {
      label: 'Explore Schemes',
      href: '/#',
      icon: 'scheme',
    },
  ],
};

export const mainConfig: MainConfig = {
  homeUrl: '/',
  mainNav: [
    {
      title: 'Analytics',
      href: AnalyticsURL,
    },
    {
      title: 'Datasets',
      href: DatasetsURL,
    },
    {
      title: 'Resources',
      href: '/',
    },
    {
      title: 'About us',
      href: AboutUsURL,
    },
  ],

  sidebarNav: [
    {
      title: 'Panchayat & Rural Development',
      href: '/panchayat-and-rural-development',
    },
    {
      title: 'Public Health Engineering',
      href: '/public-health-engineering',
    },
  ],
};
