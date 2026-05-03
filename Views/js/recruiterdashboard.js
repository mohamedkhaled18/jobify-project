// ─── DATA ───────────────────────────────────────────────
const myPosts = [
  { icon:"💻", title:"Backend Developer",  type:"Full-time",  applicants:12, status:"active",   date:"Apr 20" },
  { icon:"📱", title:"Mobile Developer",   type:"Full-time",  applicants:7,  status:"active",   date:"Apr 15" },
  { icon:"🤖", title:"ML Engineer Intern", type:"Internship", applicants:18, status:"active",   date:"Apr 10" },
  { icon:"🎨", title:"UI/UX Designer",     type:"Part-time",  applicants:5,  status:"archived", date:"Mar 28" },
];

const chatSessions = [
  { id:1, initials:"AM", name:"Ahmed Mohamed",  job:"Backend Developer",  preview:"Can you tell me more about the tech stack?", time:"2h ago",   msgs:[
    {from:"them", text:"Hello, I applied for the Backend Developer role."},
    {from:"me",   text:"Hi Ahmed! Yes, we received your application."},
    {from:"them", text:"Can you tell me more about the tech stack?"},
    {from:"me",   text:"We use Node.js, PostgreSQL, and AWS."},
  ]},
  { id:2, initials:"NA", name:"Nour Ali",        job:"ML Engineer Intern", preview:"When will I hear back about my application?", time:"5h ago",   msgs:[
    {from:"them", text:"Hi, I'm Nour. I applied for ML Engineer Intern."},
    {from:"me",   text:"Hi Nour! We are reviewing applications now."},
    {from:"them", text:"When will I hear back about my application?"},
  ]},
  { id:3, initials:"KM", name:"Karim Mostafa",   job:"Mobile Developer",   preview:"I have 2 years Flutter experience.", time:"1d ago",    msgs:[
    {from:"them", text:"I have 2 years Flutter experience."},
    {from:"me",   text:"That's great! We'll be in touch."},
  ]},
  { id:4, initials:"LH", name:"Layla Hussain",   job:"Backend Developer",  preview:"My GPA is 3.8 and I know Django well.", time:"2d ago",    msgs:[
    {from:"them", text:"My GPA is 3.8 and I know Django well."},
    {from:"me",   text:"Impressive! Please send your CV."},
  ]},
  { id:5, initials:"MF", name:"Mohamed Fathy",   job:"UI/UX Designer",     preview:"I have a Figma portfolio ready.", time:"3d ago",    msgs:[
    {from:"them", text:"I have a Figma portfolio ready."},
  ]},
  { id:6, initials:"SR", name:"Sara Ramadan",     job:"ML Engineer Intern", preview:"I completed the ML Specialization on Coursera.", time:"4d ago",    msgs:[
    {from:"them", text:"I completed the ML Specialization on Coursera."},
    {from:"me",   text:"Excellent! We'll review your profile."},
  ]},
];

const students = [
  { id:1, initials:"AM", name:"Ahmed Mohamed",  gpa:"3.7", skills:"Python, Django, AWS",   job:"Backend Developer",  flagged:false },
  { id:2, initials:"NA", name:"Nour Ali",        gpa:"3.5", skills:"Python, TensorFlow",    job:"ML Engineer Intern", flagged:false },
  { id:3, initials:"KM", name:"Karim Mostafa",   gpa:"3.6", skills:"Flutter, Dart, Firebase",job:"Mobile Developer",   flagged:false },
  { id:4, initials:"LH", name:"Layla Hussain",   gpa:"3.8", skills:"Python, Django, SQL",   job:"Backend Developer",  flagged:true  },
  { id:5, initials:"MF", name:"Mohamed Fathy",   gpa:"3.2", skills:"Figma, Adobe XD",       job:"UI/UX Designer",     flagged:false },
  { id:6, initials:"SR", name:"Sara Ramadan",     gpa:"3.9", skills:"ML, NLP, Keras",        job:"ML Engineer Intern", flagged:true  },
];

let activeChatId = null;

