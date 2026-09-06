document.addEventListener("DOMContentLoaded", function () {
    const checkSidebar = setInterval(() => {
        const sidebar = document.querySelector('.desk-sidebar');
        if (sidebar) {
            clearInterval(checkSidebar);

            sidebar.style.width = "50px";
            sidebar.style.transition = "width 0.3s ease-in-out";
            sidebar.style.overflow = "hidden";

            sidebar.addEventListener('mouseenter', () => {
                sidebar.style.width = "220px";
            });

            sidebar.addEventListener('mouseleave', () => {
                sidebar.style.width = "50px";
            });
        }
    }, 100);
});