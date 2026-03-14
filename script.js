// --- Constants ---
const DEPARTMENTS = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];

const LANGUAGES = {
  en: {
    login: 'Login',
    register: 'Register',
    student: 'Student',
    teacher: 'Teacher',
    hod: 'HOD',
    email: 'Email Address',
    password: 'Password',
    fullName: 'Full Name',
    prn: 'Roll No',
    department: 'Department',
    classSubject: 'Class / Subject',
    contact: 'Contact Number',
    address: 'Address',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account? Register",
    alreadyHaveAccount: 'Already have an account? Login',
    attendance: 'Attendance',
    complaints: 'Complaints',
    notices: 'Notices',
    profile: 'Profile',
    logout: 'Logout',
    markAttendance: 'Mark Attendance',
    viewHistory: 'View History',
    sendNotice: 'Send Notice',
    exportData: 'Export Data',
    addStudent: 'Add Student',
    contactInfo: 'Contact Info',
    adminContact: 'Admin Contact',
    supportEmail: 'Support Email',
    writeComplaint: 'Write your complaint here...',
    send: 'Send',
    allTeachers: 'Sent to all teachers',
    hodOnly: 'Sent to HOD only',
    present: 'Present',
    absent: 'Absent',
    totalStudents: 'Total Students',
    averageAttendance: 'Average Attendance',
    recentActivity: 'Recent Activity',
    noNotices: 'No notices available.',
    noComplaints: 'No complaints yet.',
    studentDashboard: 'Student Dashboard',
    teacherDashboard: 'Teacher Dashboard',
    hodDashboard: 'HOD Dashboard',
    studyMaterial: 'Study Material',
    handnotes: 'Handnotes',
    syllabus: 'Syllabus',
    pyqs: 'PYQs',
    upload: 'Upload',
    title: 'Title',
    link: 'Link URL (Google Drive, PDF, etc.)',
    materials: 'Materials'
  },
  mr: {
    login: 'लॉगिन',
    register: 'नोंदणी करा',
    student: 'विद्यार्थी',
    teacher: 'शिक्षक',
    hod: 'विभाग प्रमुख',
    email: 'ईमेल पत्ता',
    password: 'पासवर्ड',
    fullName: 'पूर्ण नाव',
    prn: 'रोल नंबर',
    department: 'विभाग',
    classSubject: 'वर्ग / विषय',
    contact: 'संपर्क क्रमांक',
    address: 'पत्ता',
    forgotPassword: 'पासवर्ड विसरलात?',
    dontHaveAccount: 'खाते नाही? नोंदणी करा',
    alreadyHaveAccount: 'आधीच खाते आहे? लॉगिन करा',
    attendance: 'उपस्थिती',
    complaints: 'तक्रारी',
    notices: 'सूचना',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    markAttendance: 'उपस्थिती नोंदवा',
    viewHistory: 'इतिहास पहा',
    sendNotice: 'सूचना पाठवा',
    exportData: 'डेटा एक्सपोर्ट करा',
    addStudent: 'विद्यार्थी जोडा',
    contactInfo: 'संपर्क माहिती',
    adminContact: 'अ‍ॅडमिन संपर्क',
    supportEmail: 'सपोर्ट ईमेल',
    writeComplaint: 'तुमची तक्रार येथे लिहा...',
    send: 'पाठवा',
    allTeachers: 'सर्व शिक्षकांना पाठवले',
    hodOnly: 'फक्त विभाग प्रमुखांना पाठवले',
    present: 'हजर',
    absent: 'गैरहजर',
    totalStudents: 'एकूण विद्यार्थी',
    averageAttendance: 'सरासरी उपस्थिती',
    recentActivity: 'अलीकडील क्रियाकलाप',
    noNotices: 'कोणत्याही सूचना उपलब्ध नाहीत.',
    noComplaints: 'अद्याप तक्रारी नाहीत.',
    studentDashboard: 'विद्यार्थी डॅशबोर्ड',
    teacherDashboard: 'शिक्षक डॅशबोर्ड',
    hodDashboard: 'विभाग प्रमुख डॅशबोर्ड',
    studyMaterial: 'अभ्यास साहित्य',
    handnotes: 'हस्तलिखित नोट्स',
    syllabus: 'अभ्यासक्रम',
    pyqs: 'मागील वर्षाचे प्रश्न',
    upload: 'अपलोड करा',
    title: 'शीर्षक',
    link: 'लिंक URL (गुगल ड्राईव्ह, पीडीएफ)',
    materials: 'साहित्य'
  }
};

// --- State Management ---
const DEFAULT_USERS = [
  { id: '1', name: 'Admin HOD', email: 'hod@example.com', password: 'password', role: 'HOD', department: 'Computer Science' },
  { id: '2', name: 'John Teacher', email: 'teacher@example.com', password: 'password', role: 'Teacher', department: 'Computer Science' },
  { id: '3', name: 'Alice Student', email: 'student@example.com', password: 'password', role: 'Student', prn: '101', department: 'Computer Science' }
];

const DEFAULT_COMPLAINTS = [];
const DEFAULT_NOTICES = [];

const savedUsers = localStorage.getItem('attendoo_users');
let parsedUsers = [];
try {
  parsedUsers = JSON.parse(savedUsers) || [];
} catch (e) {
  parsedUsers = [];
}

let state = {
  currentUser: JSON.parse(localStorage.getItem('attendoo_current_user')) || null,
  users: parsedUsers.length > 0 ? parsedUsers : DEFAULT_USERS,
  attendance: JSON.parse(localStorage.getItem('attendoo_attendance')) || [],
  complaints: JSON.parse(localStorage.getItem('attendoo_complaints')) || [],
  notices: JSON.parse(localStorage.getItem('attendoo_notices')) || [],
  materials: JSON.parse(localStorage.getItem('attendoo_materials')) || [],
  lang: 'en',
  isDarkMode: true,
  isRegistering: false,
  currentRole: 'Student',
  showProfile: false,
  currentSubject: 'General',
  currentDivision: 'A',
  currentView: 'dashboard'
};

// --- Selectors ---
const app = document.getElementById('app');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const toastIcon = document.getElementById('toast-icon');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

// --- Helpers ---
function showToast(message, type = 'success') {
  const dialDisplay = document.getElementById('dial-display');
  if (dialDisplay) {
    dialDisplay.innerHTML = `<span class="text-[9px] font-bold uppercase tracking-widest ${type === 'error' ? 'text-rose-500' : 'text-emerald-500'} animate-pulse">${message}</span>`;
    setTimeout(() => {
      if (document.getElementById('dial-display') === dialDisplay && dialDisplay.querySelector('span')) {
        dialDisplay.textContent = '----';
      }
    }, 2000);
    return;
  }

  toastMessage.textContent = message;
  toast.className = `fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl glass-card !p-4 !px-8 flex items-center gap-4 z-[200] animate-scale-in ${
    type === 'error' ? 'border-rose-500/30' : 'border-emerald-500/30'
  }`;
  toast.classList.remove('hidden');
  
  // Set icon
  toastIcon.innerHTML = type === 'success' 
    ? '<i data-lucide="check-circle" class="text-emerald-400" size="20"></i>' 
    : '<i data-lucide="alert-circle" class="text-rose-400" size="20"></i>';
  
  lucide.createIcons();
  
  setTimeout(() => {
    toast.classList.add('opacity-0');
    toast.classList.add('translate-y-4');
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('opacity-0', 'translate-y-4');
    }, 400);
  }, 3000);
}

