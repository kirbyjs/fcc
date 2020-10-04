import './sass/product-landing.scss';

document.addEventListener('DOMContentLoaded', function() {
    window.M.Sidenav.init(document.querySelectorAll('.sidenav'), {
        edge: 'right'
    });
    window.M.Collapsible.init( document.querySelectorAll('.collapsible'), {});
});
