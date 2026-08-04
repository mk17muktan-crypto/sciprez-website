// SciPrez Single-Page Navigation and Shared Interactions

(function () {
    'use strict';

    var DEFAULT_ROUTE = 'home';

    var ROUTES = {
        home: {
            view: 'home',
            nav: '',
            title: 'SciPrez - Presenting Science',
            description:
                'SciPrez is a specialized scientific partner across scientific publications, research and medical communications.'
        },

        about: {
            view: 'about',
            nav: 'about',
            title: 'About SciPrez | Presenting Science',
            description:
                'Learn about SciPrez, its scientific philosophy, expertise, mission and vision.'
        },

        services: {
            view: 'services',
            nav: 'services',
            title: 'Scientific Services | SciPrez',
            description:
                'Explore SciPrez services across scientific publications, research and medical communications.'
        },

        'services-publications': {
    view: 'services-publications',
    nav: 'services',
    title: 'Scientific Publications | SciPrez',
    description:
        'End-to-end scientific publication support across manuscripts, evidence synthesis, consensus development and publication strategy.'
},

        'services-research': {
    view: 'services-research',
    nav: 'services',
    title: 'Research Services | SciPrez',
    description:
        'Real-world research, survey research, systematic reviews and evidence synthesis designed around credible scientific outcomes.'
},

        'services-communications': {
    view: 'services-communications',
    nav: 'services',
    title: 'Medical Communications | SciPrez',
    description:
        'Medical education, scientific content, training, conference communications and accessible healthcare communication from SciPrez.'
},

/*
TEMPORARILY DISABLED: INSIGHTS AND CASE STUDIES		
		
        insights: {
            view: 'insights',
            nav: 'insights',
            title: 'Scientific Insights | SciPrez',
            description:
                'Scientific insights, perspectives and evidence-focused articles from SciPrez.'
        },

        'insight-gpp-sponsors': {
    view: 'insight-detail',
    nav: 'insights',
    articleCategory: 'Scientific Publications',
    articleTitle:
        'What GPP Actually Requires of Sponsors',
    title:
        'What GPP Actually Requires of Sponsors | SciPrez',
    description:
        'A practical perspective on Good Publication Practice and sponsor responsibilities.'
},

'insight-icmje-authorship': {
    view: 'insight-icmje-authorship',
    nav: 'insights',
    title:
        'Authorship Criteria Under ICMJE, Explained | SciPrez',
    description:
        'A practical explanation of authorship criteria under ICMJE guidance.'
},

'insight-consensus-process': {
    view: 'insight-detail',
    nav: 'insights',
    articleCategory: 'Consensus & Guidelines',
    articleTitle:
        'Designing a Consensus Process Journals Will Accept',
    title:
        'Designing a Consensus Process Journals Will Accept | SciPrez',
    description:
        'A scientific perspective on consensus methodology and publishable consensus development.'
},

'insight-ctri-registration': {
    view: 'insight-detail',
    nav: 'insights',
    articleCategory: 'Research',
    articleTitle:
        'When Does an Observational Study Need CTRI Registration?',
    title:
        'When Does an Observational Study Need CTRI Registration? | SciPrez',
    description:
        'Guidance for observational study teams navigating CTRI registration and ethics submissions.'
},

'insight-survey-literature': {
    view: 'insight-detail',
    nav: 'insights',
    articleCategory: 'Research',
    articleTitle:
        'When Does a Survey Study Belong in the Literature?',
    title:
        'When Does a Survey Study Belong in the Literature? | SciPrez',
    description:
        'A scientific perspective on designing survey research for publication.'
},

'insight-cme-clinical-behaviour': {
    view: 'insight-detail',
    nav: 'insights',
    articleCategory: 'Medical Communications',
    articleTitle:
        'Designing CME Content That Changes Clinical Behaviour',
    title:
        'Designing CME Content That Changes Clinical Behaviour | SciPrez',
    description:
        'Why evidence-grounded educational design matters in continuing medical education.'
},

        'case-studies': {
            view: 'case-studies',
            nav: 'case-studies',
            title: 'Case Studies | SciPrez',
            description:
                'Explore selected SciPrez scientific publication, research and communication case studies.'
        },
*/
        contact: {
            view: 'contact',
            nav: 'contact',
            title: 'Contact SciPrez | Start a Conversation',
            description:
                'Contact SciPrez to discuss scientific publications, research or medical communications support.'
        }
    };


    /* ========================================================
       ROUTE HELPERS
       ======================================================== */

    function getRawRoute() {
        return window.location.hash
            .replace(/^#/, '')
            .trim()
            .toLowerCase();
    }


    function getCurrentRoute() {
        var route = getRawRoute();

        if (ROUTES[route]) {
            return route;
        }

        return DEFAULT_ROUTE;
    }


    function updateDocumentMetadata(config) {
        document.title = config.title;

        var description = document.querySelector(
            'meta[name="description"]'
        );

        if (description && config.description) {
            description.setAttribute(
                'content',
                config.description
            );
        }
    }

function updateInsightDetailShell(config) {
    if (config.view !== 'insight-detail') {
        return;
    }

    var titleElement = document.querySelector(
        '[data-insight-detail-title]'
    );

    var categoryElement = document.querySelector(
        '[data-insight-detail-category]'
    );


    if (titleElement && config.articleTitle) {
        titleElement.textContent =
            config.articleTitle;
    }

    if (categoryElement && config.articleCategory) {
        categoryElement.textContent =
            config.articleCategory;
    }
}	

    /* ========================================================
       ACTIVE NAVIGATION
       ======================================================== */

    function updateNavigation(route, config) {
        var routeLinks = document.querySelectorAll(
            '[data-route-link]'
        );

        routeLinks.forEach(function (link) {
            var isExactRoute =
                link.getAttribute('data-route-link') === route;

            link.classList.toggle(
                'active',
                isExactRoute
            );

            if (isExactRoute) {
                link.setAttribute(
                    'aria-current',
                    'page'
                );
            } else {
                link.removeAttribute(
                    'aria-current'
                );
            }
        });


        var groupedLinks = document.querySelectorAll(
            '[data-nav]'
        );

        groupedLinks.forEach(function (link) {
            var belongsToCurrentGroup =
                config.nav &&
                link.getAttribute('data-nav') === config.nav;

            if (belongsToCurrentGroup) {
                link.classList.add('active');
            } else {
                var exactRoute =
                    link.getAttribute('data-route-link') === route;

                if (!exactRoute) {
                    link.classList.remove('active');
                }
            }
        });
    }


    /* ========================================================
       MOBILE MENU
       ======================================================== */

    function closeMobileMenu() {
        var mobileMenu = document.getElementById(
            've-mobile-menu'
        );

        var toggler = document.getElementById(
            've-toggle'
        );

        if (mobileMenu) {
            mobileMenu.classList.remove('open');
        }

        if (toggler) {
            toggler.setAttribute(
                'aria-expanded',
                'false'
            );
        }
    }


    function initialiseMobileMenu() {
        var toggler = document.getElementById(
            've-toggle'
        );

        var mobileMenu = document.getElementById(
            've-mobile-menu'
        );

        if (!toggler || !mobileMenu) {
            return;
        }

        toggler.addEventListener(
            'click',
            function () {
                var isOpen =
                    mobileMenu.classList.toggle('open');

                toggler.setAttribute(
                    'aria-expanded',
                    String(isOpen)
                );
            }
        );
    }


    /* ========================================================
       PAGE VIEW SWITCHING
       ======================================================== */

    function revealView(route, initialLoad) {
        var config =
            ROUTES[route] ||
            ROUTES[DEFAULT_ROUTE];

        var views = document.querySelectorAll(
            '.ve-page-view'
        );

        views.forEach(function (view) {
            var isCurrent =
                view.getAttribute('data-view') === config.view;

            view.hidden = !isCurrent;

            view.setAttribute(
                'aria-hidden',
                String(!isCurrent)
            );

            view.classList.remove('is-entering');

            if (isCurrent) {
                // Forces the entry animation to restart.
                void view.offsetWidth;

                view.classList.add('is-entering');
            }
        });


        updateNavigation(
            route,
            config
        );

        updateDocumentMetadata(
    config
);

updateInsightDetailShell(
    config
);

        closeMobileMenu();


        window.requestAnimationFrame(function () {
            if (config.anchor) {
                var anchor = document.getElementById(
                    config.anchor
                );

                if (anchor) {
                    var headerOffset = 84;

                    var anchorPosition =
                        anchor.getBoundingClientRect().top +
                        window.pageYOffset -
                        headerOffset;

                    window.scrollTo({
                        top: Math.max(0, anchorPosition),
                        behavior: initialLoad ? 'auto' : 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto'
                    });
                }
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'auto'
                });
            }


            // Let existing animation and waypoint plugins
            // recalculate after the hidden view becomes visible.
            if (window.jQuery) {
                window.jQuery(window)
                    .trigger('resize')
                    .trigger('scroll');
            }
        });
    }


    function navigateTo(route) {
        if (!ROUTES[route]) {
            route = DEFAULT_ROUTE;
        }

        if (getCurrentRoute() === route) {
            revealView(
                route,
                false
            );

            return;
        }

        window.location.hash = route;
    }


    /* ========================================================
       ROUTE LINK HANDLING
       ======================================================== */

    function initialiseRouteLinks() {
        document.addEventListener(
            'click',
            function (event) {
                var link = event.target.closest(
                    '[data-route-link]'
                );

                if (!link) {
                    return;
                }

                var route = link.getAttribute(
                    'data-route-link'
                );

                if (!ROUTES[route]) {
                    return;
                }

                event.preventDefault();

                // Prevent the desktop Services dropdown from remaining
                // open after a routed dropdown link has been selected.
                if (typeof link.blur === 'function') {
                    link.blur();
                }

                navigateTo(route);
            }
        );
    }


    /* ========================================================
       STICKY HEADER
       ======================================================== */

    function updateStickyHeader() {
        var header = document.getElementById(
            've-sticky'
        );

        if (!header) {
            return;
        }

        header.classList.toggle(
            'scrolled',
            window.scrollY > 50
        );
    }


    function initialiseStickyHeader() {
        updateStickyHeader();

        window.addEventListener(
            'scroll',
            updateStickyHeader,
            { passive: true }
        );
    }


    /* ========================================================
       FAQ INTERACTION
       Event delegation works across every hidden page view.
       ======================================================== */

    function initialiseFaqInteraction() {
        document.addEventListener(
            'click',
            function (event) {
                var question = event.target.closest(
                    '.ve-faq-q'
                );

                if (!question) {
                    return;
                }

                var item = question.closest(
                    '.ve-faq-item'
                );

                if (!item) {
                    return;
                }

                var wasOpen =
                    item.classList.contains('open');

                var currentView = item.closest(
                    '.ve-page-view'
                );

                var scope =
                    currentView ||
                    document;

                scope.querySelectorAll(
                    '.ve-faq-item.open'
                ).forEach(function (openItem) {
                    openItem.classList.remove('open');
                });

                if (!wasOpen) {
                    item.classList.add('open');
                }
            }
        );
    }

/* ========================================================
   INSIGHTS CATEGORY FILTER
   ======================================================== */

function initialiseInsightsTabs() {
    var filterGroups = document.querySelectorAll(
        '[data-insights-filter-group]'
    );

    filterGroups.forEach(function (filterGroup) {
        var section = filterGroup.closest(
            '.ve-insights-library-section'
        );

        if (!section) {
            return;
        }

        var buttons = filterGroup.querySelectorAll(
            '[data-insight-filter]'
        );

        var cards = section.querySelectorAll(
            '[data-insight-card]'
        );


        buttons.forEach(function (button) {
            button.addEventListener(
                'click',
                function () {
                    var selectedFilter =
                        button.getAttribute(
                            'data-insight-filter'
                        );


                    buttons.forEach(function (item) {
                        var isSelected =
                            item === button;

                        item.classList.toggle(
                            'is-active',
                            isSelected
                        );

                        item.setAttribute(
                            'aria-selected',
                            String(isSelected)
                        );
                    });


                    cards.forEach(function (card) {
                        var cardCategory =
                            card.getAttribute(
                                'data-insight-category'
                            );

                        var shouldShow =
                            selectedFilter === 'all' ||
                            cardCategory === selectedFilter;


                        card.getAnimations().forEach(
                            function (animation) {
                                animation.cancel();
                            }
                        );


                        if (shouldShow) {
                            card.hidden = false;

                            card.animate(
                                [
                                    {
                                        opacity: 0,
                                        transform:
                                            'translateY(18px) scale(0.97)'
                                    },
                                    {
                                        opacity: 1,
                                        transform:
                                            'translateY(0) scale(1)'
                                    }
                                ],
                                {
                                    duration: 380,
                                    easing:
                                        'cubic-bezier(0.22, 1, 0.36, 1)',
                                    fill: 'both'
                                }
                            );
                        } else if (!card.hidden) {
                            var hideAnimation =
                                card.animate(
                                    [
                                        {
                                            opacity: 1,
                                            transform:
                                                'translateY(0) scale(1)'
                                        },
                                        {
                                            opacity: 0,
                                            transform:
                                                'translateY(-10px) scale(0.97)'
                                        }
                                    ],
                                    {
                                        duration: 210,
                                        easing: 'ease',
                                        fill: 'both'
                                    }
                                );

                            hideAnimation.onfinish =
                                function () {
                                    card.hidden = true;
                                };
                        }
                    });
                }
            );
        });
    });
}

/* ========================================================
   INDIVIDUAL INSIGHT PAGE NAVIGATION
   ======================================================== */

function initialiseInsightPageNavigation() {
    document.addEventListener(
        'click',
        function (event) {
            var trigger = event.target.closest(
                '[data-insight-jump]'
            );

            if (!trigger) {
                return;
            }

            var targetId = trigger.getAttribute(
                'data-insight-jump'
            );

            var target = document.getElementById(
                targetId
            );

            if (!target) {
                return;
            }

            var headerOffset = 96;

            var targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerOffset;

            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        }
    );
}	
	
    /* ========================================================
       INITIALISATION
       ======================================================== */

    document.addEventListener(
        'DOMContentLoaded',
        function () {
            initialiseMobileMenu();
initialiseRouteLinks();
initialiseStickyHeader();
initialiseFaqInteraction();
initialiseInsightsTabs();
initialiseInsightPageNavigation();

            var rawRoute = getRawRoute();
            var initialRoute = getCurrentRoute();

            if (rawRoute && !ROUTES[rawRoute]) {
                window.history.replaceState(
                    null,
                    '',
                    window.location.pathname +
                    window.location.search +
                    '#home'
                );

                initialRoute = DEFAULT_ROUTE;
            }

            revealView(
                initialRoute,
                true
            );
        }
    );


    window.addEventListener(
        'hashchange',
        function () {
            revealView(
                getCurrentRoute(),
                false
            );
        }
    );

})();