function saveState() {
  localStorage.setItem('attendoo_users', JSON.stringify(state.users));
  localStorage.setItem('attendoo_attendance', JSON.stringify(state.attendance));
  localStorage.setItem('attendoo_complaints', JSON.stringify(state.complaints));
  localStorage.setItem('attendoo_notices', JSON.stringify(state.notices));
  localStorage.setItem('attendoo_materials', JSON.stringify(state.materials));
  localStorage.setItem('attendoo_current_user', JSON.stringify(state.currentUser));
}

function getNextPrn() {
  const studentPrns = state.users
    .filter(u => u.role === 'Student')
    .map(u => parseInt(u.prn))
    .filter(n => !isNaN(n));
  return studentPrns.length > 0 ? Math.max(...studentPrns) + 1 : 100;
}

function openModal(title, content) {
  modalTitle.textContent = title;
  modalBody.innerHTML = '';
  if (typeof content === 'string') {
    modalBody.innerHTML = content;
  } else {
    modalBody.appendChild(content);
  }
  modalContainer.classList.remove('hidden');
  lucide.createIcons();
}

function closeModal() {
  modalContainer.classList.add('hidden');
}

// --- Auth Logic ---
function handleLogin(e) {
  e.preventDefault();
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>`;

  setTimeout(() => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = state.currentRole;

    const user = state.users.find(u => u.email === email && u.password === password && u.role === role);

    if (user) {
      user.lastLogin = new Date().toLocaleDateString();
      user.lastLoginTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      state.currentUser = user;
      saveState();
      render();
      showToast(`Welcome back, ${user.name}!`);
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      showToast('Invalid credentials or role', 'error');
    }
  }, 800);
}

function handleRegister(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const role = state.currentRole;
  const prn = e.target.prn ? e.target.prn.value : '';
  const department = e.target.department ? e.target.department.value : '';
  const classSubject = e.target.classSubject ? e.target.classSubject.value : '';
  const division = e.target.division ? e.target.division.value : 'A';

  if (state.users.some(u => u.email === email)) {
    showToast('Email already exists', 'error');
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role,
    prn,
    department,
    contact: '',
    address: '',
    classSubject,
    division
  };

  state.users.push(newUser);
  state.currentUser = newUser;
  saveState();
  render();
  showToast('Registration successful!');
}

// --- Dashboard Logic ---
function markAttendance(studentId, subject, status, division = state.currentDivision) {
  const student = state.users.find(u => u.id === studentId);
  if (!student) return;

  const today = new Date().toLocaleDateString();
  const existingRecord = state.attendance.find(a => 
    a.studentId === studentId && 
    a.date === today && 
    a.subject === subject &&
    a.division === division
  );

  if (existingRecord) {
    if (existingRecord.status === status) {
      showToast(`Already marked as ${status}`, 'info');
      return;
    }
    existingRecord.status = status;
    existingRecord.timestamp = Date.now();
    saveState();
    showToast(`Updated to ${status}`);
    render();
    return;
  }

  const record = {
    id: Date.now().toString(),
    studentId,
    studentName: student.name,
    prn: student.prn,
    subject,
    status,
    division,
    date: today,
    timestamp: Date.now()
  };

  state.attendance.unshift(record);
  saveState();
  showToast(`Attendance marked as ${status}`);
  render();
}

function sendNotice(message) {
  const notice = {
    id: Date.now().toString(),
    fromId: state.currentUser.id,
    fromName: state.currentUser.name,
    message,
    date: new Date().toLocaleDateString()
  };

  state.notices.unshift(notice);
  saveState();
  showToast('Notice broadcasted successfully');
  render();
}

function sendComplaint(message) {
  const complaint = {
    id: Date.now().toString(),
    fromId: state.currentUser.id,
    fromName: state.currentUser.name,
    fromRole: state.currentUser.role,
    message,
    date: new Date().toLocaleDateString(),
    targetRole: state.currentUser.role === 'Student' ? 'Teacher' : 'HOD'
  };

  state.complaints.unshift(complaint);
  saveState();
  showToast('Complaint sent');
  render();
}

function viewStudentHistory(studentId) {
  const student = state.users.find(u => u.id === studentId);
  if (!student) return;

  const userAttendance = state.attendance.filter(a => a.studentId === studentId);
  const t = LANGUAGES[state.lang];

  const historyHtml = `
    <div class="space-y-4">
      <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
        <p class="text-sm font-bold text-slate-900">${student.name}</p>
        <p class="text-xs text-slate-500">Roll No: ${student.prn} | ${student.department}</p>
      </div>
      <div class="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        ${userAttendance.length > 0 ? userAttendance.map(a => `
          <div class="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center ${a.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}">
                <i data-lucide="${a.status === 'Present' ? 'check' : 'x'}"></i>
              </div>
              <div>
                <p class="font-bold text-sm text-slate-900">${a.subject}</p>
                <p class="text-[10px] text-slate-400 font-medium">${a.date}</p>
              </div>
            </div>
            <span class="text-xs font-bold px-3 py-1 rounded-full ${a.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}">${a.status}</span>
          </div>
        `).join('') : `<p class="text-center text-slate-400 py-8 italic">No attendance records found.</p>`}
      </div>
    </div>
  `;

  openModal(`${t.attendance} History`, historyHtml);
}

function viewStudentDirectory() {
  const students = state.users.filter(u => u.role === 'Student');
  const t = LANGUAGES[state.lang];

  const directoryHtml = `
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="relative">
          <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size="18"></i>
          <input type="text" id="student-search" placeholder="Search by name or Roll No..." class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-slate-900">
        </div>
        <div class="relative">
          <i data-lucide="filter" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size="18"></i>
          <select id="dept-filter" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-slate-900 appearance-none">
            <option value="all">All Departments</option>
            ${DEPARTMENTS.map(d => `<option value="${d}">${d}</option>`).join('')}
          </select>
        </div>
      </div>
      <div id="directory-list" class="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        ${students.map(s => `
          <div class="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-rose-200 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                ${s.name.charAt(0)}
              </div>
              <div>
                <p class="font-bold text-sm text-slate-900">${s.name}</p>
                <p class="text-[10px] text-slate-400 font-bold">${s.department} | Roll No: ${s.prn}</p>
              </div>
            </div>
            <button onclick="viewStudentHistory('${s.id}')" class="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-lg transition-all">
              <i data-lucide="history" size="16"></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  openModal('Student Directory', directoryHtml);

  const searchInput = document.getElementById('student-search');
  const deptFilter = document.getElementById('dept-filter');

  function filterDirectory() {
    const term = searchInput.value.toLowerCase();
    const dept = deptFilter.value;
    
    const filtered = students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(term) || s.prn.toString().includes(term);
      const matchesDept = dept === 'all' || s.department === dept;
      return matchesSearch && matchesDept;
    });
    
    document.getElementById('directory-list').innerHTML = filtered.map(s => `
      <div class="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-rose-200 transition-all">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
            ${s.name.charAt(0)}
          </div>
          <div>
            <p class="font-bold text-sm text-slate-900">${s.name}</p>
            <p class="text-[10px] text-slate-400 font-bold">${s.department} | PRN: ${s.prn}</p>
          </div>
        </div>
        <button onclick="viewStudentHistory('${s.id}')" class="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-lg transition-all">
          <i data-lucide="history" size="16"></i>
        </button>
      </div>
    `).join('');
    lucide.createIcons();
  }

  searchInput.oninput = filterDirectory;
  deptFilter.onchange = filterDirectory;
}

