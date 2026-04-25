const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('guest');
const nameElement = document.querySelector('.patient-card h2');
const avatarElement = document.querySelector('.patient-avatar');
const subtitleElement = document.querySelector('.subtitle');

if (guestName && nameElement && avatarElement && subtitleElement) {
    const cleanName = guestName.trim();
    if (cleanName) {
        nameElement.textContent = cleanName;
        avatarElement.textContent = cleanName.charAt(0);
        subtitleElement.textContent = `مرحباً ${cleanName} في نظام مستشفى يافا`;
    }
}
