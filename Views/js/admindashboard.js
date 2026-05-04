
const recruiters = [
  { id:1, name:"Hana Khaled",   company:"TechCorp Egypt",  email:"hana@techcorp.com",   joined:"Dec 1, 2024",  posts:8,  status:"active" },
  { id:2, name:"Mostafa Nabil", company:"Vodafone Egypt",  email:"mostafa@voda.com",    joined:"Jan 5, 2025",  posts:12, status:"active" },
  { id:3, name:"Rana Gamal",    company:"IBM Egypt",       email:"rana@ibm.com",        joined:"Feb 10, 2025", posts:5,  status:"active" },
  { id:4, name:"Tarek Samy",    company:"Amazon Egypt",    email:"tarek@amazon.com",    joined:"Mar 3, 2025",  posts:3,  status:"active" },
];

const blacklist = [
  { id:99,  name:"Fake HR Account", type:"Recruiter", email:"fake@scam.com",   banned:"Apr 1, 2025",  reason:"Fraudulent job posts" },
  { id:100, name:"Spam Student",    type:"Student",   email:"spam@mail.com",   banned:"Apr 15, 2025", reason:"Spamming recruiters" },
];

const pendingPosts = [
  { id:1, title:"Senior React Developer", company:"TechCorp Egypt", type:"Full-time", loc:"Cairo",     posted:"Apr 28", desc:"We are looking for a senior React developer with 3+ years experience in modern frontend frameworks and REST APIs. Must have experience with TypeScript and Redux.", salary:"15,000 EGP", deadline:"May 30" },
  { id:2, title:"Data Scientist Intern",   company:"IBM Egypt",      type:"Internship", loc:"Remote",   posted:"Apr 27", desc:"Summer internship for data science students. Work on real ML projects using Python, Pandas, and TensorFlow. Must be enrolled in a relevant degree.", salary:"Unpaid", deadline:"Jun 1" },
  { id:3, title:"Mobile Developer",        company:"Vodafone Egypt", type:"Part-time",  loc:"Giza",     posted:"Apr 26", desc:"Flutter developer needed for building internal HR mobile app. Familiarity with Firebase is a plus.", salary:"8,000 EGP", deadline:"May 25" },
];

const allJobs = [
  { id:10, title:"Backend Developer",    company:"Amazon Egypt",    type:"Full-time", loc:"Cairo",  posted:"Apr 20", status:"active" },
  { id:11, title:"UX Designer",          company:"Careem",          type:"Full-time", loc:"Remote", posted:"Apr 18", status:"active" },
  { id:12, title:"ML Engineer",          company:"Google Egypt",    type:"Full-time", loc:"Cairo",  posted:"Apr 15", status:"active" },
  { id:13, title:"Cybersecurity Analyst",company:"Orange Egypt",    type:"Full-time", loc:"Cairo",  posted:"Apr 10", status:"active" },
  { id:14, title:"Cloud Architect",      company:"Microsoft Egypt", type:"Full-time", loc:"Remote", posted:"Apr 5",  status:"active" },
];

const eventsData = [
  { id:1, title:"Spring Job Fair 2025",   date:"May 15, 2025", time:"10:00 AM", location:"Cairo Uni Hall",   type:"Job Fair",   audience:"Students, Recruiters", desc:"Annual spring job fair connecting top students with leading companies." },
  { id:2, title:"Tech Workshop: AI 2025", date:"May 22, 2025", time:"2:00 PM",  location:"Online (Zoom)",    type:"Workshop",   audience:"Students",              desc:"Deep dive into modern AI tools and career paths in AI engineering." },
  { id:3, title:"Networking Night",       date:"Jun 1, 2025",  time:"6:00 PM",  location:"Hilton Cairo",     type:"Networking", audience:"All",                   desc:"Casual networking evening for students and HR professionals." },
];

const complaints = [
  { id:1, from:"Ahmed Mohamed", type:"Student",   subject:"Fake job listing",      body:"I applied to a job that turned out to be fake. The company doesn't exist.", date:"Apr 27", status:"open",     related:"TechScam Inc." },
  { id:2, from:"Sara Youssef",  type:"Student",   subject:"Recruiter was rude",    body:"The recruiter sent me an inappropriate message during the application process.", date:"Apr 25", status:"open",  related:"HR Account #4" },
  { id:3, from:"Hana Khaled",   type:"Recruiter", subject:"Student didn't show up", body:"A student confirmed an interview but never showed up or replied.", date:"Apr 22", status:"resolved", related:"Student #5" },
];