// --- Rendering ---
function render() {
  const t = LANGUAGES[state.lang];
  
  if (!state.currentUser) {
    renderLogin();
  } else {
    renderDashboard();
  }
  
  lucide.createIcons();
}

function renderLogin() {
  const template = document.getElementById('login-template').content.cloneNode(true);
  app.innerHTML = '';
  app.appendChild(template);

  const form = document.getElementById('auth-form');
  const fields = document.getElementById('form-fields');
  const toggleBtn = document.getElementById('toggle-auth');
  const submitBtn = document.getElementById('submit-btn');
  const label = document.getElementById('form-type-label');
  const backBtn = document.getElementById('back-to-login');
  const forgotBtn = document.getElementById('forgot-password-btn');

  const t = LANGUAGES[state.lang];

  function updateFields() {
    fields.innerHTML = '';
    
    if (state.isRegistering) {
      fields.innerHTML += `
        <div class="relative group">
          <i data-lucide="user" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors"></i>
          <input required name="name" type="text" placeholder="${t.fullName}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-slate-900">
        </div>
      `;
      
      if (state.currentRole === 'Student') {
        const nextPrn = getNextPrn();
        fields.innerHTML += `
          <div class="relative group">
            <i data-lucide="hash" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors"></i>
            <input required name="prn" type="text" value="${nextPrn}" readonly placeholder="${t.prn}" class="w-full bg-slate-100 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none transition-all text-slate-500 cursor-not-allowed">
          </div>
          <div class="relative group">
            <i data-lucide="layers" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors"></i>
            <select name="division" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all appearance-none text-slate-900">
              <option value="A">Class A</option>
              <option value="B">Class B</option>
            </select>
          </div>
        `;
      }

      fields.innerHTML += `
        <div class="relative group">
          <i data-lucide="graduation-cap" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors"></i>
          <select name="department" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all appearance-none text-slate-900">
            ${DEPARTMENTS.map(d => `<option value="${d}">${d}</option>`).join('')}
          </select>
        </div>
      `;

      if (state.currentRole === 'Teacher') {
        fields.innerHTML += `
          <div class="relative group">
            <i data-lucide="book" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors"></i>
            <input required name="classSubject" type="text" placeholder="${t.classSubject}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-slate-900">
          </div>
        `;
      }
    }

    fields.innerHTML += `
      <div class="relative group">
        <i data-lucide="mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors"></i>
        <input required name="email" type="email" placeholder="${t.email}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-slate-900">
      </div>
      <div class="relative group">
        <i data-lucide="lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors"></i>
        <input required name="password" id="password-input" type="password" placeholder="${t.password}" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-slate-900">
        <button type="button" id="toggle-password-visibility" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors">
          <i data-lucide="eye" id="eye-icon"></i>
        </button>
      </div>
    `;
    
    lucide.createIcons();

    const togglePasswordBtn = document.getElementById('toggle-password-visibility');
    const passwordInput = document.getElementById('password-input');
    const eyeIcon = document.getElementById('eye-icon');

    if (togglePasswordBtn && passwordInput && eyeIcon) {
      togglePasswordBtn.onclick = () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        lucide.createIcons();
      };
    }
  }

  updateFields();

  form.onsubmit = state.isRegistering ? handleRegister : handleLogin;

  toggleBtn.onclick = () => {
    state.isRegistering = !state.isRegistering;
    label.textContent = state.isRegistering ? t.register : t.login;
    submitBtn.textContent = state.isRegistering ? t.register : t.login;
    toggleBtn.textContent = state.isRegistering ? t.alreadyHaveAccount : t.dontHaveAccount;
    updateFields();
  };

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.onclick = () => {
      state.currentRole = btn.dataset.role;
      document.querySelectorAll('.role-btn').forEach(b => {
        b.classList.remove('bg-rose-600', 'text-white', 'shadow-lg', 'shadow-rose-500/30');
        b.classList.add('text-slate-400', 'hover:text-slate-200');
      });
      btn.classList.add('bg-rose-600', 'text-white', 'shadow-lg', 'shadow-rose-500/30');
      btn.classList.remove('text-slate-400', 'hover:text-slate-200');
      updateFields();
    };
  });

  document.getElementById('reset-data-btn').onclick = () => {
    if (confirm('This will clear all attendance records and users. Continue?')) {
      localStorage.clear();
      location.reload();
    }
  };
}

