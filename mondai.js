/* ═══════════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════════ */
const T = {
  en:{
    persoBtn:'Personalise',settingsBtn:'Settings',
    seasonTitle:'Season Theme',
    tDefault:'Default',tSpring:'🌸 Spring',tSummer:'☀️ Summer',tAutumn:'🍂 Autumn',tWinter:'❄️ Winter',
    wpTitle:'Wallpaper',wpDefault:'Default',
    myPhotosTitle:'My Photos (5 slots)',
    engineTitle:'Search Engine',eCustom:'Other engine…',
    langTitle:'Language',
    tzTitle:'Timezone',tzSearch:'Search timezone…',tzReset:'Auto',
    backupTitle:'Backup',exportBtn:'Export settings',importBtn:'Import settings',
    placeholder:'Search…',searchBtn:'Search',
    via:'via',footerLeft:'2025 - 2026 © Wahoo! Japan — We respect your privacy. You can reset to default anytime. For more information, visit:',footerRight:'❓Help',
    greetMorn:'Good morning',greetAfter:'Good afternoon',greetEve:'Good evening',greetNight:'Good night',
    modalTitle:'🔧 Custom Engine',
    modalDesc:'Enter the search URL with {searchTerms} in place of your query.',
    modalExample:'e.g. https://search.example.com/?q={searchTerms}',
    modalUrlPh:'https://…?q={searchTerms}',modalNamePh:'Engine name (e.g. Qwant)',
    modalCancel:'Cancel',modalSave:'Save',
    sugPfx:['Search','How to','What is','News about'],
    dateFn:d=>d.toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'}),
    shortcutsTitle:'Shortcuts' ,addShortcut:'Add Shortcut' ,shortcutModalTitle:'🔗 New Shortcut' ,IconShortcut:'📁 Icon (optional)' ,modalCancel:'Cancel',modalSave:'Save'
  },
  jp:{
    persoBtn:'パーソナライズ',settingsBtn:'設定',
    seasonTitle:'季節テーマ',
    tDefault:'デフォルト',tSpring:'🌸 春',tSummer:'☀️ 夏',tAutumn:'🍂 秋',tWinter:'❄️ 冬',
    wpTitle:'壁紙',wpDefault:'デフォルト',
    myPhotosTitle:'マイ写真（5枠）',
    engineTitle:'検索エンジン',eCustom:'他のエンジン…',
    langTitle:'言語',
    tzTitle:'タイムゾーン',tzSearch:'タイムゾーンを検索…',tzReset:'自動',
    backupTitle:'バックアップ',exportBtn:'設定をエクスポート',importBtn:'設定をインポート',
    placeholder:'検索…',searchBtn:'検索',
    via:'経由',footerLeft:'2025 - 2026 © Wahoo! Japan — あなたのプライバシーを尊重します。いつでもデフォルト設定に戻せます。詳細はこちら：',footerRight:'❓ヘルプ',
    greetMorn:'おはようございます',greetAfter:'こんにちは',greetEve:'こんばんは',greetNight:'おやすみなさい',
    modalTitle:'🔧 カスタムエンジン',
    modalDesc:'クエリの代わりに {searchTerms} を含む検索URLを入力してください。',
    modalExample:'例: https://search.example.com/?q={searchTerms}',
    modalUrlPh:'https://…?q={searchTerms}',modalNamePh:'エンジン名（例：Qwant）',
    modalCancel:'キャンセル',modalSave:'保存',
    sugPfx:['を調べる','とは何ですか','の使い方','最新情報'],
    dateFn:d=>`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日（${['日','月','火','水','木','金','土'][d.getDay()]}）`,
    shortcutsTitle:'ショートカット' ,addShortcut:'ショートカットを追加' ,shortcutModalTitle:'🔗 新しいショートカット' ,IconShortcut:'📁 アイコン（任意）' ,modalCancel:'キャンセル',modalSave:'保存',
  }
};