const inboxMessages = [
  { icon:"fas fa-user-graduate", from:"Ahmed Mohamed",  subject:"Question about my application", body:"Hello admin, I submitted an application two weeks ago and haven't heard back...", time:"1 hour ago",  unread:true  },
  { icon:"fas fa-briefcase",     from:"Hana Khaled (TechCorp)", subject:"Job post approval request", body:"We submitted 3 new job posts for approval. Please review them at your earliest...", time:"3 hours ago", unread:true  },
  { icon:"fas fa-exclamation",   from:"System Alert",   subject:"New complaint received",        body:"A new complaint was submitted by user Sara Youssef. Please review.",             time:"5 hours ago", unread:false },
  { icon:"fas fa-calendar",      from:"System",         subject:"Upcoming event reminder",       body:"Spring Job Fair is in 7 days. Ensure all event details are confirmed.",           time:"1 day ago",   unread:false },
];

// ===================== INIT =====================

let pendingJobId = null;
let modalCallback = null;

window.onload = () => {
  updateBadges();
  updateStats();
  renderStudents();
  renderRecruiters();
  renderBlacklist();
  renderPendingPosts();
  renderAllJobs();
  renderEvents();
  renderComplaints();
  renderInbox();
};

function updateStats() {
  // document.getElementById('stat-students').textContent   = students.length;
  document.getElementById('stat-recruiters').textContent = recruiters.length;
  document.getElementById('stat-jobs').textContent       = allJobs.filter(j => j.status === 'active').length;
  document.getElementById('stat-pending').textContent    = pendingPosts.length;
  document.getElementById('stat-complaints').textContent = complaints.filter(c => c.status === 'open').length;
  document.getElementById('stat-blacklist').textContent  = blacklist.length;
}

function updateBadges() {
  // document.getElementById('badge-students').textContent   = students.length;
  document.getElementById('badge-recruiters').textContent = recruiters.length;
  document.getElementById('badge-blacklist').textContent  = blacklist.length;
  document.getElementById('badge-pending').textContent    = pendingPosts.length;
  document.getElementById('badge-complaints').textContent = complaints.filter(c => c.status === 'open').length;
  document.getElementById('badge-inbox').textContent      = inboxMessages.filter(m => m.unread).length;
}

// ===================== SECTIONS =====================

const sections = ['dashboard','students','recruiters','blacklist','pending','alljobs','events','new-event','complaints','inbox'];
const meta = {
  'dashboard':  ['Dashboard',       'Welcome back, Admin!'],
  'students':   ['Students',        'Manage all student accounts'],
  'recruiters': ['Recruiters / HR', 'Manage all company accounts'],
  'blacklist':  ['Blacklist',       'Banned accounts'],
  'pending':    ['Pending Posts',   'Review job posts before publishing'],
  'alljobs':    ['All Job Posts',   'Manage all published jobs'],
  'events':     ['Events',          'Manage events & announcements'],
  'new-event':  ['Create Event',    'Publish a new event or announcement'],
  'complaints': ['Complaints',      'User-submitted complaints'],
  'inbox':      ['Inbox',           'Messages & Notifications'],
};

function show(name) {
  sections.forEach(s => {
    const el = document.getElementById('sec-' + s);
    if (el) el.style.display = s === name ? '' : 'none';
  });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-title').textContent = meta[name]?.[0] || name;
  document.getElementById('page-sub').textContent   = meta[name]?.[1] || '';
}

// ===================== STUDENTS =====================
/*
function renderStudents() {
  const tbody = document.getElementById('students-tbody');
  tbody.innerHTML = students.map(s => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td>${s.university}</td>
      <td>${s.email}</td>
      <td>${s.joined}</td>
      <td><span class="badge2 ${s.status === 'active' ? 'active' : 'archived'}">${s.status === 'active' ? 'Active' : 'Banned'}</span></td>
      <td>
        <button class="icon-btn" title="View Profile"><i class="fas fa-eye"></i></button>
        <button class="icon-btn" title="Blacklist" style="color:#F59E0B" onclick="banUser(${s.id},'student','${s.name}')"><i class="fas fa-ban"></i></button>
        <button class="icon-btn" title="Delete" style="color:#EF4444" onclick="confirmDelete('student',${s.id},'${s.name}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');

  // dashboard recent
  document.getElementById('inbox-dash').innerHTML = inboxMessages.slice(0,2).map(inboxItem).join('');
}
*/
// ===================== RECRUITERS =====================