// ─── SECTIONS ───────────────────────────────────────────
const sections = ['dashboard','profile','company','post','myjobs','chats','compare','flagged','inbox'];
const meta = {
  dashboard: ['Dashboard',          'Welcome back, Sara!'],
  profile:   ['My Profile',         'Manage your personal information'],
  company:   ['Company Info',       'Your company details'],
  post:      ['Post a Job',         'Publish a new job listing'],
  myjobs:    ['My Job Posts',       'Manage your listings'],
  chats:     ['Chat Sessions',      'All student conversations'],
  compare:   ['Compare & Select',   'Shortlist and accept candidates'],
  flagged:   ['Flagged Students',   'Your shortlisted candidates'],
  inbox:     ['Inbox',              'Messages & Notifications'],
};

function show(name) {
  sections.forEach(s => {
    const el = document.getElementById('sec-' + s);
    if (el) el.style.display = s === name ? '' : 'none';
  });
  // hide chat view when leaving chats
  const cv = document.getElementById('chat-view');
  if (name !== 'chats' && cv) cv.style.display = 'none';

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-title').textContent = meta[name]?.[0] || name;
  document.getElementById('page-sub').textContent   = meta[name]?.[1] || '';
}

// ─── RENDER POSTS ────────────────────────────────────────
function renderPostItem(p) {
  return `<div class="job-item">
    <div class="job-logo">${p.icon}</div>
    <div style="flex:1">
      <div class="job-title">${p.title}</div>
      <div class="job-meta">${p.type} · ${p.date}</div>
      <span class="tag type">${p.type}</span>
    </div>
    <div style="text-align:right">
      <span class="badge2 ${p.status === 'active' ? 'active' : 'archived'}">${p.status === 'active' ? 'Active' : 'Archived'}</span>
      <div style="font-size:11px;color:var(--muted);margin-top:3px">${p.applicants} applicants</div>
    </div>
  </div>`;
}

function renderPostsTable() {
  const tbody = document.getElementById('myjobs-table');
  if (!tbody) return;
  tbody.innerHTML = myPosts.map((p,i) => `<tr>
    <td><span style="font-weight:700">${p.icon} ${p.title}</span></td>
    <td><span class="tag type">${p.type}</span></td>
    <td>${p.applicants}</td>
    <td><span class="badge2 ${p.status === 'active' ? 'active' : 'archived'}">${p.status}</span></td>
    <td>${p.date}</td>
    <td>
      <button class="icon-btn" title="Edit"><i class="fas fa-edit"></i></button>
      <button class="icon-btn" title="Delete" style="color:#EF4444"><i class="fas fa-trash"></i></button>
    </td>
  </tr>`).join('');
}

// ─── RENDER CHATS ────────────────────────────────────────
function renderChats() {
  const full = document.getElementById('chats-full');
  if (!full) return;
  full.innerHTML = chatSessions.map(c => `
    <div class="chat-item" onclick="openChat(${c.id})">
      <div class="chat-avatar">${c.initials}</div>
      <div style="flex:1">
        <div class="chat-name">${c.name}</div>
        <div class="chat-preview">${c.preview}</div>
      </div>
      <div>
        <div class="chat-time">${c.time}</div>
        <div style="font-size:10px;color:var(--muted);text-align:right">${c.job}</div>
      </div>
    </div>`).join('');

  // dash preview (3 only)
  const dash = document.getElementById('chats-dash');
  if (dash) dash.innerHTML = chatSessions.slice(0,3).map(c => `
    <div class="chat-item" onclick="show('chats');setTimeout(()=>openChat(${c.id}),50)">
      <div class="chat-avatar">${c.initials}</div>
      <div style="flex:1">
        <div class="chat-name">${c.name}</div>
        <div class="chat-preview">${c.preview}</div>
      </div>
      <div class="chat-time">${c.time}</div>
    </div>`).join('');
}

function openChat(id) {
  activeChatId = id;
  const session = chatSessions.find(c => c.id === id);
  if (!session) return;

  document.getElementById('chat-view').style.display = '';
  document.getElementById('chat-view-name').textContent = 'Chat with ' + session.name;
  document.getElementById('chat-view-job').textContent = session.job;

  renderMessages(session);
}

