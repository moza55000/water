function showPage(pageId) {
  const pages = ['home', 'account', 'auth', 'services', 'contact'];
  pages.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(pageId).classList.remove('hidden');

  if (pageId === 'account') {
    loadUserDetails();
  }
  
  // إغلاق القائمة المنسدلة عند اختيار صفحة
  document.getElementById('accountDropdown').style.display = 'none';
}

function toggleDropdown() {
  const dropdown = document.getElementById('accountDropdown');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
}

function showAuthForm(formType) {
  // إظهار صفحة المصادقة
  showPage('auth');
  
  // تبديل النماذج
  if (formType === 'login') {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('registerTab').classList.remove('active');
  } else {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerTab').classList.add('active');
  }
  
  // إغلاق القائمة المنسدلة
  document.getElementById('accountDropdown').style.display = 'none';
}

function handleRegister() {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  const name = document.getElementById('regName').value;

  if (!username || !password || !name) {
    document.getElementById('registerMessage').textContent = "يرجى ملء جميع الحقول.";
    return;
  }

  if (localStorage.getItem('user_' + username)) {
    document.getElementById('registerMessage').textContent = "اسم المستخدم موجود بالفعل!";
    return;
  }

  localStorage.setItem('user_' + username, JSON.stringify({ username, password, name }));
  document.getElementById('registerMessage').textContent = "تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.";
  
  // التبديل تلقائياً إلى نموذج تسجيل الدخول بعد التسجيل
  showAuthForm('login');
}

function handleLogin() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (!username || !password) {
    document.getElementById('loginMessage').textContent = "يرجى ملء جميع الحقول.";
    return;
  }

  const user = JSON.parse(localStorage.getItem('user_' + username));
  if (user && user.password === password) {
    localStorage.setItem('loggedInUser', username);
    loadUserDetails();
    showPage('account');
    document.getElementById('loginMessage').textContent = "";
  } else {
    document.getElementById('loginMessage').textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
  }
}

function loadUserDetails() {
  const username = localStorage.getItem('loggedInUser');
  const userDetailsDiv = document.getElementById('userDetails');

  if (!username) {
    userDetailsDiv.innerHTML = `
      <p>يرجى تسجيل الدخول لعرض تفاصيل الحساب.</p>`;
    return;
  }

  const user = JSON.parse(localStorage.getItem('user_' + username));
  userDetailsDiv.innerHTML = `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p><strong>اسم المستخدم:</strong> ${user.username}</p>
      <p><strong>تاريخ التسجيل:</strong> ${new Date().toLocaleDateString('ar-EG')}</p>
      <button class="logout-btn" onclick="logout()">تسجيل الخروج</button>
    </div>
  `;
}

function logout() {
  localStorage.removeItem('loggedInUser');
  showPage('home');
}

function handleContactSubmit() {
  alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
  showPage('home');
}

// إخفاء القائمة المنسدلة عند النقر خارجها
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
}

// عرض الصفحة الرئيسية عند التحميل
window.onload = function() {
  showPage('home');
};