function renderRecruiters() {
  const tbody = document.getElementById('recruiters-tbody');
  tbody.innerHTML = recruiters.map(r => `
    <tr>
      <td><strong>${r.name}</strong></td>
      <td>${r.company}</td>
      <td>${r.email}</td>
      <td>${r.joined}</td>
      <td><span class="badge2 active">${r.posts}</span></td>
      <td><span class="badge2 active">Active</span></td>
      <td>
        <button class="icon-btn" title="View"><i class="fas fa-eye"></i></button>
        <button class="icon-btn" title="Blacklist" style="color:#F59E0B" onclick="banUser(${r.id},'recruiter','${r.name}')"><i class="fas fa-ban"></i></button>
        <button class="icon-btn" title="Delete" style="color:#EF4444" onclick="confirmDelete('recruiter',${r.id},'${r.name}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// ===================== BLACKLIST =====================

function renderBlacklist() {
  const tbody = document.getElementById('blacklist-tbody');
  if (blacklist.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px">No blacklisted accounts</td></tr>`;
    return;
  }
  tbody.innerHTML = blacklist.map(b => `
    <tr>
      <td><strong>${b.name}</strong></td>
      <td><span class="badge2 ${b.type === 'Student' ? 'draft' : 'archived'}">${b.type}</span></td>
      <td>${b.email}</td>
      <td>${b.banned}</td>
      <td style="color:var(--muted);font-size:12px">${b.reason}</td>
      <td>
        <button class="icon-btn" title="Remove from Blacklist" style="color:#059669" onclick="removeBlacklist(${b.id})"><i class="fas fa-user-check"></i></button>
        <button class="icon-btn" title="Delete Permanently" style="color:#EF4444" onclick="confirmDelete('blacklist',${b.id},'${b.name}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function banUser(id, type, name) {
  openConfirm(`Blacklist ${name}?`, `Are you sure you want to blacklist <strong>${name}</strong>? This will ban them from the platform.`, () => {
    blacklist.push({ id, name, type: type === 'student' ? 'Student' : 'Recruiter', email: '-', banned: new Date().toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}), reason: 'Flagged by admin' });
    updateBadges(); updateStats(); renderBlacklist();
    alert(`${name} has been added to the blacklist.`);
  }, '#F59E0B');
}

function removeBlacklist(id) {
  const idx = blacklist.findIndex(b => b.id === id);
  if (idx !== -1) {
    blacklist.splice(idx, 1);
    updateBadges(); updateStats(); renderBlacklist();
  }
}

// ===================== PENDING POSTS =====================

function renderPendingPosts() {
  const container = document.getElementById('pending-full');
  const dashContainer = document.getElementById('pending-dash');

  const html = pending => pending.map(p => `
    <div class="job-item" style="align-items:flex-start;gap:14px;padding:14px 0">
      <div class="job-logo" style="font-size:20px">📋</div>
      <div style="flex:1">
        <div class="job-title">${p.title}</div>
        <div class="job-company">${p.company}</div>
        <div class="job-tags">
          <span class="tag type">${p.type}</span>
          <span class="tag loc">${p.loc}</span>
          <span class="tag" style="background:#FEF9C3;color:#92400E">Posted ${p.posted}</span>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:6px;line-height:1.6">${p.desc.substring(0,120)}...</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">
        <button class="icon-btn" title="Review Full Post" onclick="openReview(${p.id})" style="width:auto;padding:0 10px;font-size:11px;gap:4px"><i class="fas fa-eye"></i> Review</button>
        <button class="icon-btn" title="Approve" style="color:#059669;width:auto;padding:0 10px;font-size:11px" onclick="approveDirect(${p.id})"><i class="fas fa-check"></i> Approve</button>
        <button class="icon-btn" title="Reject" style="color:#EF4444;width:auto;padding:0 10px;font-size:11px" onclick="rejectDirect(${p.id})"><i class="fas fa-times"></i> Reject</button>
      </div>
    </div>
  `).join('');

  if (pendingPosts.length === 0) {
    const empty = `<p style="text-align:center;color:var(--muted);padding:20px;font-size:13px">No pending posts 🎉</p>`;
    container.innerHTML = empty;
    dashContainer.innerHTML = empty;
    return;
  }
  container.innerHTML = html(pendingPosts);
  dashContainer.innerHTML = html(pendingPosts.slice(0, 2));
}

function openReview(id) {
  pendingJobId = id;
  const p = pendingPosts.find(p => p.id === id);
  document.getElementById('review-content').innerHTML = `
    <div style="background:var(--bg);border-radius:10px;padding:14px;margin-bottom:10px">
      <div style="font-size:17px;font-weight:800;color:var(--primary);margin-bottom:4px">${p.title}</div>
      <div style="font-size:13px;color:var(--muted);margin-bottom:10px">${p.company} · ${p.type} · ${p.loc}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div><span style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--muted)">Salary</span><br><span style="font-weight:600">${p.salary}</span></div>
        <div><span style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--muted)">Deadline</span><br><span style="font-weight:600">${p.deadline}</span></div>
      </div>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:5px">Description</div>
      <p style="font-size:13px;line-height:1.7;color:var(--text)">${p.desc}</p>
    </div>
  `;
  document.getElementById('reviewModal').classList.add('open');
}

function closeReview() {
  document.getElementById('reviewModal').classList.remove('open');
  pendingJobId = null;
}

function approveJob() {
  if (!pendingJobId) return;
  approveDirect(pendingJobId);
  closeReview();
}

function rejectJob() {
  if (!pendingJobId) return;
  rejectDirect(pendingJobId);
  closeReview();
}

function approveDirect(id) {
  const idx = pendingPosts.findIndex(p => p.id === id);
  if (idx !== -1) {
    const job = pendingPosts.splice(idx, 1)[0];
    allJobs.push({ id: job.id, title: job.title, company: job.company, type: job.type, loc: job.loc, posted: 'Today', status: 'active' });
    updateBadges(); updateStats(); renderPendingPosts(); renderAllJobs();
  }
}

function rejectDirect(id) {
  const idx = pendingPosts.findIndex(p => p.id === id);
  if (idx !== -1) {
    pendingPosts.splice(idx, 1);
    updateBadges(); updateStats(); renderPendingPosts();
  }
}

// ===================== ALL JOBS =====================

function renderAllJobs() {
  const tbody = document.getElementById('jobs-tbody');
  tbody.innerHTML = allJobs.map(j => `
    <tr>
      <td><strong>${j.title}</strong></td>
      <td>${j.company}</td>
      <td><span class="tag type">${j.type}</span></td>
      <td>${j.loc}</td>
      <td>${j.posted}</td>
      <td><span class="badge2 active">Active</span></td>
      <td>
        <button class="icon-btn" title="View"><i class="fas fa-eye"></i></button>
        <button class="icon-btn" title="Remove" style="color:#EF4444" onclick="removeJob(${j.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function removeJob(id) {
  openConfirm('Remove Job Post?', 'Are you sure you want to remove this job post?', () => {
    const idx = allJobs.findIndex(j => j.id === id);
    if (idx !== -1) { allJobs.splice(idx, 1); updateStats(); renderAllJobs(); }
  });
}