/* ═══════════════════════════════════════════════════
   TIMEZONE DATA
═══════════════════════════════════════════════════ */
const ALL_TZ = (()=>{
  try{ return Intl.supportedValuesOf('timeZone'); }catch(e){}
  return ['Africa/Abidjan','Africa/Accra','Africa/Cairo','Africa/Casablanca','Africa/Johannesburg','Africa/Lagos','Africa/Nairobi','Africa/Tunis','America/Anchorage','America/Bogota','America/Buenos_Aires','America/Caracas','America/Chicago','America/Denver','America/Halifax','America/Lima','America/Los_Angeles','America/Mexico_City','America/New_York','America/Phoenix','America/Santiago','America/Sao_Paulo','America/St_Johns','America/Toronto','America/Vancouver','Asia/Almaty','Asia/Baghdad','Asia/Bangkok','Asia/Colombo','Asia/Dhaka','Asia/Dubai','Asia/Ho_Chi_Minh','Asia/Hong_Kong','Asia/Jakarta','Asia/Jerusalem','Asia/Kabul','Asia/Karachi','Asia/Kathmandu','Asia/Kolkata','Asia/Kuala_Lumpur','Asia/Kuwait','Asia/Manila','Asia/Muscat','Asia/Qatar','Asia/Riyadh','Asia/Seoul','Asia/Shanghai','Asia/Singapore','Asia/Taipei','Asia/Tashkent','Asia/Tehran','Asia/Tokyo','Asia/Ulaanbaatar','Atlantic/Azores','Atlantic/Cape_Verde','Atlantic/Reykjavik','Australia/Adelaide','Australia/Brisbane','Australia/Darwin','Australia/Hobart','Australia/Melbourne','Australia/Perth','Australia/Sydney','Europe/Amsterdam','Europe/Athens','Europe/Belgrade','Europe/Berlin','Europe/Brussels','Europe/Bucharest','Europe/Budapest','Europe/Copenhagen','Europe/Dublin','Europe/Helsinki','Europe/Istanbul','Europe/Kiev','Europe/Lisbon','Europe/London','Europe/Madrid','Europe/Moscow','Europe/Oslo','Europe/Paris','Europe/Prague','Europe/Rome','Europe/Sofia','Europe/Stockholm','Europe/Vienna','Europe/Warsaw','Europe/Zurich','Pacific/Auckland','Pacific/Fiji','Pacific/Guam','Pacific/Honolulu','Pacific/Noumea','Pacific/Port_Moresby','Pacific/Tongatapu','UTC'];
})();

function tzOffset(tz){
  try{
    const now=new Date();
    const local=new Date(now.toLocaleString('en-US',{timeZone:tz}));
    const utc=new Date(now.toLocaleString('en-US',{timeZone:'UTC'}));
    const diff=Math.round((local-utc)/60000);
    const s=diff>=0?'+':'-';
    const h=String(Math.floor(Math.abs(diff)/60)).padStart(2,'0');
    const m=String(Math.abs(diff)%60).padStart(2,'0');
    return `UTC${s}${h}:${m}`;
  }catch(e){return '';}
}

function filterTZ(q){
  q=(q||'').toLowerCase().trim();
  const list=document.getElementById('tz-list');
  const filtered=q?ALL_TZ.filter(z=>z.toLowerCase().includes(q)):ALL_TZ.filter((_,i)=>i<50);
  if(!filtered.length){list.classList.remove('show');return;}
  list.innerHTML=filtered.slice(0,80).map(z=>{
    const isSel=z===st.timezone;
    return `<div class="tz-item${isSel?' sel':''}" onclick="selectTZ('${z}')">
      <span>${z.replace(/_/g,' ')}</span>
      <span class="tz-offset">${tzOffset(z)}</span>
    </div>`;
  }).join('');
  list.classList.add('show');
}

function selectTZ(tz){
  st.timezone=tz; st.tzLocked=true;
  updateTZLabel();
  document.getElementById('tz-list').classList.remove('show');
  document.getElementById('tz-search').value='';
  save();
}

