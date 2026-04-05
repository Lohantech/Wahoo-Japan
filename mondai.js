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
    widgetBtn:'Widgets',widgetTitle:'Available Widgets',widgetDrag:'Drag to reorder on screen',
    
    
    wWeatherName:'Weather',wWeatherDesc:'Local weather forecast',
    wLineDesc:'Quick access to LINE',
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
    widgetBtn:'ウィジェット',widgetTitle:'利用可能なウィジェット',widgetDrag:'ドラッグして並べ替え',
    
    
    wWeatherName:'天気',wWeatherDesc:'ローカル天気予報',
    wLineDesc:'LINEへのクイックアクセス',
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
  'yahoo-jp':{name:'Yahoo! Japan',url:'https://search.yahoo.co.jp/search?p={q}'},
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
  widgets:{
    order:['weather','line'],
    weather:{enabled:false},
    line:{enabled:false},
  },
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
  document.getElementById('orbs').style.display = vis ? '' : 'none';
  document.getElementById('toggle-overlay')?.classList.toggle('on', vis);
}
/* ═══════════════════════════════════════════════════
   Season Glow
═══════════════════════════════════════════════════ */

function toggleOverlay(){
  st.overlay = !st.overlay;
  document.getElementById('toggle-overlay').classList.toggle('on', st.overlay);
  document.getElementById('season-overlay').style.display = st.overlay ? '' : 'none';
  document.getElementById('orbs').style.display = st.overlay ? '' : 'none';
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
  if(!e.target.closest('.panel-wrap')&&!e.target.closest('#modal-inner'))closeAll();
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
  document.getElementById('s-btn').textContent=L.searchBtn;
}

