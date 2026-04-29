/* ==============================
   JOB DATA
============================== */
const JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    city: "Cairo",
    type: "Full Time",
    place: "On Site",
    daysAgo: 2,
    desc: "Build modern UI using React and create responsive interfaces for web applications.",
    candidate: "Strong in HTML, CSS, JavaScript, and React. Experience with REST APIs is a plus.",
    companyInfo: "Tech Solutions is a fast-growing startup focused on digital transformation.",
    salary: "8,000 – 12,000 EGP",
    skills: ["React", "HTML", "CSS", "JavaScript"]
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Digital Hub",
    city: "Alexandria",
    type: "Full Time",
    place: "On Site",
    daysAgo: 1,
    desc: "Develop scalable APIs and manage databases for enterprise-level applications.",
    candidate: "Proficient in Node.js, MongoDB, and Express. REST & GraphQL experience preferred.",
    companyInfo: "Digital Hub builds scalable backend systems for fintech companies.",
    salary: "10,000 – 15,000 EGP",
    skills: ["Node.js", "MongoDB", "Express", "GraphQL"]
  },
  {
    id: 3,
    title: "Software Engineer Intern",
    company: "Smart Systems",
    city: "Giza",
    type: "Internship",
    place: "Hybrid",
    daysAgo: 3,
    desc: "Assist senior engineers in building AI-powered software projects and learn best practices.",
    candidate: "Basic programming knowledge and familiarity with Git. Python or Java preferred.",
    companyInfo: "Smart Systems works on cutting-edge AI and machine learning projects.",
    salary: "3,000 EGP",
    skills: ["Python", "Git", "Algorithms", "AI"]
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Minds",
    city: "Cairo",
    type: "Part Time",
    place: "On Site",
    daysAgo: 5,
    desc: "Design user-friendly interfaces and conduct UX research to improve product experience.",
    candidate: "Proficient in Figma, experienced in UX research and wireframing.",
    companyInfo: "Creative Minds is a leading design agency serving clients across Egypt.",
    salary: "7,000 – 10,000 EGP",
    skills: ["Figma", "UX Research", "Wireframing", "Prototyping"]
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Data Insights",
    city: "Remote",
    type: "Part Time",
    place: "Remote",
    daysAgo: 7,
    desc: "Analyze large datasets and build visual reports to support business decision-making.",
    candidate: "Strong in SQL, Excel, and Power BI. Statistics background is a plus.",
    companyInfo: "Data Insights specializes in business intelligence and analytics solutions.",
    salary: "9,000 – 13,000 EGP",
    skills: ["SQL", "Excel", "Power BI", "Statistics"]
  }
];

/* ==============================
   STATE
============================== */
let savedJobs = new Set();
let activeJobId = null;

/* ==============================
   HELPERS
============================== */
function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function daysLabel(d) {
  if (d < 1) return 'Today';
  if (d === 1) return '1 day ago';
  if (d < 7) return d + ' days ago';
  return '1 week ago';
}