function resetTZ(){
  st.tzLocked=false;
  st.timezone=st.lang==='jp'?'Asia/Tokyo':'Europe/London';
  updateTZLabel(); save();
}

function updateTZLabel(){
  const off=tzOffset(st.timezone);
  document.getElementById('tz-cur-label').textContent=st.timezone.replace(/_/g,' ')+(off?' ('+off+')':'');
  document.getElementById('tz-badge').textContent=st.timezone.replace(/_/g,' ')+' '+off;
}

document.addEventListener('click',e=>{
  if(!e.target.closest('#param-panel'))
    document.getElementById('tz-list').classList.remove('show');
});

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
const ENGINES={
  google:    {name:'Google',      url:'https://www.google.com/search?q={q}&hl={l}'},
  yahoojp:  {name:'Yahoo! Japan',  url:'https://search.yahoo.co.jp/search?p={q}'},
  bing:      {name:'Bing',        url:'https://www.bing.com/search?q={q}&setlang={l}'},
  yahoo:     {name:'Yahoo! (USA)',url:'https://search.yahoo.com/search?p={q}'},
  duckduckgo:{name:'DuckDuckGo',  url:'https://duckduckgo.com/?q={q}'},
  ecosia:    {name:'Ecosia',      url:'https://www.ecosia.org/search?q={q}'},
};

let st={
  lang:'en', engine:'google', season:'default',
  wallpaper:'none', custom:null, panel:null,
  timezone:'Europe/London', tzLocked:false,
  customSlots:[null,null,null,null,null],
  mode:'light',
  overlay:true,
  shortcuts:[],
};
let _pendingSlot=-1;

/* ═══════════════════════════════════════════════════
   DARK / LIGHT MODE
═══════════════════════════════════════════════════ */
function toggleMode(){
  st.mode = st.mode==='dark'?'light':'dark';
  applyMode();
  save();
}

function applyMode(){
  const isLight = st.mode==='light';
  document.body.classList.toggle('mode-light', isLight);
  const btn = document.getElementById('mode-btn');
  if(btn) btn.textContent = isLight ? '☀️' : '🌙';
  const vis = st.overlay;
  document.getElementById('season-overlay').style.display = vis ? '' : 'none';
  document.getElementById('toggle-overlay')?.classList.toggle('on', vis);
}

/* ═══════════════════════════════════════════════════
   Season Glow
═══════════════════════════════════════════════════ */
function toggleOverlay(){
  st.overlay = !st.overlay;
  document.getElementById('toggle-overlay').classList.toggle('on', st.overlay);
  document.getElementById('season-overlay').style.display = st.overlay ? '' : 'none';
  save();
}

/* ═══════════════════════════════════════════════════
   PANELS
═══════════════════════════════════════════════════ */
function togglePanel(n){
  if(st.panel===n){closeAll();}
  else{closeAll();st.panel=n;document.getElementById(n+'-panel').classList.add('open');}
}
function closeAll(){
  st.panel=null;
  document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('open'));
}
document.addEventListener('click',e=>{
  if(!document.contains(e.target)) return;
  if(!e.target.closest('.panel-wrap')&&!e.target.closest('#modal-inner')&&!e.target.closest('#shortcut-modal'))closeAll();
});

/* ═══════════════════════════════════════════════════
   LANGUAGE
═══════════════════════════════════════════════════ */
function setLang(lang,el){
  st.lang=lang;
  document.querySelectorAll('[data-lang]').forEach(r=>r.classList.remove('sel'));
  if(el) el.classList.add('sel');
  if(!st.tzLocked) st.timezone=lang==='jp'?'Asia/Tokyo':'Europe/London';
  updateTZLabel();
  applyLang();
  save();
}

