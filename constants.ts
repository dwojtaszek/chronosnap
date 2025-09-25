import type { Continent, Era } from './types';

export const HISTORICAL_ERAS: Record<Continent, Omit<Era, 'continent'>[]> = {
  'North America': [
    { 
      key: 'victorianEra',
      englishName: 'Victorian Era (1890s)'
    },
    {
      key: 'roaringTwenties',
      englishName: 'Roaring Twenties'
    },
    {
      key: 'greatDepression',
      englishName: 'Great Depression (1930s)'
    },
    {
      key: 'theForties',
      englishName: 'The Forties (WWII Era)'
    },
    {
      key: 'swingingSixties',
      englishName: 'The Swinging Sixties'
    },
    {
      key: 'discoSeventies',
      englishName: 'Disco Seventies'
    },
    {
      key: 'neonEighties',
      englishName: 'The Neon Eighties'
    },
    {
      key: 'grungeNineties',
      englishName: 'Grunge Nineties'
    },
  ],
  'Europe': [
    {
      key: 'renaissance',
      englishName: 'Renaissance (1500s)'
    },
    {
      key: 'baroque',
      englishName: 'Baroque (1650s)'
    },
    {
      key: 'belleEpoque',
      englishName: 'Belle Époque (1900s)'
    },
    {
      key: 'postWarAvantGarde',
      englishName: 'Post-War Avant-Garde (1950s)'
    },
    {
      key: 'swingingLondon',
      englishName: 'Swinging London (1960s)'
    },
    {
      key: 'punkRock',
      englishName: 'Punk Rock (1970s)'
    }
  ],
  'Asia': [
    {
      key: 'edoPeriodJapan',
      englishName: 'Edo Period Japan (1700s)'
    },
    {
      key: 'qingDynastyChina',
      englishName: 'Qing Dynasty China (1850s)'
    },
    {
      key: 'mughalEmpireIndia',
      englishName: 'Mughal Empire India (1600s)'
    },
    {
      key: 'joseonDynastyKorea',
      englishName: 'Joseon Dynasty Korea (1880s)'
    },
    {
      key: 'shanghaiJazzAge',
      englishName: 'Shanghai Jazz Age (1930s)'
    },
    {
      key: 'hongKongCinema',
      englishName: 'Hong Kong Cinema (1980s)'
    }
  ],
};