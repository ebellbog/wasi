import {BOROUGHS} from './enums';

const cboData = [{
    name: 'Lutheran Social Services of New York',
    address: '475 Riverside Drive Suite #1244, New York, NY 10115',
    borough: null,
    phone: '(212) 870-1100',
    website: 'http://lssny.org/',
    languages: ['English', 'Farsi', 'French', 'Portuguese', 'Spanish'],
    description: 'Provides services in early childhood, family, healthy homes, nutrition and food assistance, housing assistance, immigration and legal assistance, disaster response, and education.'
}, {
    name: 'Latin Women in Action',
    address: '103-06 39 Ave., Corona, NY 11368',
    borough: BOROUGHS.queens,
    phone: '(718) 478-2972',
    website: 'http://www.latinwomeninaction.com/',
    languages: ['Chinese', 'English', 'Portuguese', 'Spanish'],
    description: 'Seeks to empower Latina women and their families through domestic violence and child abuse prevention, political empowerment, civic engagement, and direct services in immigration, health, employment, counseling, and others.',
}];

export {cboData};