function applyLang(){
  const L=T[st.lang];
  document.documentElement.lang=st.lang==='jp'?'ja':'en';
  document.querySelectorAll('[data-t]').forEach(el=>{
    const k=el.getAttribute('data-t');
    if(L[k]!==undefined) el.textContent=L[k];
  });
  document.querySelectorAll('[data-t-inner]').forEach(el=>{
    const k=el.getAttribute('data-t-inner');
    if(L[k]!==undefined) el.textContent=L[k];
  });
  document.querySelectorAll('[data-t-placeholder]').forEach(el=>{
    const k=el.getAttribute('data-t-placeholder');
    if(L[k]!==undefined) el.placeholder=L[k];
  });
  document.getElementById('s-input').placeholder=L.placeholder;
  document.getElementById('s-btn-label').textContent=L.searchBtn;
}

/* ═══════════════════════════════════════════════════
   CLOCK
═══════════════════════════════════════════════════ */
function updateClock(){
  const tz=st.timezone, now=new Date();
  try{
    const tp=new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(now);
    const get=t=>tp.find(p=>p.type===t)?.value??'00';
    document.getElementById('clock').textContent=`${get('hour')}:${get('minute')}:${get('second')}`;
    const ld=new Date(now.toLocaleString('en-US',{timeZone:tz}));
    document.getElementById('date-line').textContent=T[st.lang].dateFn(ld);
    const h=parseInt(new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'numeric',hour12:false}).format(now),10);
    const L=T[st.lang];
    document.getElementById('greeting').textContent=h>=5&&h<12?L.greetMorn:h<17?L.greetAfter:h<22?L.greetEve:L.greetNight;
  }catch(e){}
}
setInterval(updateClock,1000);

/* ═══════════════════════════════════════════════════
   ENGINE
═══════════════════════════════════════════════════ */
function setEng(el){
  document.querySelectorAll('[data-eng]').forEach(r=>r.classList.remove('sel'));
  el.classList.add('sel'); st.engine=el.dataset.eng;
  const e=ENGINES[st.engine]||st.custom;
  document.getElementById('eng-name').textContent=e?e.name:st.engine;
  save();
}
function openModal(){closeAll();document.getElementById('modal').classList.add('show');}
function closeModal(){document.getElementById('modal').classList.remove('show');}
function saveCustomEng(){
  const url=document.getElementById('m-url').value.trim();
  const name=document.getElementById('m-name').value.trim()||'Custom';
  if(!url||!url.includes('{searchTerms}')){alert('URL must contain {searchTerms}');return;}
  st.custom={name,url:url.replace('{searchTerms}','{q}')};
  ENGINES.custom=st.custom; st.engine='custom';
  document.querySelectorAll('[data-eng]').forEach(r=>r.classList.remove('sel'));
  const cEl=document.querySelector('[data-eng="custom"]');
  cEl.classList.add('sel'); cEl.querySelector('em').textContent=name;
  document.getElementById('eng-name').textContent=name;
  closeModal(); save();
}

/* ═══════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════ */
function buildURL(q){
  const l=st.lang==='jp'?'ja':'en';
  const e=ENGINES[st.engine]||st.custom;
  if(!e) return 'https://www.google.com/search?q='+encodeURIComponent(q);
  return e.url.replace('{q}',encodeURIComponent(q)).replace(/{l}/g,l);
}
function doSearch(){const q=document.getElementById('s-input').value.trim();if(q)window.location.href=buildURL(q);}
let sugT;
function handleInput(){
  clearTimeout(sugT);
  const q=document.getElementById('s-input').value.trim();
  if(!q){hideSug();return;}
  sugT=setTimeout(()=>showSug(q),200);
}

/* ═══════════════════════════════════════════════════
   SEASON
═══════════════════════════════════════════════════ */
const SP={
  default:[],
  printemps:['🌸','🌺','🌸','🌷','🌼'],
  ete:['☀️','✨','🌟','⭐','🌻'],
  automne:['🍂','🍁','🍂','🍁','🍃'],
  hiver:['❄️','🛷','☃️','❄️','⛄'],
};

function setSeason(name, el) {
  document.querySelectorAll('.spill').forEach(p => p.classList.remove('sel'));
  if (el) el.classList.add('sel');
  st.season = name;                          
  document.body.className = document.body.className.replace(/season-\S+/g, '').trim() + ' season-' + name;
  if (st.wallpaper !== 'none') document.body.classList.add('has-wallpaper');
  if (st.mode === 'light') document.body.classList.add('mode-light');
  spawnParticles(name);                      
  save();                                   
}

