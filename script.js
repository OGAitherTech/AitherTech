(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const body=document.body;

/* AitherTech production-style front-end polish. */
const css=document.createElement('style');
css.textContent=`
:root{--aither-accent:#69adff;--aither-violet:#8b7cff}
body{overflow-x:hidden}
.announcement{background:linear-gradient(90deg,#0d1b30,#101b2d);border-bottom:1px solid #ffffff12;color:#a9bbd1;font-size:12px}
.announcement .wrap{min-height:34px;display:flex;align-items:center;justify-content:center;gap:8px;text-align:center}
.announcement a{color:#dcecff;text-decoration:underline;text-underline-offset:3px}
.nav{position:relative}.logo:focus-visible,.links a:focus-visible,.btn:focus-visible,.icon:focus-visible,.sidebar button:focus-visible,summary:focus-visible{outline:2px solid var(--aither-accent);outline-offset:3px}
.links a{position:relative}.links a:after{content:"";position:absolute;left:0;right:100%;bottom:-7px;height:2px;background:linear-gradient(90deg,var(--aither-accent),var(--aither-violet));transition:.2s}.links a:hover:after,.links a[aria-current="true"]:after{right:0}
.hero{position:relative}.hero:before{content:"";position:absolute;width:520px;height:520px;border-radius:50%;right:-280px;top:-100px;background:radial-gradient(circle,#4d8fe51c,transparent 67%);pointer-events:none}
.eyebrow{display:flex;align-items:center;gap:8px}.eyebrow:before{content:"";width:22px;height:1px;background:currentColor;opacity:.8}
.card,.domain,.price,.mock,.cta,.platform-card{transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}.card:hover,.domain:hover,.platform-card:hover{transform:translateY(-3px);box-shadow:0 18px 45px #0004}.price:hover{transform:translateY(-4px)}
.metric-strip{padding:30px 0;border-block:1px solid var(--l);background:#080e18}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--l)}.metric{background:#080e18;padding:8px 20px}.metric strong{display:block;font-size:24px;letter-spacing:-.04em}.metric span{font-size:11px;color:#718096}
.platform-strip{padding:68px 0;background:linear-gradient(180deg,#080e18,#060a12)}.platform-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-top:25px}.platform-card{background:linear-gradient(160deg,var(--p2),var(--p));border:1px solid var(--l);border-radius:18px;padding:21px}.platform-icon{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:#172b47;color:#a9ceff;font-weight:900}.platform-card h3{margin:13px 0 6px}.platform-card p{margin:0;color:var(--m)}
.backtop{position:fixed;right:18px;bottom:18px;width:42px;height:42px;border-radius:50%;border:1px solid #2d4563;background:#0d1725;color:#fff;z-index:80;cursor:pointer;opacity:0;transform:translateY(12px);transition:.2s}.backtop.show{opacity:1;transform:none}.progress{position:fixed;top:0;left:0;height:2px;width:0;background:linear-gradient(90deg,var(--aither-accent),var(--aither-violet));z-index:300}.theme-toggle{min-width:42px}
.light{--bg:#f5f8fc!important;--p:#fff!important;--p2:#f7f9fc!important;--t:#101827!important;--m:#526176!important;--l:#dbe3ed!important;--b:#1769c2!important;--b2:#6548d8!important}.light body{background:radial-gradient(900px 550px at 80% -10%,#dcecff,transparent 62%),#f5f8fc!important}.light .top{background:#ffffffd9}.light .alt,.light .metric-strip,.light .platform-strip{background:#edf3f9}.light .mock,.light .app{background:#fff}.light .btn,.light .icon{color:#101827;background:#fff}.light .primary{color:#fff;background:linear-gradient(135deg,#1769c2,#6548d8)}
@media(max-width:900px){.platform-grid{grid-template-columns:1fr 1fr}}
@media(max-width:700px){.metric-grid{grid-template-columns:1fr 1fr}.announcement .wrap{padding:7px 12px}.hero:before{display:none}}
@media(max-width:560px){.platform-grid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
document.head.appendChild(css);

// Announcement bar
if(!$('.announcement')){const bar=document.createElement('div');bar.className='announcement';bar.innerHTML='<div class="wrap"><span>Introducing the AitherTech platform</span><span>•</span><a href="#products">Explore the ecosystem</a></div>';const top=$('.top');top?.parentNode.insertBefore(bar,top)}

// Platform pillars: adds a real-company style architecture summary without inventing customers or statistics.
if(!$('.platform-strip')){
 const hero=$('.hero');
 if(hero){const s=document.createElement('section');s.className='platform-strip';s.innerHTML='<div class="wrap"><div class="head"><div><div class="eyebrow">One platform</div><h2>Everything works from the same foundation.</h2></div><p>Designed as one connected system: devices at the edge, cloud services in the middle, and tools for the people building on top.</p></div><div class="platform-grid"><article class="platform-card"><div class="platform-icon">01</div><h3>Devices</h3><p>Aither hardware, secure pairing, telemetry, local control and firmware updates.</p></article><article class="platform-card"><div class="platform-icon">02</div><h3>Cloud</h3><p>Accounts, storage, backups, device management, logs and service health in one place.</p></article><article class="platform-card"><div class="platform-icon">03</div><h3>Developers</h3><p>APIs, SDKs, documentation and release tooling for building on the Aither platform.</p></article></div></div></section>';hero.after(s)}}

// Scroll progress + back to top
const progress=document.createElement('div');progress.className='progress';body.appendChild(progress);const back=document.createElement('button');back.className='backtop';back.type='button';back.setAttribute('aria-label','Back to top');back.textContent='↑';body.appendChild(back);
const updateScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%';back.classList.toggle('show',scrollY>500)};addEventListener('scroll',updateScroll,{passive:true});updateScroll();back.onclick=()=>scrollTo({top:0,behavior:'smooth'});

// Accessible mobile drawer
const drawer=$('#drawer'),menu=$('.menu');const toggleDrawer=()=>{drawer?.classList.toggle('open');if(drawer)drawer.setAttribute('aria-hidden',drawer.classList.contains('open')?'false':'true');};window.toggleDrawer=toggleDrawer;menu?.setAttribute('aria-expanded','false');menu?.addEventListener('click',()=>menu.setAttribute('aria-expanded',drawer?.classList.contains('open')?'true':'false'));$$('.drawer a').forEach(a=>a.addEventListener('click',()=>{drawer?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));

// Search
const searchOverlay=$('#search');window.openSearch=()=>{if(searchOverlay){searchOverlay.classList.add('open');setTimeout(()=>searchOverlay.querySelector('input')?.focus(),30)}};const searchInput=searchOverlay?.querySelector('input');searchInput?.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase();$$('.results button').forEach(b=>b.hidden=!!q&&!b.textContent.toLowerCase().includes(q))});

// Modal system
const modal=$('#modal');window.openModal=(title,text)=>{if(!modal)return;$('#modal-title').textContent=title;$('#modal-text').textContent=text;modal.classList.add('open');body.style.overflow='hidden'};const closeModal=()=>{modal?.classList.remove('open');if(!$('.drawer.open')&&!$('.search.open'))body.style.overflow=''};$('#close-modal')?.addEventListener('click',closeModal);modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});$$('[data-modal]').forEach(b=>b.addEventListener('click',()=>window.openModal(b.dataset.modal,b.dataset.message||'This AitherTech feature is ready for the next integration step.')));

// Dashboard demo state
const panels={overview:['Overview','AitherTech platform overview and system status.'],devices:['My Devices','Manage connected Aither devices, firmware, and status.'],cloud:['Aither Cloud','Review storage, backups, media, logs, and cloud services.'],security:['Security Settings','Manage authentication, two-factor protection, API keys, and audit controls.'],billing:['Billing','Manage plans, invoices, licenses, and payment settings.']};$$('[data-panel]').forEach(b=>b.addEventListener('click',()=>{$$('.side button,.sidebar button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const data=panels[b.dataset.panel]||panels.overview;$('#dash-title')&&($('#dash-title').textContent=data[0]);$('#dash-copy')&&($('#dash-copy').textContent=data[1])}));

// Theme switcher
const themeKey='aither-theme',saved=localStorage.getItem(themeKey);if(saved==='light')body.classList.add('light');const holder=$('.tools')||$('.navtools');if(holder&&!$('.theme-toggle')){const t=document.createElement('button');t.className='icon theme-toggle';t.type='button';t.title='Toggle appearance';t.setAttribute('aria-label','Toggle appearance');t.textContent=body.classList.contains('light')?'☾':'☼';holder.insertBefore(t,holder.firstChild);t.onclick=()=>{body.classList.toggle('light');const light=body.classList.contains('light');localStorage.setItem(themeKey,light?'light':'dark');t.textContent=light?'☾':'☼'}}

// Reveal-on-scroll
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='none';io.unobserve(e.target)}}),{threshold:.08});$$('.card,.head,.portal,.cta,.domains,.faq,.mock,.hero > div,.platform-card').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(12px)';el.style.transition='opacity .55s ease,transform .55s ease';io.observe(el)})}

// Active navigation
const navLinks=$$('.links a[href^="#"]'),sections=navLinks.map(a=>$(a.getAttribute('href'))).filter(Boolean);if(sections.length&&'IntersectionObserver'in window){const nio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.removeAttribute('aria-current'));navLinks.find(x=>x.getAttribute('href')==='#'+e.target.id)?.setAttribute('aria-current','true')}}),{rootMargin:'-30% 0px -60%'});sections.forEach(s=>nio.observe(s))}

// Keyboard handling
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();searchOverlay?.classList.remove('open');drawer?.classList.remove('open');menu?.setAttribute('aria-expanded','false');body.style.overflow=''}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();window.openSearch()}});
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
})();