import './index.less';
import {cboData} from '../data/cbos';
import CboTemplate from './templates/cboTemplate.handlebars';

import '../img/wasi_logo.png';

$(document).ready(() => {
    setTimeout(initTranslation, 100);

    $('.filter-btn').on('click', ({currentTarget}) => {
        const filterType = $(currentTarget).data('filter');
        console.log(filterType);
    });

    $('#cbo-content').html(
        cboData.map((data) => {
            data.address = data.address.split(',').join('<br>');
            return CboTemplate(data);
        }).join('')
    );
});

function initTranslation() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en', includedLanguages: 'en,es,qu', layout: google.translate.TranslateElement.InlineLayout.SIMPLE},
        'translate-btn'
    );
}