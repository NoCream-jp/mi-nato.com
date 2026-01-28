const shareButton = document.querySelector('.share-button');
if (shareButton) {
    shareButton.addEventListener('click', async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('URLをクリップボードにコピーしました。');
            }
        } catch (error) {
            console.log('共有がキャンセルされたか、エラーが発生しました。', error);
        }
    });
}

const wrapper = document.getElementById('news-scroll-wrapper');
if (wrapper) {
    let animationId;
    const speed = 0.8; // スクロール速度
    const autoScroll = () => {
        wrapper.scrollLeft += speed;
        // コンテンツの半分まで来たら巻き戻す（無限スクロール風）
        if (wrapper.scrollLeft >= wrapper.scrollWidth / 2) {
            wrapper.scrollLeft -= wrapper.scrollWidth / 2;
        }
        animationId = requestAnimationFrame(autoScroll);
    };
    animationId = requestAnimationFrame(autoScroll);
    wrapper.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
    wrapper.addEventListener('mouseleave', () => animationId = requestAnimationFrame(autoScroll));
    wrapper.addEventListener('touchstart', () => cancelAnimationFrame(animationId));
    wrapper.addEventListener('touchend', () => animationId = requestAnimationFrame(autoScroll));
}

/* ========== Tagのfilter処理 ========== */
document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('tag-filter-button');
    const dropdownContent = document.getElementById('tag-dropdown-content');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const articleItems = document.querySelectorAll('.article-filter-item');

    if (filterButton && dropdownContent) {
        // プルダウンの開閉
        filterButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });

        // 画面外クリックで閉じる
        document.addEventListener('click', (e) => {
            if (!filterButton.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    }

    // カテゴリー選択時の処理
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.getAttribute('data-category');
            // カードの表示・非表示切り替え
            articleItems.forEach(wrapper => {
                const category = wrapper.getAttribute('data-category');
                if (selectedCategory === 'all' || category === selectedCategory) {
                    wrapper.style.display = 'contents';
                } else {
                    wrapper.style.display = 'none';
                }
            });
            // ドロップダウンを閉じる
            if (dropdownContent) dropdownContent.classList.remove('show');
        });
    });
});