function spawnParticles(s){
  const c=document.getElementById('particles'); c.innerHTML='';
  const em=SP[s]; if(!em.length) return;
  const count = s==='printemps'?22:s==='hiver'?26:18;
  for(let i=0;i<count;i++){
    const el=document.createElement('div'); el.className='particle';
    el.textContent=em[i%em.length];
    el.style.cssText=`left:${Math.random()*100}%;font-size:${12+Math.random()*16}px;animation-duration:${7+Math.random()*13}s;animation-delay:-${Math.random()*14}s;--dx:${(Math.random()-.5)*130}px;opacity:${.55+Math.random()*.45}`;
    c.appendChild(el);
  }
}

/* ═══════════════════════════════════════════════════
   WALLPAPER – presets
═══════════════════════════════════════════════════ */
function setWP(wp,el){
  document.querySelectorAll('.wp-t,.cslot').forEach(t=>t.classList.remove('sel'));
  if(el) el.classList.add('sel');
  st.wallpaper=wp;
  const lay=document.getElementById('wp-layer');
  if(wp==='none'){
    lay.classList.remove('active');
    document.body.classList.remove('has-wallpaper');
    lay.style.backgroundImage='';
  } else {
    lay.style.backgroundImage = `url('${wp}')`;
    lay.classList.add('active');
    document.body.classList.add('has-wallpaper');
  }
  save();
}

/* ═══════════════════════════════════════════════════
   CUSTOM PHOTO SLOTS
═══════════════════════════════════════════════════ */
function renderCustomSlots(){
  const grid=document.getElementById('custom-slots-grid');
  grid.innerHTML='';
  for(let i=0;i<5;i++){
    const data=st.customSlots[i];
    const isActive=st.wallpaper===`u${i}`;
    if(data){
      const d=document.createElement('div');
      d.className='cslot filled'+(isActive?' sel':'');
      d.dataset.slot=i;
      d.innerHTML=`<img src="${data}" alt="Photo ${i+1}"><div class="cslot-del" onclick="deleteSlot(event,${i})">✕</div>`;
      d.onclick=()=>activateSlot(i);
      grid.appendChild(d);
    } else {
      const d=document.createElement('div');
      d.className='cslot empty';
      d.innerHTML='<span class="cslot-plus">＋</span>';
      d.onclick=()=>openSlotPicker(i);
      grid.appendChild(d);
    }
  }
}

function openSlotPicker(i){
  _pendingSlot=i;
  document.getElementById('slot-file').value='';
  document.getElementById('slot-file').click();
}

function onSlotFile(e){
  const f=e.target.files[0]; 
  if(!f || _pendingSlot<0) return;
  const r=new FileReader();
  r.onload=ev=>{
    const savedSlot = _pendingSlot;         
    st.customSlots[savedSlot]=ev.target.result;
    saveSlot(savedSlot, ev.target.result);
    _pendingSlot=-1;
    renderCustomSlots();
    activateSlot(savedSlot);
    save();
  };
  r.readAsDataURL(f);
}

function activateSlot(i){
  if(!st.customSlots[i]) return;
  document.querySelectorAll('.wp-t,.cslot').forEach(t=>t.classList.remove('sel'));
  st.wallpaper=`u${i}`;
  const lay=document.getElementById('wp-layer');
  lay.style.backgroundImage = `url('${st.customSlots[i]}')`;
  lay.classList.add('active');
  document.body.classList.add('has-wallpaper');
  renderCustomSlots();
  save();
}

function deleteSlot(evt,i){
  evt.stopPropagation();
  if(st.wallpaper===`u${i}`){
    const noneEl=document.querySelector('.wp-t[data-wp="none"]');
    setWP('none', noneEl);
  }
  st.customSlots[i]=null;
  try{ localStorage.removeItem(`_sp_u${i}`); }catch(e){}
  renderCustomSlots();
  save();
}

