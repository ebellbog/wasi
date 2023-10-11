import './index.less';
import {cboData} from '../data/cbos';
import CboTemplate from './templates/cboTemplate.handlebars';

$(document).ready(() => {
    setTimeout(initTranslation, 100);

    $('.filter-btn').on('click', ({currentTarget}) => {
        const filterType = $(currentTarget).data('filter');
        console.log(filterType);
    });

    $('#cbo-content').html(
        cboData.map((data) => CboTemplate(data)).join('')
    );
});

function initTranslation() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en', includedLanguages: 'en,es,qu', layout: google.translate.TranslateElement.InlineLayout.SIMPLE},
        'translate-btn'
    );
}