const guestLoginButton = document.getElementById('guest-login');
const guestNameInput = document.getElementById('guest-name');
const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');
const basePath = window.location.pathname.includes('/Login/') ? '../' : '';
const patientPagePath = `${basePath}Patient page/Patient page.html`;
const adminPagePath = `${basePath}admin/admin.html`;

if (loginForm && usernameInput) {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (!username) {
            alert('الرجاء إدخال اسم المستخدم قبل تسجيل الدخول.');
            usernameInput.focus();
            return;
        }
        window.location.href = `${patientPagePath}?guest=${encodeURIComponent(username)}`;
    });
}

if (guestLoginButton && guestNameInput) {
    guestLoginButton.addEventListener('click', () => {
        const guestName = guestNameInput.value.trim();
        if (!guestName) {
            alert('الرجاء إدخال اسم الضيف قبل الدخول كضيف.');
            guestNameInput.focus();
            return;
        }

        window.location.href = `${patientPagePath}?guest=${encodeURIComponent(guestName)}`;
    });
}

const adminAccessButton = document.getElementById('admin-access');
if (adminAccessButton) {
    adminAccessButton.addEventListener('click', () => {
        const password = prompt('الرجاء إدخال كلمة مرور الأدمن:');
        if (password === 'admin123') {
            window.location.href = adminPagePath;
        } else if (password !== null) {
            alert('كلمة المرور غير صحيحة.');
        }
    });
}