/* ==============================
   FILTER & SEARCH
============================== */
function getFilteredJobs() {
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const types  = [...document.querySelectorAll('.f-type:checked')].map(x => x.value);
  const places = [...document.querySelectorAll('.f-place:checked')].map(x => x.value);
  const cities = [...document.querySelectorAll('.f-city:checked')].map(x => x.value);
  const dates  = [...document.querySelectorAll('.f-date:checked')].map(x => +x.value);
  const savedOnly = document.getElementById('savedOnly').checked;

  return JOBS.filter(j => {
    if (search) {
      const haystack = `${j.title} ${j.company} ${j.city} ${j.skills.join(' ')}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (types.length  && !types.includes(j.type))   return false;
    if (places.length && !places.includes(j.place))  return false;
    if (cities.length && !cities.includes(j.city))   return false;
    if (dates.length  && !dates.some(d => j.daysAgo <= d)) return false;
    if (savedOnly && !savedJobs.has(j.id)) return false;
    return true;
  });
}

/* ==============================
   RENDER JOBS LIST
============================== */
function renderJobs() {
  const list = getFilteredJobs();
  const container = document.getElementById('jobsList');
  const countEl = document.getElementById('resultsCount');

  countEl.innerHTML = `<strong>${list.length}</strong> job${list.length !== 1 ? 's' : ''} found`;

  if (!list.length) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fa-regular fa-folder-open"></i>
        No jobs match your search or filters.
      </div>`;
    return;
  }

  container.innerHTML = list.map(j => `
    <div class="job-card ${activeJobId === j.id ? 'active' : ''}" onclick="openJob(${j.id})">
      <div class="card-top">
        <div class="company-logo">${initials(j.company)}</div>
        <div class="card-main">
          <div class="card-title">${j.title}</div>
          <div class="card-company">${j.company} &middot; ${j.city}</div>
          <div class="tags-row">
            <span class="tag tag-type">${j.type}</span>
            <span class="tag tag-place">${j.place}</span>
          </div>
        </div>
        <div class="card-right">
          <button class="save-icon ${savedJobs.has(j.id) ? 'saved' : ''}"
                  onclick="toggleSave(event, ${j.id})"
                  title="${savedJobs.has(j.id) ? 'Unsave' : 'Save job'}">
            <i class="fa-${savedJobs.has(j.id) ? 'solid' : 'regular'} fa-bookmark"></i>
          </button>
          <span class="card-date">${daysLabel(j.daysAgo)}</span>
        </div>
      </div>
      <p class="card-desc">${j.desc}</p>
      <div class="skills-row">
        ${j.skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ==============================
   OPEN JOB DETAILS
============================== */
function openJob(id) {
  activeJobId = id;
  const j = JOBS.find(x => x.id === id);

  document.getElementById('detailPlaceholder').style.display = 'none';
  document.getElementById('detailContent').style.display = 'block';
  document.getElementById('detailContent').innerHTML = `
    <button class="detail-close-btn" onclick="closeDetail()" title="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="detail-logo">${initials(j.company)}</div>
    <div class="detail-title">${j.title}</div>
    <div class="detail-company">${j.company} &middot; ${j.city}</div>
    <div class="detail-tags tags-row">
      <span class="tag tag-type">${j.type}</span>
      <span class="tag tag-place">${j.place}</span>
    </div>
    <hr class="detail-divider">
    <div class="detail-section" style="margin-bottom:.75rem;">
      <label>Description</label>
      <p>${j.desc}</p>
    </div>
    <div class="detail-section" style="margin-bottom:.75rem;">
      <label>Preferred Candidate</label>
      <p>${j.candidate}</p>
    </div>
    <div class="detail-section" style="margin-bottom:.75rem;">
      <label>About the Company</label>
      <p>${j.companyInfo}</p>
    </div>
    <div class="detail-section">
      <label>Salary</label>
      <div><span class="salary-pill">${j.salary}</span></div>
    </div>
    <button class="apply-btn" onclick="alert('Applying for: ${j.title}')">
      <i class="fa-solid fa-paper-plane"></i> Apply Now
    </button>
  `;

  renderJobs();
}

/* ==============================
   CLOSE DETAILS PANEL
============================== */
function closeDetail() {
  activeJobId = null;
  document.getElementById('detailContent').style.display = 'none';
  document.getElementById('detailPlaceholder').style.display = 'block';
  renderJobs();
}

/* ==============================
   SAVE / UNSAVE
============================== */
function toggleSave(event, id) {
  event.stopPropagation();
  if (savedJobs.has(id)) {
    savedJobs.delete(id);
  } else {
    savedJobs.add(id);
  }
  renderJobs();
  if (activeJobId === id) openJob(id);
}

/* ==============================
   FILTER ACTIONS
============================== */
function applyFilters() { renderJobs(); }

function clearAll() {
  document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
  document.getElementById('searchInput').value = '';
  renderJobs();
}

/* ==============================
   EVENT LISTENERS
============================== */
// Search on typing
document.getElementById('searchInput').addEventListener('input', function() {
  renderJobs();
});

// Search on Enter key
document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') renderJobs();
});

// Checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', renderJobs);
});

/* ==============================
   INIT
============================== */
renderJobs();