/* ═══════════════════════════════════════════════════
   EXPORT / IMPORT
═══════════════════════════════════════════════════ */
function exportSave(){
  const payload={
    engine:st.engine, lang:st.lang, season:st.season,
    wallpaper:st.wallpaper, custom:st.custom,
    timezone:st.timezone, tzLocked:st.tzLocked,
    customSlots:st.customSlots,
    mode:st.mode,
    overlay:st.overlay,
    shortcuts:st.shortcuts||[],
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='homepage-settings.json';
  a.click(); URL.revokeObjectURL(a.href);
}

function importSave(e){
  const f=e.target.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    try{ applyState(JSON.parse(ev.target.result)); }
    catch(err){ alert('Invalid settings file.'); }
  };
  r.readAsText(f);
  e.target.value='';
}

/* ═══════════════════════════════════════════════════
   PERSIST
═══════════════════════════════════════════════════ */
function save(){
  try{
    localStorage.setItem('_sp',JSON.stringify({
      engine:st.engine, lang:st.lang, season:st.season,
      wallpaper:st.wallpaper, custom:st.custom,
      timezone:st.timezone, tzLocked:st.tzLocked,
      mode:st.mode,
      overlay: st.overlay,
    }));
  }catch(err){}
}
function saveSlot(i,data){try{localStorage.setItem(`_sp_u${i}`,data);}catch(e){}}
function loadSlots(){
  for(let i=0;i<5;i++){
    try{const d=localStorage.getItem(`_sp_u${i}`);if(d)st.customSlots[i]=d;}catch(e){}
  }
}

/* ═══════════════════════════════════════════════════
   APPLY STATE
═══════════════════════════════════════════════════ */
function applyState(d){
  if(Array.isArray(d.customSlots)){
    d.customSlots.forEach((img,i)=>{
      if(img && i<5){ st.customSlots[i]=img; saveSlot(i,img); }
    });
  }
  if(d.lang){
    st.lang=d.lang;
    const el=document.querySelector(`[data-lang="${d.lang}"]`);
    if(el){document.querySelectorAll('[data-lang]').forEach(r=>r.classList.remove('sel'));el.classList.add('sel');}
  }
  st.tzLocked=!!d.tzLocked;
  if(d.timezone) st.timezone=d.timezone;
  else if(!st.tzLocked) st.timezone=st.lang==='jp'?'Asia/Tokyo':'Europe/London';
  updateTZLabel();
  if(d.engine){
    st.engine=d.engine;
    const el=document.querySelector(`[data-eng="${d.engine}"]`);
    if(el){document.querySelectorAll('[data-eng]').forEach(r=>r.classList.remove('sel'));el.classList.add('sel');}
  }
  if(d.custom){st.custom=d.custom;ENGINES.custom=d.custom;}
  const eng=ENGINES[st.engine]||st.custom;
  if(eng) document.getElementById('eng-name').textContent=eng.name;
  const sEl=document.querySelector(`.spill[data-s="${d.season||'default'}"]`);
  setSeason(d.season||'default',sEl);
  const wp=d.wallpaper||'none';
  const isSlot=/^u[0-4]$/.test(wp);
  if(isSlot){
    const idx=parseInt(wp[1]);
    if(st.customSlots[idx]) activateSlot(idx);
    else setWP('none',document.querySelector('.wp-t[data-wp="none"]'));
  } else {
    const el=document.querySelector(`.wp-t[data-wp="${wp}"]`);
    setWP(wp,el);
  }
  if(d.mode) st.mode=d.mode;
  if(d.overlay !== undefined) st.overlay = !!d.overlay;
  applyMode();
  applyLang();
  renderCustomSlots();
  if(Array.isArray(d.shortcuts)){
    st.shortcuts=d.shortcuts;
    saveShortcuts();
  }
  renderShortcuts();
  save();
}

/* ═══════════════════════════════════════════════════
   SHORTCUTS
═══════════════════════════════════════════════════ */
let _scIconData=null;