function renderMessages(session) {
  const box = document.getElementById('chat-messages');
  box.innerHTML = session.msgs.map(m => `
    <div class="msg ${m.from === 'me' ? 'me' : 'them'}">
      <div class="msg-bubble">${m.text}</div>
    </div>`).join('');
  box.scrollTop = box.scrollHeight;
}

function sendMsg() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || activeChatId === null) return;

  const session = chatSessions.find(c => c.id === activeChatId);
  session.msgs.push({ from: 'me', text });
  session.preview = text;
  input.value = '';
  renderMessages(session);
  renderChats();
}

function closeChat() {
  document.getElementById('chat-view').style.display = 'none';
  activeChatId = null;
}

// ─── COMPARE TABLE ───────────────────────────────────────
function renderCompare() {
  const tbody = document.getElementById('compare-table');
  if (!tbody) return;
  tbody.innerHTML = students.map(s => `<tr class="student-row" id="srow-${s.id}">
    <td>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="chat-avatar" style="width:34px;height:34px;font-size:11px">${s.initials}</div>
        <span style="font-weight:700">${s.name}</span>
      </div>
    </td>
    <td><strong>${s.gpa}</strong></td>
    <td style="font-size:12px;color:var(--muted)">${s.skills}</td>
    <td style="font-size:12px">${s.job}</td>
    <td>
      <button class="flag-btn ${s.flagged ? 'flagged' : ''}" onclick="toggleFlag(${s.id})" title="${s.flagged ? 'Unflag' : 'Flag'}">
        <i class="fas fa-flag"></i>
      </button>
    </td>
    <td>
      <button class="btn-primary" style="padding:5px 10px;font-size:11px" onclick="openAccept('${s.name}')">
        <i class="fas fa-envelope"></i> Accept
      </button>
    </td>
  </tr>`).join('');
}

function toggleFlag(id) {
  const s = students.find(x => x.id === id);
  if (!s) return;
  s.flagged = !s.flagged;
  renderCompare();
  renderFlagged();
}

// ─── FLAGGED ─────────────────────────────────────────────
function renderFlagged() {
  const list = document.getElementById('flagged-list');
  if (!list) return;
  const flagged = students.filter(s => s.flagged);
  if (!flagged.length) {
    list.innerHTML = '<p style="font-size:13px;color:var(--muted);padding:10px 0">No flagged students yet. Flag students from Compare & Select.</p>';
    return;
  }
  list.innerHTML = flagged.map(s => `
    <div class="job-item">
      <div class="chat-avatar" style="border-radius:10px">${s.initials}</div>
      <div style="flex:1">
        <div class="job-title">${s.name}</div>
        <div class="job-meta">GPA: ${s.gpa} · ${s.job}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:2px">${s.skills}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="icon-btn" style="color:#EF4444" onclick="toggleFlag(${s.id})" title="Remove Flag"><i class="fas fa-flag"></i></button>
        <button class="btn-primary" style="padding:5px 10px;font-size:11px" onclick="openAccept('${s.name}')"><i class="fas fa-envelope"></i> Accept</button>
      </div>
    </div>`).join('');
}

// ─── ACCEPT MODAL ────────────────────────────────────────
function openAccept(name) {
  document.getElementById('accept-name').textContent = name;
  document.getElementById('accept-done').style.display = 'none';
  document.getElementById('acceptOverlay').classList.add('open');
}
function closeAccept() {
  document.getElementById('acceptOverlay').classList.remove('open');
}
function sendAccept() {
  document.getElementById('accept-done').style.display = 'block';
  setTimeout(closeAccept, 1800);
}
document.getElementById('acceptOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('acceptOverlay')) closeAccept();
});

// ─── POST JOB ────────────────────────────────────────────
function submitPost() {
  const title = document.getElementById('f-title').value.trim();
  if (!title) { alert('Please enter a job title.'); return; }
  const msg = document.getElementById('post-msg');
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 3000);
  // reset
  ['f-title','f-loc','f-salary','f-desc','f-skills'].forEach(id => document.getElementById(id).value = '');
}

// ─── INIT ─────────────────────────────────────────────────
document.getElementById('posts-dash').innerHTML = myPosts.slice(0,3).map(renderPostItem).join('');
renderPostsTable();
renderChats();
renderCompare();
renderFlagged();