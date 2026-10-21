(function(){
  var COMMON={
    es:{toggle:"Cambiar idioma a inglés",legal:"Aviso legal",privacy:"Privacidad",back:"← Volver"},
    en:{toggle:"Switch language to Spanish",legal:"Legal notice",privacy:"Privacy",back:"← Back"}
  };
  var P=window.I18N||{es:{},en:{}},T={};
  ["es","en"].forEach(function(l){T[l]={};var k;for(k in COMMON[l])T[l][k]=COMMON[l][k];for(k in P[l])T[l][k]=P[l][k];});
  var saved=null;try{saved=localStorage.getItem("lang")}catch(e){}
  var nav=(navigator.languages&&navigator.languages[0])||navigator.language||"en";
  var lang=(saved==="es"||saved==="en")?saved:(/^es/i.test(nav)?"es":"en");
  var btn=document.getElementById("lang");
  function apply(l){
    var t=T[l];document.documentElement.lang=l;if(t.title)document.title=t.title;
    document.querySelectorAll("[data-i18n]").forEach(function(el){var k=el.getAttribute("data-i18n");if(t[k]!=null)el.textContent=t[k]});
    document.querySelectorAll("[data-lang]").forEach(function(el){el.hidden=el.getAttribute("data-lang")!==l});
    var d=document.querySelector('meta[name="description"]');if(d&&t.desc)d.setAttribute("content",t.desc);
    btn.setAttribute("aria-label",t.toggle);
    btn.querySelectorAll("span").forEach(function(s){s.classList.toggle("on",s.getAttribute("data-l")===l)});
  }
  apply(lang);
  btn.addEventListener("click",function(){lang=lang==="es"?"en":"es";try{localStorage.setItem("lang",lang)}catch(e){}apply(lang)});
  // Background video: always play (also with prefers-reduced-motion), with autoplay fallbacks.
  var v=document.getElementById("bgv");
  v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.setAttribute("muted","");
  var evs=["pointerdown","keydown","touchstart","click"];
  function unbind(){evs.forEach(function(e){document.removeEventListener(e,tryPlay,true)})}
  function bind(){evs.forEach(function(e){document.addEventListener(e,tryPlay,{capture:true,passive:true})})}
  function tryPlay(){
    if(!v.paused)return unbind();
    v.muted=true;
    var p=v.play();
    if(p&&p.then)p.then(unbind).catch(bind);
  }
  tryPlay();
  v.addEventListener("canplay",tryPlay);
  v.addEventListener("loadeddata",tryPlay);
  v.addEventListener("pause",function(){if(!document.hidden)setTimeout(tryPlay,300)});
  document.addEventListener("visibilitychange",function(){if(!document.hidden)tryPlay()});
  window.addEventListener("pageshow",tryPlay);
})();