// ===================== EVENTS =====================

function renderEvents() {
  const container = document.getElementById('events-list');
  if (eventsData.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:var(--muted);padding:20px">No events yet. <span class="card-link" style="cursor:pointer" onclick="show('new-event')">Create one</span></p>`;
    return;
  }
  container.innerHTML = eventsData.map(e => `
    <div class="job-item" style="align-items:flex-start;padding:14px 0">
      <div class="job-logo" style="font-size:20px">🎪</div>
      <div style="flex:1">
        <div class="job-title">${e.title}</div>
        <div class="job-company">${e.type} · ${e.location}</div>
        <div class="job-tags">
          <span class="tag type"><i class="fas fa-calendar" style="margin-right:3px"></i>${e.date}</span>
          <span class="tag loc"><i class="fas fa-clock" style="margin-right:3px"></i>${e.time}</span>
          <span class="tag" style="background:#FEF9C3;color:#92400E">${e.audience}</span>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:5px">${e.desc}</div>
      </div>
      <div style="display:flex;gap:6px;flex-shrink:0">
        <button class="icon-btn" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="icon-btn" title="Delete" style="color:#EF4444" onclick="deleteEvent(${e.id})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function publishEvent() {
  const title    = document.getElementById('ev-title').value.trim();
  const date     = document.getElementById('ev-date').value;
  const time     = document.getElementById('ev-time').value;
  const location = document.getElementById('ev-location').value.trim();
  const type     = document.getElementById('ev-type').value;
  const desc     = document.getElementById('ev-desc').value.trim();
  const studs    = document.getElementById('ev-students').checked;
  const recs     = document.getElementById('ev-recruiters').checked;
  const pub      = document.getElementById('ev-public').checked;

  if (!title || !date || !location) { alert('Please fill in the required fields (Title, Date, Location).'); return; }

  const audience = [studs && 'Students', recs && 'Recruiters', pub && 'General Public'].filter(Boolean).join(', ') || 'All';
  const dateStr = new Date(date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });

  eventsData.push({ id: Date.now(), title, date: dateStr, time, location, type, desc, audience });
  renderEvents();
  show('events');
}

function deleteEvent(id) {
  openConfirm('Delete Event?', 'Are you sure you want to delete this event?', () => {
    const idx = eventsData.findIndex(e => e.id === id);
    if (idx !== -1) { eventsData.splice(idx, 1); renderEvents(); }
  });
}

// ===================== COMPLAINTS =====================

function renderComplaints() {
  const full = document.getElementById('complaints-full');
  const dash = document.getElementById('complaints-dash');

  const html = list => list.map(c => `
    <div class="inbox-item" style="padding:12px 0">
      <div class="inbox-icon" style="background:${c.status === 'open' ? '#FEE2E2' : '#D1FAE5'};color:${c.status === 'open' ? '#991B1B' : '#065F46'}">
        <i class="fas fa-${c.status === 'open' ? 'exclamation' : 'check'}"></i>
      </div>
      <div style="flex:1">
        <div class="inbox-text"><strong>${c.from}</strong> <span style="font-size:10px;color:var(--muted)">(${c.type})</span> — ${c.subject}</div>
        <div class="inbox-sub">${c.body.substring(0,80)}...</div>
        <div class="inbox-time">${c.date} · Related: ${c.related}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">
        ${c.status === 'open' ? `<button class="icon-btn" style="color:#059669;font-size:10px;width:auto;padding:0 8px" onclick="resolveComplaint(${c.id})"><i class="fas fa-check"></i> Resolve</button>` : `<span class="badge2 active" style="font-size:10px">Resolved</span>`}
      </div>
      ${c.status === 'open' ? '<div class="unread-dot"></div>' : ''}
    </div>
  `).join('');

  full.innerHTML = complaints.length ? html(complaints) : `<p style="text-align:center;color:var(--muted);padding:20px">No complaints 🎉</p>`;
  dash.innerHTML = html(complaints.filter(c => c.status === 'open').slice(0, 2)) || `<p style="text-align:center;color:var(--muted);padding:14px;font-size:12px">No open complaints</p>`;
}

function resolveComplaint(id) {
  const c = complaints.find(c => c.id === id);
  if (c) { c.status = 'resolved'; updateBadges(); updateStats(); renderComplaints(); }
}

// ===================== INBOX =====================

function inboxItem(m) {
  return `
    <div class="inbox-item">
      <div class="inbox-icon"><i class="${m.icon}"></i></div>
      <div style="flex:1">
        <div class="inbox-text"><strong>${m.from}</strong> — ${m.subject}</div>
        <div class="inbox-sub">${m.body.substring(0,80)}...</div>
        <div class="inbox-time">${m.time} · Message</div>
      </div>
      ${m.unread ? '<div class="unread-dot"></div>' : ''}
    </div>
  `;
}

function renderInbox() {
  const full = document.getElementById('inbox-full');
  const dash = document.getElementById('inbox-dash');
  full.innerHTML = inboxMessages.map(inboxItem).join('');
  dash.innerHTML = inboxMessages.slice(0, 2).map(inboxItem).join('');
}

// ===================== DELETE =====================

function confirmDelete(type, id, name) {
  openConfirm(`Delete Account?`, `Are you sure you want to <strong>permanently delete</strong> the account of <strong>${name}</strong>? This action cannot be undone.`, () => {
    if (type === 'student') {
      const idx = students.findIndex(s => s.id === id);
      if (idx !== -1) { students.splice(idx, 1); updateBadges(); updateStats(); renderStudents(); }
    } else if (type === 'recruiter') {
      const idx = recruiters.findIndex(r => r.id === id);
      if (idx !== -1) { recruiters.splice(idx, 1); updateBadges(); updateStats(); renderRecruiters(); }
    } else if (type === 'blacklist') {
      const idx = blacklist.findIndex(b => b.id === id);
      if (idx !== -1) { blacklist.splice(idx, 1); updateBadges(); updateStats(); renderBlacklist(); }
    }
  });
}

// ===================== MODAL =====================

function openConfirm(title, body, callback, btnColor = '#EF4444') {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-confirm-btn').style.background = btnColor;
  modalCallback = callback;
  document.getElementById('confirmModal').classList.add('open');
}

function closeModal() {
  document.getElementById('confirmModal').classList.remove('open');
  modalCallback = null;
}

document.getElementById('modal-confirm-btn').onclick = () => {
  if (modalCallback) modalCallback();
  closeModal();
};

document.getElementById('confirmModal').addEventListener('click', e => {
  if (e.target === document.getElementById('confirmModal')) closeModal();
});

document.getElementById('reviewModal').addEventListener('click', e => {
  if (e.target === document.getElementById('reviewModal')) closeReview();
});

// ===================== SEARCH FILTER =====================

function filterTable(tableId, query) {
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query.toLowerCase()) ? '' : 'none';
  });
}