/* ═══════════════════════════════════════════════════
   CLOCK (uses st.timezone)
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
function doSearch(){const q=document.getElementById('s-input').value.trim();if(q)window.open(buildURL(q),'_blank');}
let sugT;
function handleInput(){
  clearTimeout(sugT);
  const q=document.getElementById('s-input').value.trim();
  if(!q){hideSug();return;}
  sugT=setTimeout(()=>showSug(q),200);
}
function showSug(q){
  const jp=st.lang==='jp', pfx=T[st.lang].sugPfx;
  const html=pfx.slice(0,4).map(p=>{const t=jp?q+p:p+' '+q;return`<div class="sug" onclick="pickSug('${t.replace(/'/g,"\\'")}')"><span class="sug-ic">🔍</span>${t}</div>`;}).join('');
  const box=document.getElementById('suggestions');
  box.innerHTML=html; box.classList.add('show');
}
function hideSug(){document.getElementById('suggestions').classList.remove('show');}
function pickSug(t){document.getElementById('s-input').value=t;hideSug();doSearch();}
document.addEventListener('click',e=>{if(!e.target.closest('#search-box')&&!e.target.closest('#suggestions'))hideSug();});

/* ═══════════════════════════════════════════════════
   SEASON
═══════════════════════════════════════════════════ */
const SP={
  default:[],
  printemps:['🌸','🌺','🌸','🌷','✿'],
  ete:['☀️','✨','🌟','⭐','🌻'],
  automne:['🍂','🍁','🍂','🍁','🍃'],
  hiver:['❄️','❅','❆','❄️','*'],
};
function setSeason(name,el){
  document.querySelectorAll('.spill').forEach(p=>p.classList.remove('sel'));
  if(el) el.classList.add('sel');
  document.body.className=document.body.className.replace(/season-\S+/g,'').trim()+' season-'+name;
  if(st.wallpaper!=='none') document.body.classList.add('has-wallpaper');
  if(st.mode==='light') document.body.classList.add('mode-light');
  st.season=name; spawnParticles(name); spawnOrbs(); save();
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
function spawnOrbs(){
  const c=document.getElementById('orbs'); c.innerHTML='';
  const cs=getComputedStyle(document.body);
  const cols=[cs.getPropertyValue('--orb1').trim(),cs.getPropertyValue('--orb2').trim(),cs.getPropertyValue('--orb3').trim()];
  const count = st.season==='default'?5:7;
  for(let i=0;i<count;i++){
    const o=document.createElement('div'); o.className='orb';
    const sz=160+Math.random()*260;
    o.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;background:${cols[i%3]};animation-duration:${16+Math.random()*22}s;animation-delay:-${Math.random()*20}s`;
    c.appendChild(o);
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
  // Correction pour les presets t1.png, t2.png...
  lay.style.backgroundImage = `url('${wp}')`;   // sans ./ cette fois
  lay.classList.add('active');
  document.body.classList.add('has-wallpaper');
  console.log('Wallpaper set to:', wp);   // ← pour voir dans la console
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
  const f=e.target.files[0]; if(!f||_pendingSlot<0)return;
  const r=new FileReader();
  r.onload=ev=>{
    st.customSlots[_pendingSlot]=ev.target.result;
    saveSlot(_pendingSlot,ev.target.result);
    _pendingSlot=-1;
    renderCustomSlots();
    activateSlot(st.customSlots.findLastIndex(s=>s!==null));
  };
  r.readAsDataURL(f);
}

function activateSlot(i){
  if(!st.customSlots[i])return;
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
    setWP('none',noneEl);
  }
  st.customSlots[i]=null;
  try{localStorage.removeItem(`_sp_u${i}`);}catch(e){}
  renderCustomSlots();
  save();
}

/* ═══════════════════════════════════════════════════
   WIDGETS – TOGGLE PANEL
═══════════════════════════════════════════════════ */
function toggleWidget(name){
  st.widgets[name].enabled = !st.widgets[name].enabled;
  const tog=document.getElementById('toggle-'+name);
  if(tog) tog.classList.toggle('on', st.widgets[name].enabled);
  renderWidgetBoard();
  save();
}

/* ═══════════════════════════════════════════════════
   WIDGET BOARD – RENDER
═══════════════════════════════════════════════════ */
function renderWidgetBoard(){
  const board=document.getElementById('widget-board');
  board.innerHTML='';
  const enabled=st.widgets.order.filter(n=>st.widgets[n]&&st.widgets[n].enabled);
  if(!enabled.length){
    board.classList.remove('active');
    return;
  }
  board.classList.add('active');
  enabled.forEach(name=>{
    const card = name==='weather' ? createWeatherCard() : createLineCard();
    board.appendChild(card);
  });
  initDragDrop();
}

/* ═══════════════════════════════════════════════════
   WEATHER WIDGET
═══════════════════════════════════════════════════ */
let _wxScriptLoaded = false;

function createWeatherCard(){
  const card = document.createElement('div');
  card.className = 'widget-card weather-card';
  card.dataset.widget = 'weather';
  card.draggable = true;

  const title = st.lang === 'jp' ? '🌤 天気' : '🌤 Weather';

  // NOUVELLE VERSION avec WeatherWidget.io (plus stable)
  // Remplace le contenu ci-dessous par ton propre code généré sur weatherwidget.io
  card.innerHTML = `
    <div class="wc-header">
      <span class="wc-drag">⠿</span>
      <span>${title}</span>
      <span class="wc-close" onclick="toggleWidget('weather')">✕</span>
    </div>
    <div class="wc-body wc-body-embed">
      <!-- === METS ICI TON CODE EMBED GÉNÉRÉ SUR https://weatherwidget.io/ === -->
      <a class="weatherwidget-io" href="https://forecast7.com/en/" data-label_1="YOUR CITY" data-label_2="WEATHER" data-theme="original" >YOUR CITY WEATHER</a>
      <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
      </script>
      <!-- ================================================================== -->
    </div>`;

  return card;
}


/* ═══════════════════════════════════════════════════
   LINE WIDGET
═══════════════════════════════════════════════════ */
function createLineCard(){
  const card = document.createElement('div');
  card.className = 'widget-card glass';
  card.dataset.widget = 'line';
  card.draggable = true;

  card.innerHTML = `
    <div class="wc-header">
      <span class="wc-drag">⠿</span>
      <span>💬 LINE</span>
      <span class="wc-close" onclick="toggleWidget('line')">✕</span>
    </div>
    <div class="wc-body">
      <div class="line-brand">
        <div class="line-icon-wrap">💬</div>
        <div class="line-brand-name">LINE</div>
      </div>
      <a class="line-open-btn" href="https://web.line.me" target="_blank" rel="noopener noreferrer">
        ${st.lang==='jp' ? 'LINEを開く ↗' : 'Open LINE ↗'}
      </a>
      <div class="line-note">
        ${st.lang==='jp' 
          ? 'LINEのメッセージはブラウザから直接表示できません。<br>「LINEを開く」でWeb版に移動します。' 
          : 'LINE messages cannot be displayed directly in the browser.<br>Click to open LINE Web version.'}
      </div>
    </div>`;
  return card;
}

/* ═══════════════════════════════════════════════════
   DRAG & DROP (widget board)
═══════════════════════════════════════════════════ */
function initDragDrop(){
  const board=document.getElementById('widget-board');
  let dragged=null;

  board.querySelectorAll('.widget-card').forEach(card=>{
    card.addEventListener('dragstart',e=>{
      dragged=card;
      setTimeout(()=>card.classList.add('dragging'),0);
      e.dataTransfer.effectAllowed='move';
    });
    card.addEventListener('dragend',()=>{
      card.classList.remove('dragging');
      board.querySelectorAll('.widget-card').forEach(c=>c.classList.remove('drag-over'));
      dragged=null;
      // save new order
      const newOrder=[...board.querySelectorAll('.widget-card')].map(c=>c.dataset.widget);
      // merge with existing non-enabled widgets at end
      const all=st.widgets.order;
      const notShown=all.filter(n=>!newOrder.includes(n));
      st.widgets.order=[...newOrder,...notShown];
      save();
    });
    card.addEventListener('dragover',e=>{
      e.preventDefault();
      if(dragged&&dragged!==card){
        card.classList.add('drag-over');
        const board2=card.parentNode;
        const cards=[...board2.querySelectorAll('.widget-card')];
        const dragIdx=cards.indexOf(dragged);
        const targetIdx=cards.indexOf(card);
        if(dragIdx<targetIdx) board2.insertBefore(dragged,card.nextSibling);
        else board2.insertBefore(dragged,card);
      }
    });
    card.addEventListener('dragleave',e=>{
      if(!card.contains(e.relatedTarget)) card.classList.remove('drag-over');
    });
    card.addEventListener('drop',e=>{
      e.preventDefault();
      card.classList.remove('drag-over');
    });
  });
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
    widgets:{order:st.widgets.order,weather:{enabled:st.widgets.weather.enabled},line:{enabled:st.widgets.line.enabled}},
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
      widgets:{
        order:st.widgets.order,
        weather:{enabled:st.widgets.weather.enabled},
        line:{enabled:st.widgets.line.enabled},
      },
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
   APPLY STATE (used by load & import)
═══════════════════════════════════════════════════ */
function applyState(d){
  // ── custom slots ──
  if(Array.isArray(d.customSlots)){
    d.customSlots.forEach((img,i)=>{
      if(img&&i<5){ st.customSlots[i]=img; saveSlot(i,img); }
    });
  }
  // ── language ──
  if(d.lang){
    st.lang=d.lang;
    const el=document.querySelector(`[data-lang="${d.lang}"]`);
    if(el){document.querySelectorAll('[data-lang]').forEach(r=>r.classList.remove('sel'));el.classList.add('sel');}
  }
  // ── timezone ──
  st.tzLocked=!!d.tzLocked;
  if(d.timezone) st.timezone=d.timezone;
  else if(!st.tzLocked) st.timezone=st.lang==='jp'?'Asia/Tokyo':'Europe/London';
  updateTZLabel();
  // ── engine ──
  if(d.engine){
    st.engine=d.engine;
    const el=document.querySelector(`[data-eng="${d.engine}"]`);
    if(el){document.querySelectorAll('[data-eng]').forEach(r=>r.classList.remove('sel'));el.classList.add('sel');}
  }
  if(d.custom){st.custom=d.custom;ENGINES.custom=d.custom;}
  const eng=ENGINES[st.engine]||st.custom;
  if(eng) document.getElementById('eng-name').textContent=eng.name;
  // ── season ──
  const sEl=document.querySelector(`.spill[data-s="${d.season||'default'}"]`);
  setSeason(d.season||'default',sEl);
  // ── wallpaper ──
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
  // ── mode ──
  if(d.mode) st.mode=d.mode;
  if(d.overlay !== undefined) st.overlay = !!d.overlay;
  applyMode();
  // ── widgets ──
  if(d.widgets){
    if(Array.isArray(d.widgets.order)) st.widgets.order=d.widgets.order;
    if(d.widgets.weather) st.widgets.weather={...st.widgets.weather,...d.widgets.weather};
    if(d.widgets.line) st.widgets.line={...st.widgets.line,...d.widgets.line};
  }
  // sync toggle buttons
  ['weather','line'].forEach(n=>{
    const el=document.getElementById('toggle-'+n);
    if(el) el.classList.toggle('on',!!(st.widgets[n]&&st.widgets[n].enabled));
  });
  renderWidgetBoard();
  // ── finish ──
  applyLang();
  renderCustomSlots();
  save();
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
function init(){
  loadSlots();
  try{
    const d=JSON.parse(localStorage.getItem('_sp')||'{}');
    applyState(d);
  }catch(e){
    applyState({});
  }
  spawnOrbs();
  spawnParticles(st.season);
  updateClock();
}
init();
