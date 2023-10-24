import './index.less';
import '../img/wasi_logo.png';

import CboTemplate from './templates/cboTemplate.handlebars';

import CboNyc from '../data/cbos_nyc';
import CboBrooklyn from '../data/cbos_brooklyn';
import CboQueens from '../data/cbos_queens';
import CboManhattan from '../data/cbos_manhattan';
import CboBronx from '../data/cbos_bronx';
import CboStaten from '../data/cbos_staten';

const allCbos = [...CboNyc, ...CboBrooklyn, ...CboQueens, ...CboManhattan, ...CboBronx, ...CboStaten];

// const observer = new MutationObserver((mutationList) => {
//     let doUpdate = false;
//     for (const mutation of mutationList) {
//         if (mutation.type === "childList") {
//             doUpdate = true;
//         }
//     }
//     if (doUpdate) updateSpacer();
// });
// observer.observe($('body')[0], { attributes: true, childList: true, subtree: true });

$(document).ready(() => {
    setTimeout(initTranslation, 100);

    $('.filter-btn').on('click', (e) => {
        // observer.disconnect();
        console.log('clicked filter');
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
});

function initTranslation() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en', includedLanguages: 'en,es,qu', layout: google.translate.TranslateElement.InlineLayout.SIMPLE},
        'translate-btn'
    );
}

function updateSpacer() {
    const height = $('#logo-wrapper').height();
    $('#spacer').css({height});
}

function showOrgs(filterType) {
    $('body').removeClass('show-body');
    setTimeout(() => {
        $('#filter-wrapper').hide();

        $('#cbo-content').html(
            allCbos
                .filter((data) => data.description.includes(filterType))
                .map((data) => CboTemplate(data))
                .join('')
        );
        $('#cbo-wrapper').show();

        setTimeout(() => $('body').addClass('show-body'), 5);
    }, 750)
}
function showFilters(updateFunc) {
    $('body').removeClass('show-body');
    setTimeout(() => {
        $('#filter-wrapper').show();
        $('#cbo-wrapper').hide();
        if (updateFunc) updateFunc();
        setTimeout(() => $('body').addClass('show-body'), 5);
    }, 750)
}