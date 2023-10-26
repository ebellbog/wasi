import './index.less';
import '../img/wasi_logo.png';
import '../img/BRL_logo.png';

import CboTemplate from './templates/cboTemplate.handlebars';

import CboNyc from '../data/cbos_nyc';
import CboBrooklyn from '../data/cbos_brooklyn';
import CboQueens from '../data/cbos_queens';
import CboManhattan from '../data/cbos_manhattan';
import CboBronx from '../data/cbos_bronx';
import CboStaten from '../data/cbos_staten';

import 'jquery-ui';
import '@selectize/selectize';

const allCbos = [...CboNyc, ...CboBrooklyn, ...CboQueens, ...CboManhattan, ...CboBronx, ...CboStaten];
let activeCbos, filteredCbos;
activeCbos = filteredCbos = allCbos;

$(document).ready(() => {
    setTimeout(initTranslation, 100);

    $('.filter-btn').on('click', (e) => {
        const filterType = $(e.currentTarget).data('filter');
        showOrgs(filterType);
    });

    $('#logo-wrapper').on('click', () => {
        $('body').animate({scrollTop: 0}, 600, showFilters);
    });

    $(document).on('scroll', () => {
        const bodyScroll = $('body').scrollTop();

        $('#wasi-logo').css('width', Math.max(300 - bodyScroll * 1.1, 70));
        $('#wasi-name').css({
            opacity: Math.max(140 - bodyScroll, 0) / 140,
            height: Math.max(106 - bodyScroll * .3, 0),
        });
        $('#welcome-text').css({
            opacity: Math.max(440 - bodyScroll, 0) / 175,
        });
        $('#navbar').css('opacity', Math.min(1, (bodyScroll - 200) / 100));
    });
    setTimeout(() => $('body').scrollTop(0), 100);

    $('#clear-filter').on('click', () => {
        showFilters(() => {
            const maxScroll =  $('body')[0].scrollHeight;
            $('body').animate({scrollTop: maxScroll - 900}, 1000)
        });
    });
    $('#edit-filters').on('click', () => {
        $('body')
            .removeClass('show-info')
            .addClass('show-settings show-overlay');
    });

    $('#about-btn').on('click', () => {
        $('body')
            .removeClass('show-settings')
            .addClass('show-info show-overlay');
    });
    $('#overlay-wrapper').on('click', (e) => {
        const $target = $(e.target);
        const $parent = $target.closest('#settings-overlay');
        if (e.target.tagName === 'A' || $parent.length && e.target.tagName !== 'svg') return;
        $('body').removeClass('show-overlay');
    });
    $('select').on('change', () => {
        filteredCbos = activeCbos;

        $('#settings-overlay select').each(function() {
            const value = this.value;
            const type = $(this).data('type');
            filteredCbos = value ?
                filteredCbos.filter((cbo) => cbo[type]?.includes(value)) :
                filteredCbos;
        });

        updateOrgList();
    });
});

function initTranslation() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en', includedLanguages: 'en,es,qu', layout: google.translate.TranslateElement.InlineLayout.SIMPLE},
        'translate-btn'
    );
}

function showOrgs(filterType) {
    $('body').removeClass('show-body');
    setTimeout(() => {
        $('#filter-wrapper').hide();

        activeCbos = filteredCbos = allCbos.filter((data) => data.description.includes(filterType));

        updateOrgList();
        updateLanguageList();

        $('#cbo-wrapper').show();

        setTimeout(() => $('body').addClass('show-body'), 5);
    }, 750)
}
function showFilters(updateFunc) {
    $('body').removeClass('show-body');
    $('select').val('');

    setTimeout(() => {
        $('#filter-wrapper').show();
        $('#cbo-wrapper').hide();
        if (updateFunc) updateFunc();
        setTimeout(() => $('body').addClass('show-body'), 5);
    }, 750)
}

function updateOrgList() {
    $('#cbo-content').html(
        filteredCbos.length ?
            filteredCbos.map((data) => CboTemplate(data)).join('')
            : `<div class="empty-message">Sorry, but we couldn't find any
            organizations matching your filter :(</div>`
    );
}

function updateLanguageList() {
    const filteredLanguages = new Set(activeCbos.map((cbo) => cbo.languages).flat());
    const $languageSetting = $('#language-setting');

    const prevLanguage = $languageSetting.val();
    $languageSetting.find('option:not(:first-child').remove();

    Array.from(filteredLanguages).sort().forEach((language) => {
        if (language.length < 20) {
            $languageSetting.append($('<option>').html(language));
        }
    });

    $languageSetting.val(prevLanguage);
}