function openShortcutModal(){
  _scIconData=null;
  document.getElementById('sc-url').value='';
  document.getElementById('sc-name').value='';
  document.getElementById('sc-icon-preview').innerHTML='';
  document.getElementById('sc-icon-file').value='';
  document.getElementById('shortcut-modal').classList.add('show');
}

function closeShortcutModal(){
  document.getElementById('shortcut-modal').classList.remove('show');
}

document.getElementById('sc-icon-file').addEventListener('change',function(e){
  const f=e.target.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    _scIconData=ev.target.result;
    document.getElementById('sc-icon-preview').innerHTML=
      `<img src="${_scIconData}" class="sc-preview-img">`;
  };
  r.readAsDataURL(f);
});

function _scDomainName(url){
  try{
    const h=new URL(url).hostname.replace(/^www\./,'');
    const name=h.split('.')[0];
    return name.charAt(0).toUpperCase()+name.slice(1);
  }catch(e){return 'Site';}
}

function _scFaviconUrl(url){
  try{
    const domain=new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  }catch(e){return null;}
}

function saveShortcut(){
  let url=document.getElementById('sc-url').value.trim();
  if(!url){alert('URL is required.');return;}
  if(!/^https?:\/\//i.test(url)) url='https://'+url;
  const name=document.getElementById('sc-name').value.trim()||_scDomainName(url);
  const sc={
    id:Date.now(),
    url:url,
    name:name,
    icon:_scIconData||_scFaviconUrl(url),
    iconType:_scIconData?'custom':'favicon',
  };
  if(!st.shortcuts) st.shortcuts=[];
  st.shortcuts.push(sc);
  closeShortcutModal();
  renderShortcuts();
  saveShortcuts();
}

function deleteShortcut(id){
  st.shortcuts=(st.shortcuts||[]).filter(s=>s.id!==id);
  renderShortcuts();
  saveShortcuts();
}

function _scIconHtml(sc,size){
  size=size||32;
  const letter=sc.name.charAt(0).toUpperCase();
  if(!sc.icon) return `<span class="sc-letter">${letter}</span>`;
  if(sc.iconType==='custom'){
    return `<img src="${sc.icon}" class="sc-img" style="width:${size}px;height:${size}px">`;
  }
  return `<img src="${sc.icon}" class="sc-img" style="width:${size}px;height:${size}px"
    onerror="this.outerHTML='<span class=\\'sc-letter\\'>${letter}</span>'">`;
}

function renderShortcuts(){
  const cont=document.getElementById('shortcuts-container');
  if(cont){
    cont.innerHTML=(st.shortcuts||[]).map(sc=>
      `<a class="sc-item" href="${sc.url}" target="_blank" title="${sc.name}">
        <div class="sc-icon-wrap">${_scIconHtml(sc,28)}</div>
        <div class="sc-lbl">${sc.name}</div>
      </a>`
    ).join('');
  }
  const list=document.getElementById('shortcuts-list');
  if(list){
    if(!st.shortcuts||!st.shortcuts.length){list.innerHTML='';return;}
    list.innerHTML=(st.shortcuts||[]).map(sc=>
      `<div class="sc-row">
        <div class="sc-row-ic">${_scIconHtml(sc,18)}</div>
        <div class="sc-row-name">${sc.name}</div>
        <button class="sc-row-del" onclick="deleteShortcut(${sc.id})">✕</button>
      </div>`
    ).join('');
  }
}

function saveShortcuts(){
  try{localStorage.setItem('_sp_shortcuts',JSON.stringify(st.shortcuts));}catch(e){}
}

function loadShortcuts(){
  try{
    const d=localStorage.getItem('_sp_shortcuts');
    if(d) st.shortcuts=JSON.parse(d);
  }catch(e){}
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
function init(){
  loadSlots();
  loadShortcuts();
  try{
    const d=JSON.parse(localStorage.getItem('_sp')||'{}');
    applyState(d);
  }catch(e){
    applyState({});
  }
  renderShortcuts();
  spawnParticles(st.season);
  updateClock();
}
init();