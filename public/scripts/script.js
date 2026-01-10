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
    const linkCards = document.querySelectorAll('.link-card');

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

    // カテゴリー選択時の処理
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.getAttribute('data-category');
            // カードの表示・非表示切り替え
            let visibleCards = [];
            linkCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'flex';
                    visibleCards.push(card);
                } else {
                    card.style.display = 'none';
                }
                // リセット: すべてのカードからlast-visibleを外す
                card.classList.remove('last-visible');
            });

            // 表示されている最後のカードに下線用のクラスを付与
            if (visibleCards.length > 0) {
                visibleCards[visibleCards.length - 1].classList.add('last-visible');
            }

            // ドロップダウンを閉じる
            dropdownContent.classList.remove('show');
        });
    });
});