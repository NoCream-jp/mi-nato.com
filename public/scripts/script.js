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