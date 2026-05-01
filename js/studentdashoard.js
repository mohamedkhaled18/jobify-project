const appliedJobs = [
  { icon:"💻", title:"Backend Developer", company:"TechCorp Egypt", type:"Full-time", loc:"Cairo", status:"interview", statusTxt:"Interview Scheduled", date:"Apr 20" },
  { icon:"📱", title:"Mobile Developer", company:"Vodafone Egypt", type:"Full-time", loc:"Cairo", status:"pending", statusTxt:"Under Review", date:"Apr 18" },
  { icon:"🤖", title:"ML Engineer Intern", company:"IBM Egypt", type:"Internship", loc:"Remote", status:"accepted", statusTxt:"Accepted 🎉", date:"Apr 10" },
  { icon:"🌐", title:"Frontend Developer", company:"Noon", type:"Part-time", loc:"Riyadh", status:"rejected", statusTxt:"Rejected", date:"Apr 5" },
  { icon:"🔧", title:"DevOps Intern", company:"Amazon Egypt", type:"Internship", loc:"Cairo", status:"pending", statusTxt:"Under Review", date:"Apr 1" },
];

const savedJobs = [
  { icon:"📊", title:"Data Analyst", company:"McKinsey & Co.", type:"Full-time", loc:"Cairo" },
  { icon:"🎨", title:"UI/UX Designer", company:"Careem", type:"Full-time", loc:"Remote" },
  { icon:"☁️", title:"Cloud Engineer", company:"Microsoft", type:"Full-time", loc:"Dubai" },
  { icon:"🔒", title:"Cybersecurity Analyst", company:"Orange Egypt", type:"Full-time", loc:"Cairo" },
];

const recJobs = [
  { icon:"🚀", title:"AI Engineer", company:"Google Egypt", type:"Full-time", loc:"Cairo", match:"95% match" },
  { icon:"💡", title:"Full Stack Developer", company:"Spotify", type:"Remote", loc:"Remote", match:"90% match" },
  { icon:"🤝", title:"Python Developer", company:"Booking.com", type:"Full-time", loc:"Netherlands", match:"88% match" },
];

function jobCard(j) {
  return `<div class="job-item">
    <div class="job-logo">${j.icon}</div>
    <div style="flex:1">
      <div class="job-title">${j.title}</div>
      <div class="job-company">${j.company}</div>
      <div class="job-tags">
        <span class="tag type">${j.type}</span>
        <span class="tag loc">${j.loc}</span>
        ${j.match ? `<span class="tag match">${j.match}</span>` : ''}
      </div>
    </div>
    <div style="text-align:right;flex-shrink:0">
      ${j.status ? `<span class="status ${j.status}">${j.statusTxt}</span><div style="font-size:10px;color:var(--muted);margin-top:3px">${j.date}</div>` : ''}
      ${j.match ? `<button class="btn-primary" style="padding:6px 12px;font-size:11px">Apply</button>` : ''}
    </div>
  </div>`;
}

document.getElementById('applied-dash').innerHTML = appliedJobs.slice(0,3).map(jobCard).join('');
document.getElementById('applied-full').innerHTML = appliedJobs.map(jobCard).join('');
document.getElementById('saved-full').innerHTML = savedJobs.map(jobCard).join('');
document.getElementById('rec-full').innerHTML = recJobs.map(jobCard).join('');

const sections = ['dashboard','profile','cvs','skills','applied','saved','recommended','inbox'];
const meta = {
  dashboard:   ['Dashboard',         'Welcome back, Ahmed!'],
  profile:     ['My Profile',        'Manage your personal information'],
  cvs:         ['My CVs',            'Manage all your resume files'],
  skills:      ['My Skills',         'View and update your skills'],
  applied:     ['Applied Jobs',      'Track your applications'],
  saved:       ['Saved Jobs',        'Jobs saved for later'],
  recommended: ['Recommended Jobs',  'Matching your profile'],
  inbox:       ['Inbox',             'Messages & Notifications'],
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

let qrDone = false;
function openQR() {
  document.getElementById('qrOverlay').classList.add('open');
  if (!qrDone) {
    new QRCode(document.getElementById('qr-box'), {
      text: 'https://jobfair.example.com/student/ahmed/cvs',
      width: 150, height: 150,
      colorDark: '#5B21B6', colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    qrDone = true;
  }
}
function closeQR() { document.getElementById('qrOverlay').classList.remove('open'); }
document.getElementById('qrOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('qrOverlay')) closeQR();
});

function downloadAllCVs() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
  doc.setFont('helvetica','bold'); doc.setFontSize(22); doc.setTextColor(91,33,182);
  doc.text('Student CV Portfolio', 105, 32, { align:'center' });
  doc.setFontSize(11); doc.setTextColor(100,100,100); doc.setFont('helvetica','normal');
  doc.text('Ahmed Mohamed Ali — Cairo University', 105, 44, { align:'center' });
  doc.text('ahmed@email.com  |  +20 100 000 0000', 105, 51, { align:'center' });
  doc.setDrawColor(124,58,237); doc.setLineWidth(0.5); doc.line(20, 58, 190, 58);
  const cvs = [
    { name:'CV_Main_2025.pdf',    desc:'General Purpose CV',      status:'Active',   date:'Apr 20, 2025' },
    { name:'CV_Frontend.pdf',     desc:'Frontend Development',    status:'Draft',    date:'Mar 10, 2025' },
    { name:'CV_Data_Science.pdf', desc:'Data Science Specialist', status:'Archived', date:'Jan 5, 2025'  },
  ];
  let y = 70;
  cvs.forEach((cv, i) => {
    doc.setFillColor(237,233,254); doc.roundedRect(20, y-4, 170, 20, 3, 3, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(91,33,182);
    doc.text(`${i+1}. ${cv.name}`, 26, y+4);
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(100,100,100);
    doc.text(`${cv.desc}  |  ${cv.status}  |  ${cv.date}`, 26, y+11);
    y += 26;
  });
  doc.setFont('helvetica','italic'); doc.setFontSize(9); doc.setTextColor(160,160,160);
  doc.text('Generated from JobFair Student Portal', 105, 282, { align:'center' });
  doc.save('Ahmed_Mohamed_All_CVs.pdf');
}