const menuToggle = document.getElementById('menu-toggle');
const header = document.querySelector('.header');
menuToggle.addEventListener('click', () => {
    header.classList.toggle('menu-open');
});

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