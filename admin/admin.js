const PATIENTS_KEY = 'yaffa_patients';
const APPOINTMENTS_KEY = 'yaffa_appointments';

function loadStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function updateAdminStats() {
  const patients = loadStorage(PATIENTS_KEY);
  const appointments = loadStorage(APPOINTMENTS_KEY);
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;
  const total = appointments.length || 1;

  document.getElementById('patientsCount').textContent = patients.length;
  document.getElementById('todayBookingsCount').textContent = appointments.length;
  document.getElementById('pendingRequestsCount').textContent = pendingCount;
  document.getElementById('confirmedCount').textContent = appointments.filter(a => a.status === 'confirmed').length;
  document.getElementById('pendingCount').textContent = pendingCount;
  document.getElementById('cancelledRate').textContent = `${Math.round((cancelledCount / total) * 100)}%`;
}

function renderPendingRequests() {
  const requests = loadStorage(APPOINTMENTS_KEY).filter(a => a.status === 'pending');
  const container = document.getElementById('pendingRequestsList');
  if (!container) return;
  if (!requests.length) {
    container.innerHTML = '<div class="empty">لا توجد طلبات جديدة</div>';
  } else {
    container.innerHTML = requests.map(req => `
      <div class="request-item">
        <div>
          <div class="request-title">${req.patientName} - ${req.service}</div>
          <div class="request-meta">${req.day} ${req.date} - ${req.time}</div>
        </div>
        <div class="request-actions">
          <button class="btn-primary" onclick="updateRequestStatus('${req.id}','confirmed')">موافقة</button>
          <button class="btn-secondary" onclick="updateRequestStatus('${req.id}','cancelled')">إلغاء</button>
        </div>
      </div>
    `).join('');
  }
  updateAdminStats();
}

function updateRequestStatus(id, status) {
  const appointments = loadStorage(APPOINTMENTS_KEY).map(appt => {
    if (appt.id === id) appt.status = status;
    return appt;
  });
  saveStorage(APPOINTMENTS_KEY, appointments);
  renderPendingRequests();
}

updateAdminStats();
renderPendingRequests();