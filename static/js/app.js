document.addEventListener('DOMContentLoaded', function () {
    if (window.lucide) window.lucide.createIcons();

    var sidebar = document.getElementById('app-sidebar');
    var sidebarToggle = document.getElementById('mobile-sidebar-toggle');
    var sidebarBackdrop = document.getElementById('sidebar-backdrop');
    var setSidebarState = function (isOpen) {
        if (!sidebar || !sidebarToggle) return;
        sidebar.classList.toggle('is-open', isOpen);
        if (sidebarBackdrop) sidebarBackdrop.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('sidebar-open', isOpen);
        sidebarToggle.setAttribute('aria-expanded', String(isOpen));
        sidebarToggle.setAttribute('aria-label', isOpen ? 'بستن منو' : 'باز کردن منو');
        sidebarToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        if (window.lucide) window.lucide.createIcons();
    };
    if (sidebarToggle) sidebarToggle.addEventListener('click', function () {
        setSidebarState(!sidebar.classList.contains('is-open'));
    });
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', function () { setSidebarState(false); });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && sidebar && sidebar.classList.contains('is-open')) setSidebarState(false);
    });

    var themeToggle = document.getElementById('theme-toggle');
    var savedTheme = localStorage.getItem('mybalance-theme');
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    if (themeToggle) themeToggle.addEventListener('click', function () {
        var isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('mybalance-theme', isDark ? 'dark' : 'light');
    });

    if (typeof $.fn.persianDatepicker !== 'undefined') {
        $('.jalali-date-input').each(function () {
            var $input = $(this);
            $input.persianDatepicker({
                format: 'YYYY/MM/DD',
                autoClose: true,
                initialValue: false,
                persianDigit: true,
                position: 'auto',
                responsive: true
            });

            var picker = $input.data('datepicker');
            if (picker && picker.view && typeof picker.view.setPickerBoxPosition === 'function') {
                $input.on('focus click', function () {
                    setTimeout(function () {
                        if (picker && picker.view && typeof picker.view.setPickerBoxPosition === 'function') {
                            picker.view.setPickerBoxPosition();
                        }
                    }, 0);
                });
            }
        });
    }

    var newCategoryToggle = document.getElementById('toggle-new-category');
    var newCategoryPanel = document.getElementById('new-category-panel');

    if (newCategoryToggle && newCategoryPanel) {
        newCategoryToggle.addEventListener('click', function (e) {
            e.preventDefault();
            newCategoryPanel.classList.toggle('hidden');
        });
    }
});
