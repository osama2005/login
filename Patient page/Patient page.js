(() => {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get('guest') || 'ضيف';
  const currentUserName = document.getElementById('currentUserName');

  if (currentUserName) {
    currentUserName.textContent = guest.trim();
  }
})();