function renderDashboard() {
  const template = document.getElementById('dashboard-template').content.cloneNode(true);
  app.innerHTML = '';
  app.appendChild(template);

  const t = LANGUAGES[state.lang];
  const user = state.currentUser;

  // Header Info
  document.getElementById('header-title').textContent = t[`${user.role.toLowerCase()}Dashboard`];
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-role').textContent = t[user.role.toLowerCase()];
  
  // Home Button
  document.getElementById('home-btn').onclick = () => {
    state.currentView = 'dashboard';
    render();
  };

  const profileInfo = document.getElementById('profile-info');
  profileInfo.innerHTML = `
    <div class="flex items-center justify-between text-xs">
      <span class="text-slate-400 font-bold uppercase tracking-widest">${t.email}</span>
      <span class="text-slate-900 font-medium">${user.email}</span>
    </div>
    ${user.prn ? `
    <div class="flex items-center justify-between text-xs">
      <span class="text-slate-400 font-bold uppercase tracking-widest">${t.prn}</span>
      <span class="text-slate-900 font-medium">${user.prn}</span>
    </div>` : ''}
    <div class="flex items-center justify-between text-xs">
      <span class="text-slate-400 font-bold uppercase tracking-widest">${t.department}</span>
      <span class="text-slate-900 font-medium">${user.department || 'N/A'}</span>
    </div>
    ${user.classSubject ? `
    <div class="flex items-center justify-between text-xs">
      <span class="text-slate-400 font-bold uppercase tracking-widest">${t.classSubject}</span>
      <span class="text-slate-900 font-medium">${user.classSubject}</span>
    </div>` : ''}
    ${user.role === 'Teacher' ? `
    <div class="pt-2 mt-2 border-t border-slate-100 flex flex-col gap-2">
       <button id="edit-subject-btn" class="text-[10px] text-rose-500 font-bold uppercase tracking-widest hover:underline text-left">
         ${user.classSubject ? 'Update Subject' : 'Set Subject'}
       </button>
    </div>` : ''}
  `;

  // Notice Badge
  if (state.notices.length > 0) {
    document.getElementById('notice-badge').classList.remove('hidden');
  }

  // Event Listeners
  document.getElementById('profile-toggle').onclick = (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
  };

  if (document.getElementById('edit-subject-btn')) {
    document.getElementById('edit-subject-btn').onclick = () => {
      openModal('Update Subject', `
        <form id="update-subject-form" class="space-y-4">
          <input required name="subject" type="text" value="${user.classSubject || ''}" placeholder="Subject Name" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-900">
          <button type="submit" class="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold">Save Subject</button>
        </form>
      `);
      document.getElementById('update-subject-form').onsubmit = (e) => {
        e.preventDefault();
        user.classSubject = e.target.subject.value;
        saveState();
        closeModal();
        render();
        showToast('Subject updated successfully!');
      };
    };
  }

  const subjectInput = document.getElementById('subject-input');
  if (subjectInput) {
    if (user.role === 'Teacher' && user.classSubject) {
      subjectInput.value = user.classSubject;
      subjectInput.disabled = true;
      state.currentSubject = user.classSubject;
    } else {
      subjectInput.oninput = (e) => {
        state.currentSubject = e.target.value || 'General';
      };
    }
  }

  window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('profile-dropdown');
    const toggle = document.getElementById('profile-toggle');
    if (dropdown && !dropdown.classList.contains('hidden') && !dropdown.contains(e.target) && !toggle.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  document.getElementById('logout-btn').onclick = () => {
    state.currentUser = null;
    saveState();
    render();
  };

  document.getElementById('lang-toggle').onclick = () => {
    state.lang = state.lang === 'en' ? 'mr' : 'en';
    render();
  };

  document.getElementById('theme-toggle').onclick = () => {
    state.isDarkMode = !state.isDarkMode;
    document.body.classList.toggle('light', !state.isDarkMode);
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    icon.setAttribute('data-lucide', state.isDarkMode ? 'sun' : 'moon');
    label.textContent = state.isDarkMode ? 'Light' : 'Dark';
    lucide.createIcons();
  };

  document.getElementById('notices-btn').onclick = () => {
    const noticesHtml = state.notices.length > 0 
      ? state.notices.map(n => `
          <div class="p-4 bg-rose-50 rounded-2xl border border-rose-100 mb-3">
            <div class="flex justify-between items-start mb-2">
              <p class="text-xs font-bold text-rose-600">From: ${n.fromName}</p>
              <p class="text-[10px] text-slate-400">${n.date}</p>
            </div>
            <p class="text-sm text-slate-700">${n.message}</p>
          </div>
        `).join('')
      : `<p class="text-center text-slate-400 py-8 italic">${t.noNotices}</p>`;
    
    openModal(t.notices, `<div class="max-h-96 overflow-y-auto pr-2 custom-scrollbar">${noticesHtml}</div>`);
    document.getElementById('notice-badge').classList.add('hidden');
  };

  document.getElementById('profile-complaints-btn').onclick = () => {
    const filteredComplaints = state.complaints.filter(c => {
      if (c.fromId === user.id) return true;
      if (user.role === 'HOD') return true;
      if (user.role === 'Teacher') return c.targetRole === 'Teacher';
      return false;
    });

    const complaintsHtml = `
      <div class="space-y-6">
        <div class="max-h-60 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          ${filteredComplaints.length > 0 ? filteredComplaints.map(c => `
            <div class="p-4 bg-rose-50 rounded-2xl border border-rose-100">
              <div class="flex justify-between items-start mb-2">
                <p class="text-xs font-bold text-rose-600">${c.fromName} (${c.fromRole})</p>
                <p class="text-[10px] text-slate-400">${c.date}</p>
              </div>
              <p class="text-sm text-slate-700">${c.message}</p>
            </div>
          `).join('') : `<p class="text-center text-slate-400 py-4 italic">${t.noComplaints}</p>`}
        </div>
        <div class="space-y-3 pt-4 border-t border-rose-100">
          <textarea id="complaint-msg" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 h-24 focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-slate-900" placeholder="${t.writeComplaint}"></textarea>
          <button id="send-complaint-btn" class="w-full bg-rose-600 hover:bg-rose-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg shadow-rose-200">
            <i data-lucide="send" size="18"></i> ${t.send}
          </button>
          <p class="text-[10px] text-center text-slate-400">${user.role === 'Student' ? t.allTeachers : t.hodOnly}</p>
        </div>
      </div>
    `;

    openModal(t.complaints, complaintsHtml);
    
    document.getElementById('send-complaint-btn').onclick = () => {
      const msg = document.getElementById('complaint-msg').value;
      if (msg.trim()) {
        sendComplaint(msg.trim());
        closeModal();
      }
    };
  };

  document.getElementById('profile-contact-btn').onclick = () => {
    openModal(t.contactInfo, `
      <div class="space-y-6">
        <div class="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100">
          <div class="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-600">
            <i data-lucide="phone" size="24"></i>
          </div>
          <div>
            <p class="font-bold text-slate-900">${t.adminContact}</p>
            <p class="text-xs text-slate-400 font-medium">Available 9 AM - 6 PM</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <div class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
            <i data-lucide="globe" size="24"></i>
          </div>
          <div>
            <p class="font-bold text-slate-900">${t.supportEmail}</p>
            <p class="text-xs text-slate-400 font-medium">24/7 Email Support</p>
          </div>
        </div>
      </div>
    `);
  };

  // Dashboard Content
  const content = document.getElementById('dashboard-content');
  if (user.role === 'Student') {
    renderStudentDashboard(content, t);
  } else if (user.role === 'Teacher') {
    if (state.currentView === 'attendance') {
      renderAttendancePage(content, t);
    } else {
      renderTeacherDashboard(content, t);
    }
  } else if (user.role === 'HOD') {
    renderHODDashboard(content, t);
  }
}

function renderStudentDashboard(container, t) {
  const user = state.currentUser;
  const userAttendance = state.attendance.filter(a => a.studentId === user.id);
  const presentCount = userAttendance.filter(a => a.status === 'Present').length;
  const percentage = userAttendance.length > 0 ? Math.round((presentCount / userAttendance.length) * 100) : 0;

  container.innerHTML = `
    <div class="animate-slide-up space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-card p-8 flex flex-col items-center justify-center text-center group">
          <div class="relative w-32 h-32 mb-4">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-white/5" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-rose-500 transition-all duration-1000" stroke-dasharray="364.4" stroke-dashoffset="${364.4 - (364.4 * percentage) / 100}" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold">${percentage}%</span>
              <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Attendance</span>
            </div>
          </div>
          <p class="text-sm text-slate-400 font-medium">Keep it up! Minimum 75% required.</p>
        </div>

        <div class="md:col-span-2 glass-card p-8">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xl font-bold flex items-center gap-3">
              <i data-lucide="history" class="text-rose-500"></i>
              Recent History
            </h3>
          </div>
          <div class="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            ${userAttendance.length > 0 ? userAttendance.map(a => `
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center ${a.status === 'Present' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}">
                    <i data-lucide="${a.status === 'Present' ? 'check' : 'x'}"></i>
                  </div>
                  <div>
                    <p class="font-bold text-sm">${a.subject}</p>
                    <p class="text-[10px] text-slate-400 font-medium">${a.date}</p>
                  </div>
                </div>
                <span class="text-xs font-bold px-3 py-1 rounded-full ${a.status === 'Present' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}">${a.status}</span>
              </div>
            `).join('') : `<p class="text-center text-slate-500 py-8 italic">No attendance records yet.</p>`}
          </div>
        </div>
      </div>

      <div class="glass-card p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between cursor-pointer hover:bg-white/5 transition-all group mt-6 border-indigo-500/20 hover:border-indigo-500/40 shadow-lg shadow-indigo-500/10" id="student-material-btn">
        <div class="flex items-center gap-6 mb-6 sm:mb-0 w-full sm:w-auto">
          <div class="w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform flex-shrink-0">
            <i data-lucide="book-open" size="40"></i>
          </div>
          <div>
            <h3 class="font-black text-2xl sm:text-3xl text-white tracking-tight mb-2">${t.studyMaterial || 'Study Material'}</h3>
            <p class="text-sm text-slate-400 font-medium">Access handnotes, syllabus, and PYQs</p>
          </div>
        </div>
        <div class="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
          Browse <i data-lucide="chevron-right"></i>
        </div>
      </div>
    </div>
  `;

  const materialBtn = document.getElementById('student-material-btn');
  if (materialBtn) materialBtn.onclick = () => openStudyMaterialModal();
}

function renderTeacherDashboard(container, t) {
  const user = state.currentUser;
  const students = state.users.filter(u => u.role === 'Student' && u.department === user.department);
  
  container.innerHTML = `
    <div class="animate-slide-up space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div id="total-students-card" class="glass-card p-6 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-all group">
          <div class="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
            <i data-lucide="users" size="32"></i>
          </div>
          <div>
            <p class="text-3xl font-bold">${students.length}</p>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">${t.totalStudents}</p>
          </div>
        </div>
        
        <div class="md:col-span-2 glass-card p-6 flex items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="font-bold mb-2">Quick Actions</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button id="add-student-btn" class="bg-rose-600 hover:bg-rose-500 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 text-white">
                <i data-lucide="user-plus" size="16"></i> <span class="hidden sm:inline">${t.addStudent}</span><span class="sm:hidden">Add</span>
              </button>
              <button id="export-csv-btn" class="bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all text-white">
                <i data-lucide="download" size="16"></i> <span class="hidden sm:inline">${t.exportData}</span><span class="sm:hidden">Export</span>
              </button>
              <button id="study-material-btn" class="col-span-2 sm:col-span-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 text-white">
                <i data-lucide="book-open" size="16"></i> ${t.materials || 'Materials'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6">
        <div class="w-24 h-24 bg-rose-500/10 rounded-[2.5rem] flex items-center justify-center text-rose-500 mb-2">
          <i data-lucide="clipboard-check" size="48"></i>
        </div>
        <div>
          <h3 class="text-3xl font-black tracking-tighter mb-2">Attendance Hub</h3>
          <p class="text-slate-400 max-w-md mx-auto">Select a division to start marking attendance or review today's records.</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <button id="manage-attendance-btn" class="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-5 rounded-[2rem] font-bold text-lg shadow-2xl shadow-rose-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
            <i data-lucide="layout-dashboard"></i>
            Manage Attendance
          </button>
          <button id="dial-pad-btn-main" class="flex-1 bg-amber-500 hover:bg-amber-400 text-white py-5 rounded-[2rem] font-bold text-lg shadow-2xl shadow-amber-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
            <i data-lucide="keypad"></i>
            Quick Dial Pad
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="glass-card p-8">
          <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
            <i data-lucide="megaphone" class="text-rose-500"></i>
            Broadcast Notice
          </h3>
          <div class="space-y-4">
            <textarea id="notice-msg" class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm" placeholder="Type your message to all students..."></textarea>
            <button id="send-notice-btn" class="w-full bg-rose-600 hover:bg-rose-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20">
              <i data-lucide="send"></i>
              Broadcast to Department
            </button>
          </div>
        </div>

        <div class="glass-card p-8">
          <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
            <i data-lucide="clock" class="text-amber-500"></i>
            Recent Attendance
          </h3>
          <div class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            ${state.attendance.filter(a => state.users.find(u => u.id === a.studentId)?.department === user.department).slice(0, 10).map(a => `
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${a.status === 'Present' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'} flex items-center justify-center font-bold text-sm">
                      ${a.studentName.charAt(0)}
                    </div>
                    <div>
                      <p class="font-bold text-sm text-white">${a.studentName}</p>
                      <p class="text-[10px] text-slate-500 font-medium">${a.subject} | Class ${a.division}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="${a.status === 'Present' ? 'text-emerald-400' : 'text-rose-400'} font-black text-[10px] uppercase tracking-widest">${a.status}</span>
                    <button onclick="deleteAttendance('${a.id}')" class="p-2 hover:bg-rose-500/20 rounded-xl text-rose-500 transition-all">
                      <i data-lucide="trash-2" size="14"></i>
                    </button>
                  </div>
                </div>
            `).join('') || `<p class="text-center text-slate-500 py-12 italic">No recent activity.</p>`}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('manage-attendance-btn').onclick = () => {
    state.currentView = 'attendance';
    render();
  };

  document.getElementById('dial-pad-btn-main').onclick = () => {
    openDivisionSelection();
  };

  document.getElementById('total-students-card').onclick = () => {
    const studentListHtml = `
      <div class="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        ${students.map(s => `
          <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                ${s.name.charAt(0)}
              </div>
              <div>
                <p class="font-bold text-slate-900">${s.name}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Roll No: ${s.prn}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dept</p>
              <p class="text-xs font-medium text-slate-700">${s.department}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    openModal('Student Directory', studentListHtml);
  };

  document.getElementById('add-student-btn').onclick = () => {
    const nextPrn = getNextPrn();
    openModal('Add New Student', `
      <form id="add-student-form" class="space-y-4">
        <input required name="name" type="text" placeholder="Full Name" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-900">
        <input required name="email" type="email" placeholder="Email Address" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-900">
        <input required name="password" type="password" placeholder="Set Password" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-900">
        <input required name="prn" type="text" value="${nextPrn}" readonly placeholder="Roll No" class="w-full bg-slate-100 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-500 cursor-not-allowed">
        <div class="grid grid-cols-2 gap-4">
          <select name="department" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-900">
            ${DEPARTMENTS.map(d => `<option value="${d}" ${d === user.department ? 'selected' : ''}>${d}</option>`).join('')}
          </select>
          <select name="division" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-900">
            <option value="A" ${state.currentDivision === 'A' ? 'selected' : ''}>Class A</option>
            <option value="B" ${state.currentDivision === 'B' ? 'selected' : ''}>Class B</option>
          </select>
        </div>
        <button type="submit" class="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold">Add Student</button>
      </form>
    `);

    document.getElementById('add-student-form').onsubmit = (e) => {
      e.preventDefault();
      const newUser = {
        id: Date.now().toString(),
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: 'Student',
        prn: e.target.prn.value,
        department: e.target.department.value,
        division: e.target.division.value,
        contact: '',
        address: '',
        classSubject: ''
      };
      state.users.push(newUser);
      saveState();
      closeModal();
      showToast('Student added successfully');
      render();
    };
  };

  document.getElementById('export-csv-btn').onclick = () => {
    const headers = ['Date', 'Roll No', 'Student Name', 'Subject', 'Status'];
    const rows = state.attendance.map(rec => [
      `"${rec.date}"`, 
      `"${rec.prn}"`, 
      `"${rec.studentName.replace(/"/g, '""')}"`, 
      `"${rec.subject.replace(/"/g, '""')}"`, 
      `"${rec.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  document.getElementById('send-notice-btn').onclick = () => {
    const msg = document.getElementById('notice-msg').value;
    if (msg.trim()) {
      sendNotice(msg.trim());
      document.getElementById('notice-msg').value = '';
    }
  };

  const materialBtn = document.getElementById('study-material-btn');
  if (materialBtn) materialBtn.onclick = () => openStudyMaterialModal();

  lucide.createIcons();
}

function openDivisionSelection() {
  openModal('Select Division', `
    <div class="grid grid-cols-2 gap-4">
      <button onclick="openDialPad('A')" class="p-8 bg-rose-50 hover:bg-rose-100 rounded-3xl border border-rose-100 text-2xl font-black text-rose-600 transition-all">Class A</button>
      <button onclick="openDialPad('B')" class="p-8 bg-amber-50 hover:bg-amber-100 rounded-3xl border border-amber-100 text-2xl font-black text-amber-600 transition-all">Class B</button>
    </div>
  `);
}

  window.openDialPad = (div) => {
  state.currentDivision = div;
  closeModal();
  
  const user = state.currentUser;
  const students = state.users.filter(u => u.role === 'Student' && u.department === user.department);
  let currentPrn = '';
  const subject = (user.role === 'Teacher' && user.classSubject) ? user.classSubject : (state.currentSubject || 'General');

  const dialPadHtml = `
    <div class="space-y-4">
      <div class="bg-slate-900 rounded-2xl p-4 text-center transition-colors">
        <p class="text-slate-500 text-[8px] font-bold uppercase tracking-[0.3em] mb-1">Class ${div} | Roll No</p>
        <div id="dial-display" class="text-2xl font-black tracking-widest text-white h-8 flex items-center justify-center"></div>
      </div>

      <div class="flex justify-end -mb-1">
        <button data-key="Clear" class="dial-key px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[8px] font-bold text-slate-500 uppercase tracking-widest transition-all">Clear</button>
      </div>

      <div class="grid grid-cols-3 gap-2">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Back', 0, 'Mark'].map(key => `
          <button data-key="${key}" class="dial-key aspect-square min-h-[40px] rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 text-base font-bold text-slate-700 hover:text-rose-600 transition-all active:scale-90 flex items-center justify-center">
            ${key === 'Back' ? '<i data-lucide="delete" size="16"></i>' : (key === 'Mark' ? '<span class="text-[10px] uppercase">Present</span>' : key)}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  openModal('Attendance Dial Pad', dialPadHtml);
  
  // Adjust modal for dial pad size - make it small
  const modalContent = document.querySelector('#modal-content > div');
  if (modalContent) {
    modalContent.classList.add('max-w-[280px]', 'mx-auto');
  }
  
  const display = document.getElementById('dial-display');
  const updateDisplay = () => {
    display.textContent = currentPrn || '----';
  };
  updateDisplay();

  const handleMark = (status) => {
    if (!currentPrn) {
      showToast('Please enter a Roll No', 'error');
      return;
    }
    const student = students.find(s => s.prn === currentPrn);
    if (student) {
      markAttendance(student.id, subject, status);
      currentPrn = '';
    } else {
      showToast('Student not found with this Roll No', 'error');
    }
  };

  document.querySelectorAll('.dial-key').forEach(btn => {
    btn.onclick = () => {
      const key = btn.dataset.key;
      if (key === 'Clear') {
        currentPrn = '';
      } else if (key === 'Back') {
        currentPrn = currentPrn.slice(0, -1);
      } else if (key === 'Mark') {
        handleMark('Present');
        return;
      } else if (currentPrn.length < 10) {
        currentPrn += key;
      }
      updateDisplay();
    };
  });

  lucide.createIcons();
};

function viewStudentDirectory() {
  const students = state.users.filter(u => u.role === 'Student');
  const studentListHtml = `
    <div class="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      ${students.map(s => `
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
              ${s.name.charAt(0)}
            </div>
            <div>
              <p class="font-bold text-slate-900">${s.name}</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Roll No: ${s.prn}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dept</p>
            <p class="text-xs font-medium text-slate-700">${s.department}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('Student Directory', studentListHtml);
}

function renderAttendancePage(container, t) {
  const user = state.currentUser;
  const students = state.users.filter(u => 
    u.role === 'Student' && 
    u.department === user.department &&
    (u.division === state.currentDivision || !u.division)
  );
  const today = new Date().toLocaleDateString();
  
  const todayAttendance = state.attendance.filter(a => 
    a.date === today && 
    a.subject === state.currentSubject &&
    a.division === state.currentDivision
  );

  const presentToday = todayAttendance.filter(a => a.status === 'Present').length;
  const absentToday = todayAttendance.filter(a => a.status === 'Absent').length;

  container.innerHTML = `
    <div class="animate-slide-up space-y-8">
      <div class="flex items-center justify-between">
        <button id="back-to-dash" class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]">
          <i data-lucide="arrow-left" size="16"></i>
          Back to Dashboard
        </button>
        <div class="flex items-center gap-4">
          <div class="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button data-div="A" class="div-btn px-4 py-2 rounded-lg text-xs font-bold transition-all ${state.currentDivision === 'A' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' : 'text-slate-400 hover:text-white'}">Class A</button>
            <button data-div="B" class="div-btn px-4 py-2 rounded-lg text-xs font-bold transition-all ${state.currentDivision === 'B' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' : 'text-slate-400 hover:text-white'}">Class B</button>
          </div>
          <input id="subject-input" type="text" value="${state.currentSubject}" placeholder="Subject Name" class="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-white w-40">
          <button id="dial-pad-btn" class="bg-amber-500 hover:bg-amber-400 px-6 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all text-white shadow-lg shadow-amber-500/20">
            <i data-lucide="keypad" size="16"></i> Dial Pad
          </button>
          <button id="mark-all-present-btn" class="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all text-white shadow-lg shadow-emerald-500/20">
            <i data-lucide="check-check" size="16"></i> Mark All Present
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${students.map(s => {
              const record = state.attendance.find(a => a.studentId === s.id && a.date === today && a.subject === state.currentSubject && a.division === state.currentDivision);
              const isMarked = !!record;

              return `
              <div class="p-4 bg-white/5 rounded-2xl border ${isMarked ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5'} hover:border-rose-500/30 transition-all group relative overflow-hidden">
                ${isMarked ? `
                  <div class="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-black uppercase px-2 py-1 rounded-bl-lg tracking-widest animate-fade-in">
                    ${record.status}
                  </div>
                ` : ''}
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${isMarked ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} flex items-center justify-center font-bold text-sm transition-colors">
                      ${s.name.charAt(0)}
                    </div>
                    <div>
                      <p class="font-black text-sm truncate w-32 ${isMarked ? (record.status === 'Present' ? 'text-emerald-600' : 'text-rose-600') : 'text-white'}">${s.name}</p>
                      <p class="text-[10px] ${isMarked ? (record.status === 'Present' ? 'text-emerald-500/80' : 'text-rose-500/80') : 'text-slate-400'} font-bold">Roll No: ${s.prn}</p>
                    </div>
                  </div>
                  <button onclick="viewStudentHistory('${s.id}')" class="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-rose-400" title="View History">
                    <i data-lucide="history" size="16"></i>
                  </button>
                </div>
                <div class="grid grid-cols-1">
                  <button onclick="markAttendance('${s.id}', '${state.currentSubject}', 'Present')" 
                    class="py-2 rounded-lg ${isMarked && record.status === 'Present' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/10 text-emerald-400'} text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                    Mark Present
                  </button>
                </div>
              </div>
            `;}).join('')}
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white/5 rounded-3xl p-6 border border-white/10">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Today's Summary</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-300">Present</span>
                <span class="text-lg font-bold text-emerald-400">${presentToday}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-300">Absent</span>
                <span class="text-lg font-bold text-rose-400">${absentToday}</span>
              </div>
              <div class="pt-4 border-t border-white/5">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-slate-300">Total Marked</span>
                  <span class="text-lg font-bold text-white">${todayAttendance.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white/5 rounded-3xl p-6 border border-white/10">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Marks</h4>
            <div class="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              ${todayAttendance.slice(0, 10).map(a => `
                <div class="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                  <div class="flex flex-col">
                    <span class="text-xs text-white font-bold truncate w-24">${a.studentName}</span>
                    <span class="text-[9px] text-slate-500 font-medium">Roll: ${a.prn}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="${a.status === 'Present' ? 'text-emerald-400' : 'text-rose-400'} font-black text-[10px] uppercase tracking-widest">${a.status}</span>
                    <button onclick="deleteAttendance('${a.id}')" class="p-1.5 hover:bg-rose-500/20 rounded-lg text-rose-500 transition-all" title="Delete Record">
                      <i data-lucide="trash-2" size="14"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
              ${todayAttendance.length === 0 ? '<p class="text-[10px] text-slate-500 italic text-center py-4">No records for this session.</p>' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('back-to-dash').onclick = () => {
    state.currentView = 'dashboard';
    render();
  };

  document.getElementById('dial-pad-btn').onclick = () => {
    openDivisionSelection();
  };

  document.querySelectorAll('.div-btn').forEach(btn => {
    btn.onclick = () => {
      state.currentDivision = btn.dataset.div;
      render();
    };
  });

  const subjectInput = document.getElementById('subject-input');
  subjectInput.onchange = (e) => {
    state.currentSubject = e.target.value;
    render();
  };

  document.getElementById('mark-all-present-btn').onclick = () => {
    students.forEach(s => {
      const existing = state.attendance.find(a => a.studentId === s.id && a.date === today && a.subject === state.currentSubject && a.division === state.currentDivision);
      if (!existing) {
        markAttendance(s.id, state.currentSubject, 'Present');
      }
    });
    showToast('All students marked present');
  };

  lucide.createIcons();
}

function viewTeacherDirectory() {
  const teachers = state.users.filter(u => u.role === 'Teacher');
  const teacherListHtml = `
    <div class="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      ${teachers.map(t => `
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              ${t.name.charAt(0)}
            </div>
            <div>
              <p class="font-bold text-slate-900">${t.name}</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${t.classSubject || 'No Subject'}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dept</p>
            <p class="text-xs font-medium text-slate-700">${t.department}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('Teacher Directory', teacherListHtml);
}

function renderHODDashboard(container, t) {
  const teachers = state.users.filter(u => u.role === 'Teacher');
  const students = state.users.filter(u => u.role === 'Student');
  const today = new Date().toLocaleDateString();
  const totalStudentsCount = students.length;
  const deptMaterials = state.materials.filter(m => m.department === state.currentUser.department);
  
  // Unique subjects from teachers
  const subjects = [...new Set(teachers.map(t => t.classSubject).filter(Boolean))];
  
  container.innerHTML = `
    <div class="animate-slide-up space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <button onclick="viewTeacherDirectory()" class="glass-card p-6 flex items-center gap-4 hover:bg-white/5 transition-all group text-left">
          <div class="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform flex-shrink-0">
            <i data-lucide="users" size="28"></i>
          </div>
          <div>
            <p class="text-2xl font-bold">${teachers.length}</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Teachers</p>
          </div>
        </button>
        <button onclick="viewStudentDirectory()" class="glass-card p-6 flex items-center gap-4 hover:bg-white/5 transition-all group text-left">
          <div class="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform flex-shrink-0">
            <i data-lucide="graduation-cap" size="28"></i>
          </div>
          <div>
            <p class="text-2xl font-bold">${students.length}</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Students</p>
          </div>
        </button>
        <div class="glass-card p-6 flex items-center gap-4">
          <div class="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 flex-shrink-0">
            <i data-lucide="alert-circle" size="28"></i>
          </div>
          <div>
            <p class="text-2xl font-bold">${state.complaints.length}</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Complaints</p>
          </div>
        </div>
        <div id="hod-material-btn" class="glass-card p-6 flex items-center gap-4 hover:bg-white/5 transition-all group cursor-pointer text-left">
          <div class="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform flex-shrink-0">
            <i data-lucide="book-open" size="28"></i>
          </div>
          <div>
            <p class="text-2xl font-bold">${deptMaterials.length}</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${t.materials || 'Materials'}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="glass-card p-8">
          <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
            <i data-lucide="shield-alert" class="text-rose-500"></i>
            Recent Complaints
          </h3>
          <div class="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            ${state.complaints.length > 0 ? state.complaints.map(c => `
              <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div class="flex justify-between items-start mb-2">
                  <p class="text-xs font-bold text-rose-500">${c.fromName} (${c.fromRole})</p>
                  <p class="text-[10px] text-slate-400">${c.date}</p>
                </div>
                <p class="text-sm text-slate-300">${c.message}</p>
              </div>
            `).join('') : `<p class="text-center text-slate-500 py-8 italic">No complaints to review.</p>`}
          </div>
        </div>

        <div class="glass-card p-8">
          <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
            <i data-lucide="activity" class="text-amber-500"></i>
            Subject Attendance Overview
          </h3>
          <div class="space-y-6">
            ${subjects.length > 0 ? subjects.map(subj => {
              const subjectAttendance = state.attendance.filter(a => a.subject === subj && a.date === today);
              const presentCount = subjectAttendance.filter(a => a.status === 'Present').length;
              const percentage = totalStudentsCount > 0 ? Math.round((presentCount / totalStudentsCount) * 100) : 0;
              
              return `
                <div class="space-y-2">
                  <div class="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span class="text-slate-400">${subj}</span>
                    <span class="text-rose-500">${percentage}% (${presentCount}/${totalStudentsCount})</span>
                  </div>
                  <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-1000" style="width: ${percentage}%"></div>
                  </div>
                </div>
              `;
            }).join('') : `<p class="text-center text-slate-500 py-8 italic">No subjects active today.</p>`}
          </div>
        </div>

        <div class="glass-card p-8">
          <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
            <i data-lucide="log-in" class="text-emerald-500"></i>
            Teacher Logins Today
          </h3>
          <div class="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            ${teachers.length > 0 ? teachers.map(tch => {
              const loggedInToday = tch.lastLogin === today;
              return `
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${loggedInToday ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'} flex items-center justify-center font-bold">
                      ${tch.name.charAt(0)}
                    </div>
                    <div>
                      <p class="font-bold text-sm text-white">${tch.name}</p>
                      <p class="text-[10px] text-slate-400 font-medium">${tch.classSubject || 'No Subject'}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    ${loggedInToday ? `
                      <span class="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Online</span>
                      <p class="text-[10px] text-slate-400 mt-1">${tch.lastLoginTime}</p>
                    ` : `
                      <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Offline</span>
                    `}
                  </div>
                </div>
              `;
            }).join('') : `<p class="text-center text-slate-500 py-8 italic">No teachers found.</p>`}
          </div>
        </div>
      </div>
    </div>
  `;

  const hodMaterialBtn = document.getElementById('hod-material-btn');
  if (hodMaterialBtn) hodMaterialBtn.onclick = () => openStudyMaterialModal();
  
  lucide.createIcons();
}

function deleteAttendance(id) {
  state.attendance = state.attendance.filter(a => a.id !== id);
  saveState();
  render();
  showToast('Record deleted');
}

// --- Study Material Logic ---
window.currentMaterialTab = 'handnotes';

window.openStudyMaterialModal = () => {
  const t = LANGUAGES[state.lang];
  window.currentMaterialTab = 'handnotes';
  
  const modalHtml = `
    <div class="space-y-4">
      <div class="flex gap-2 border-b border-slate-100 pb-2">
        <button onclick="switchMaterialTab('handnotes')" id="tab-handnotes" class="px-4 py-2 text-sm font-bold rounded-lg transition-all bg-rose-50 text-rose-600">${t.handnotes || 'Handnotes'}</button>
        <button onclick="switchMaterialTab('syllabus')" id="tab-syllabus" class="px-4 py-2 text-sm font-bold rounded-lg transition-all text-slate-400 hover:bg-slate-50">${t.syllabus || 'Syllabus'}</button>
        <button onclick="switchMaterialTab('pyqs')" id="tab-pyqs" class="px-4 py-2 text-sm font-bold rounded-lg transition-all text-slate-400 hover:bg-slate-50">${t.pyqs || 'PYQs'}</button>
      </div>
      <div id="material-content-container" class="space-y-4"></div>
    </div>
  `;
  
  openModal(t.studyMaterial || 'Study Material', modalHtml);
  renderMaterialContent();
};

window.switchMaterialTab = (tab) => {
  window.currentMaterialTab = tab;
  
  ['handnotes', 'syllabus', 'pyqs'].forEach(type => {
    const btn = document.getElementById(`tab-${type}`);
    if(btn) {
      if (type === tab) {
        btn.className = 'px-4 py-2 text-sm font-bold rounded-lg transition-all bg-rose-50 text-rose-600';
      } else {
        btn.className = 'px-4 py-2 text-sm font-bold rounded-lg transition-all text-slate-400 hover:bg-slate-50';
      }
    }
  });
  
  renderMaterialContent();
};

window.renderMaterialContent = () => {
  const container = document.getElementById('material-content-container');
  if (!container) return;
  
  const t = LANGUAGES[state.lang];
  const canUpload = state.currentUser.role === 'Teacher' || state.currentUser.role === 'HOD';
  const deptMaterials = state.materials.filter(m => 
    m.type === window.currentMaterialTab && 
    m.department === state.currentUser.department
  );

  let html = '';
  
  if (canUpload) {
    html += `
      <form id="upload-material-form" class="flex flex-col gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4 animate-fade-in">
        <input required type="text" id="mat-title" placeholder="${t.title || 'Title'}" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900">
        <input required type="url" id="mat-link" placeholder="${t.link || 'Link URL (e.g., Google Drive)'}" class="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900">
        <button type="submit" class="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-500/20">
          ${t.upload || 'Upload'}
        </button>
      </form>
    `;
  }

  html += `
    <div class="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
      ${deptMaterials.length > 0 ? deptMaterials.map(m => `
        <div class="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group animate-fade-in">
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 flex-shrink-0">
              <i data-lucide="file-text" size="18"></i>
            </div>
            <div class="overflow-hidden">
              <a href="${m.link}" target="_blank" class="font-bold text-sm text-slate-900 hover:text-indigo-600 truncate block">${m.title}</a>
              <p class="text-[10px] text-slate-400 font-medium">By ${m.authorName} • ${m.date}</p>
            </div>
          </div>
          ${(canUpload && m.authorId === state.currentUser.id) || state.currentUser.role === 'HOD' ? `
            <button onclick="deleteMaterial('${m.id}')" class="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors flex-shrink-0">
              <i data-lucide="trash-2" size="16"></i>
            </button>
          ` : `
            <a href="${m.link}" target="_blank" class="p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-500 rounded-lg transition-colors flex-shrink-0">
              <i data-lucide="external-link" size="16"></i>
            </a>
          `}
        </div>
      `).join('') : `<p class="text-center text-slate-400 py-6 italic">No materials found.</p>`}
    </div>
  `;

  container.innerHTML = html;
  lucide.createIcons();

  if (canUpload) {
    document.getElementById('upload-material-form').onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('mat-title').value;
      const link = document.getElementById('mat-link').value;
      
      const newMaterial = {
        id: Date.now().toString(),
        type: window.currentMaterialTab,
        title,
        link,
        department: state.currentUser.department,
        authorId: state.currentUser.id,
        authorName: state.currentUser.name,
        date: new Date().toLocaleDateString()
      };
      
      state.materials.unshift(newMaterial);
      saveState();
      showToast('Material uploaded successfully');
      renderMaterialContent();
    };
  }
};

window.deleteMaterial = (id) => {
  state.materials = state.materials.filter(m => m.id !== id);
  saveState();
  showToast('Material deleted');
  renderMaterialContent();
};

// --- Initialization ---
modalClose.onclick = closeModal;
modalBackdrop.onclick = closeModal;

// Initial Render
if (state.users.length === DEFAULT_USERS.length && !localStorage.getItem('attendoo_users')) {
  saveState();
}
render();

// Expose some functions to global scope for inline onclick handlers
window.markAttendance = markAttendance;
window.closeModal = closeModal;
window.viewStudentHistory = viewStudentHistory;
window.viewStudentDirectory = viewStudentDirectory;
window.viewTeacherDirectory = viewTeacherDirectory;
window.deleteAttendance = deleteAttendance;
