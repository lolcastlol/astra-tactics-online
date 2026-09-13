(() => {
  const CONFIG = {
    background: './astra-main-bg.webp',
    backgroundMobile: './astra-main-bg-mobile.webp',
    fadeMs: 520
  };

  const css = `
  #astra-main-menu{
    position:fixed;inset:0;z-index:2147483000;overflow:hidden;
    background:#070a10;color:white;font-family:"Noto Sans KR",system-ui,-apple-system,sans-serif;
    opacity:1;transition:opacity .52s ease,filter .52s ease;
    user-select:none;-webkit-user-select:none;
  }
  #astra-main-menu.astra-leaving{opacity:0;filter:brightness(.42) blur(1.5px);pointer-events:none}

  /* Desktop keeps the existing 16:9 composition exactly as-is. */
  .astra-stage{
    position:absolute;left:50%;top:50%;
    width:max(100vw,177.7778vh);height:max(100vh,56.25vw);
    transform:translate(-50%,-50%);overflow:hidden;
  }
  .astra-bg{
    position:absolute;inset:0;
    background-image:linear-gradient(rgba(1,5,10,.025),rgba(1,5,10,.09)),url('${CONFIG.background}');
    background-position:center;background-size:100% 100%;background-repeat:no-repeat;
    animation:astraBgPulse 8s ease-in-out infinite alternate;
  }
  .astra-vignette{
    position:absolute;inset:0;pointer-events:none;
    background:
      radial-gradient(circle at 50% 47%,transparent 18%,rgba(0,0,0,.04) 50%,rgba(0,0,0,.27) 100%),
      linear-gradient(to bottom,rgba(2,4,10,.02),transparent 34%,rgba(2,4,10,.10));
  }
  .astra-stars,.astra-stars:before,.astra-stars:after{
    content:"";position:absolute;inset:-15%;pointer-events:none;
    background-repeat:repeat;background-size:260px 260px;
    opacity:.18;mix-blend-mode:screen;
  }
  .astra-stars{
    background-image:
      radial-gradient(circle at 22px 31px,rgba(255,244,210,.85) 0 1px,transparent 1.6px),
      radial-gradient(circle at 141px 84px,rgba(210,229,255,.6) 0 1px,transparent 1.7px),
      radial-gradient(circle at 210px 190px,rgba(255,255,255,.55) 0 .8px,transparent 1.4px);
    animation:astraStarDrift 38s linear infinite;
  }
  .astra-stars:before{
    background-size:390px 390px;opacity:.42;transform:translate3d(3%,2%,0);
    background-image:
      radial-gradient(circle at 50px 120px,rgba(255,242,196,.8) 0 1.2px,transparent 2px),
      radial-gradient(circle at 290px 260px,rgba(207,226,255,.7) 0 .9px,transparent 1.8px);
    animation:astraTwinkle 5.8s ease-in-out infinite alternate;
  }
  .astra-stars:after{
    background-size:520px 520px;opacity:.27;
    background-image:radial-gradient(circle at 360px 180px,rgba(255,238,186,.9) 0 1.35px,transparent 2.2px);
    animation:astraTwinkle 7.2s ease-in-out 1s infinite alternate;
  }
  .astra-glow{
    position:absolute;left:50%;top:30%;width:42%;height:22%;
    transform:translate(-50%,-50%);pointer-events:none;
    background:radial-gradient(ellipse,rgba(255,225,155,.12),rgba(125,178,255,.03) 48%,transparent 72%);
    filter:blur(12px);animation:astraGlow 6.2s ease-in-out infinite;
  }

  /* The picture already has its own ornate borders. The real buttons stay invisible,
     so tapping no longer leaves a second rounded rectangle outside the artwork. */
  .astra-hit{
    position:absolute;border:0;background:transparent;cursor:pointer;
    outline:none!important;-webkit-tap-highlight-color:transparent!important;
    touch-action:manipulation;padding:0;
  }
  .astra-hit::after{
    content:"";position:absolute;inset:9%;pointer-events:none;
    opacity:0;border:0;
    background:radial-gradient(ellipse at center,rgba(255,231,178,.12),rgba(255,224,154,.025) 58%,transparent 78%);
    box-shadow:inset 0 0 20px rgba(255,224,154,.06),0 0 18px rgba(236,196,112,.10);
    transition:opacity .14s ease,transform .14s ease,filter .14s ease;
    clip-path:polygon(5% 0,95% 0,100% 18%,100% 82%,95% 100%,5% 100%,0 82%,0 18%);
  }
  @media (hover:hover) and (pointer:fine){
    .astra-hit:hover::after{opacity:.62;filter:brightness(1.12)}
    .astra-hit:focus-visible::after{opacity:.72;filter:brightness(1.18)}
  }
  .astra-hit:active::after{opacity:.78;transform:scale(.975);filter:brightness(1.18)}

  /* Desktop hit zones: tightened to the visible gold frames. */
  .astra-start{left:35.9%;top:53.0%;width:26.9%;height:10.3%}
  .astra-deck{left:35.3%;top:68.8%;width:13.5%;height:6.9%}
  .astra-cards{left:50.0%;top:68.8%;width:13.5%;height:6.9%}
  .astra-settings{left:47.2%;top:78.2%;width:6.0%;height:4.7%}
  .astra-settings::after{inset:0;clip-path:ellipse(50% 48% at 50% 50%)}

  .astra-toast{
    position:fixed;left:50%;bottom:4.5%;z-index:3;
    transform:translateX(-50%) translateY(10px);
    padding:10px 15px;border:1px solid rgba(222,194,138,.38);border-radius:999px;
    background:rgba(4,8,14,.78);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);
    color:rgba(255,246,226,.96);font-size:12px;letter-spacing:.03em;
    opacity:0;transition:.24s ease;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.28);
  }
  .astra-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

  @keyframes astraBgPulse{0%{filter:brightness(.985)}100%{filter:brightness(1.025)}}
  @keyframes astraStarDrift{to{transform:translate3d(2.2%,-1.4%,0)}}
  @keyframes astraTwinkle{0%{opacity:.17}100%{opacity:.56}}
  @keyframes astraGlow{0%,100%{opacity:.52;transform:translate(-50%,-50%) scale(.98)}50%{opacity:.90;transform:translate(-50%,-50%) scale(1.04)}}

  /* Portrait phones get a dedicated portrait crop. PC never enters this rule. */
  @media (max-width:900px) and (orientation:portrait){
    .astra-stage{left:0;top:0;width:100%;height:100%;transform:none}
    .astra-bg{
      background-image:linear-gradient(rgba(1,5,10,.018),rgba(1,5,10,.075)),url('${CONFIG.backgroundMobile}');
      background-position:center;background-size:100% 100%;
    }
    .astra-glow{top:31%;width:72%;height:19%}

    /* Mobile zones match the portrait artwork instead of the desktop crop. */
    .astra-start{left:19.0%;top:53.0%;width:59.1%;height:10.3%}
    .astra-deck{left:17.7%;top:68.8%;width:29.7%;height:6.9%}
    .astra-cards{left:49.9%;top:68.8%;width:29.6%;height:6.9%}
    .astra-settings{left:44.0%;top:78.2%;width:13.1%;height:4.7%}
    .astra-hit::after{inset:7%}
    .astra-settings::after{inset:0}
    .astra-toast{bottom:max(3.2%,env(safe-area-inset-bottom));max-width:82vw;text-align:center}
  }

  @media(prefers-reduced-motion:reduce){
    .astra-bg,.astra-stars,.astra-stars:before,.astra-stars:after,.astra-glow{animation:none!important}
  }`;

  function showToast(msg){
    const t=document.querySelector('#astra-main-menu .astra-toast');
    if(!t)return;
    t.textContent=msg;t.classList.add('show');
    clearTimeout(t._timer);
    t._timer=setTimeout(()=>t.classList.remove('show'),1700);
  }

  function leave(after){
    const root=document.getElementById('astra-main-menu');
    if(!root)return;
    root.classList.add('astra-leaving');
    setTimeout(()=>{
      root.remove();
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      try{ if(after) after(); }catch(e){ console.warn('[ASTRA menu]',e); }
    },CONFIG.fadeMs);
  }

  function openDeckEditor(){
    leave(()=>{
      if(typeof window.openEditor==='function') window.openEditor();
      else {
        const btn=[...document.querySelectorAll('button,a,[role="button"]')]
          .find(el=>(el.innerText||el.textContent||'').includes('덱 직접 편집'));
        if(btn) btn.click();
      }
    });
  }

  function mount(){
    if(document.getElementById('astra-main-menu'))return;
    const style=document.createElement('style');
    style.id='astra-main-menu-style';style.textContent=css;document.head.appendChild(style);

    const root=document.createElement('div');
    root.id='astra-main-menu';root.setAttribute('aria-label','ASTRA TACTICS 메인 메뉴');
    root.innerHTML=`
      <div class="astra-stage">
        <div class="astra-bg"></div>
        <div class="astra-stars"></div>
        <div class="astra-glow"></div>
        <div class="astra-vignette"></div>
        <button class="astra-hit astra-start" aria-label="게임 시작" title="게임 시작"></button>
        <button class="astra-hit astra-deck" aria-label="덱 편성" title="덱 편성"></button>
        <button class="astra-hit astra-cards" aria-label="카드 도감" title="카드 도감"></button>
        <button class="astra-hit astra-settings" aria-label="설정" title="설정"></button>
      </div>
      <div class="astra-toast"></div>`;
    document.body.appendChild(root);
    document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';

    root.querySelector('.astra-start').onclick=()=>leave();
    root.querySelector('.astra-deck').onclick=openDeckEditor;
    root.querySelector('.astra-cards').onclick=()=>showToast('카드 도감은 다음 업데이트에서 연결 예정입니다.');
    root.querySelector('.astra-settings').onclick=()=>showToast('설정 메뉴는 다음 업데이트에서 연결 예정입니다.');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
