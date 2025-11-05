document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-container');
    const content = document.querySelector('.content');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    // Показываем контейнер (если ранее был скрыт)
    if (videoContainer) {
        videoContainer.classList.add('visible');
    }

    // Открытие модального окна при клике на картинку
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden'; // Запретить прокрутку фона
        });
    });

    // Закрытие по клику на крестик
    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по нажатию Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Вернуть прокрутку
    }

    // Подгоняем отступ у .content по реальной высоте видео-контейнера,
    // чтобы контент не оказался под видео.
    function adjustContentPadding() {
        if (!videoContainer || !content) return;
        const rect = videoContainer.getBoundingClientRect();
        // rect.height — высота плеера; добавляем небольшой запас + базовый padding страницы (20)
        content.style.paddingTop = paddingTop + 'px';
    }

    // Запустить сразу и при изменении размеров
    adjustContentPadding();
    window.addEventListener('resize', adjustContentPadding);
    // Пересчитать немного позже на случай задержки загрузки видео/шрифтов
    setTimeout(adjustContentPadding, 500);
});