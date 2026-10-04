(() => {
"use strict";
const CONTACT={whatsapp:"967714692465",telegram:"S7m_5",email:"alhsamshbl@gmail.com"};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function year(){ $$("#year").forEach(e=>e.textContent=new Date().getFullYear()); }
function menu(){
 const m=$("#siteMenu"), n=$("#siteMobile"); if(!m||!n)return;
 const close=()=>{n.classList.remove("open");m.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");};
 m.type="button";m.setAttribute("aria-expanded","false");
 m.addEventListener("click",()=>{const open=n.classList.toggle("open");m.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open);});
 $$("a",n).forEach(a=>a.addEventListener("click",close));
 document.addEventListener("click",e=>{if(n.classList.contains("open")&&!n.contains(e.target)&&!m.contains(e.target))close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
 window.addEventListener("resize",()=>{if(innerWidth>900)close();});
}
function theme(){
 const m=$("#mode");if(!m)return;
 const saved=localStorage.getItem("halosat-theme");if(saved==="dark")document.body.classList.add("dark");
 m.setAttribute("aria-pressed",String(document.body.classList.contains("dark")));
 m.addEventListener("click",()=>{const d=document.body.classList.toggle("dark");localStorage.setItem("halosat-theme",d?"dark":"light");m.setAttribute("aria-pressed",String(d));});
}
function scrollFx(){
 const bar=$("#progress"),top=$("#top");
 const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.width=(max>0?scrollY/max*100:0)+"%";if(top)top.classList.toggle("show",scrollY>500);};
 addEventListener("scroll",update,{passive:true});update();if(top)top.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
 if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target);}}),{threshold:.12});$$(".reveal").forEach(e=>io.observe(e));}else $$(".reveal").forEach(e=>e.classList.add("show"));
}
function toast(msg){const t=$("#toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3200);}
function contactLinks(){ $$("[data-contact]").forEach(a=>{const k=a.dataset.contact;if(k==="whatsapp")a.href="https://wa.me/"+CONTACT.whatsapp;if(k==="telegram")a.href="https://t.me/"+CONTACT.telegram;if(k==="email")a.href="mailto:"+CONTACT.email;a.target="_blank";a.rel="noopener";}); }
function serviceSelect(){
 const s=$('select[name="type"],select[name="service"]');if(!s)return;
 const q=new URLSearchParams(location.search).get("service");if(!q)return;
 const o=[...s.options].find(x=>x.value===q||x.textContent.trim()===q);if(o)s.value=o.value;
}
function form(){
 const f=$("#contactForm")||$("#f")||$("#form");if(!f)return;
 const phone=f.elements.phone;
 if(phone){phone.addEventListener("input",()=>phone.setCustomValidity(phone.value.trim()&&!/^[0-9+()\\-\\s]{7,20}$/.test(phone.value.trim())?"أدخل رقم هاتف صحيحًا أو اترك الحقل فارغًا.":""));}
 f.addEventListener("submit",e=>{e.preventDefault();if(!f.reportValidity())return;const d=new FormData(f);
 const name=String(d.get("name")||"").trim(),email=String(d.get("email")||"").trim(),phoneValue=String(d.get("phone")||"").trim()||"غير مذكور",service=String(d.get("type")||d.get("service")||"").trim(),message=String(d.get("message")||"").trim();
 if(!name||!email||!service||!message){toast("يرجى إكمال الحقول المطلوبة.");return;}
 const text=["طلب مشروع — هلوسات أفكار","","الاسم: "+name,"البريد: "+email,"الهاتف: "+phoneValue,"نوع المشروع: "+service,"","فكرة المشروع:",message].join("\\n");
 location.assign("https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(text));
 });
}
function slider(){
 const box=$("[data-slider]");if(!box)return;const imgs=$$("img",box);if(imgs.length<2)return;let i=imgs.findIndex(x=>x.classList.contains("active"));if(i<0)i=0;
 const names=["دفتر الحسابات","حافظ حالات واتساب","نظام إدارة البقالات"];
 setInterval(()=>{imgs[i].classList.remove("active");i=(i+1)%imgs.length;imgs[i].classList.add("active");const t=$("#heroProject");if(t)t.textContent=names[i]||"";},4200);
}
document.addEventListener("DOMContentLoaded",()=>{year();menu();theme();scrollFx();contactLinks();serviceSelect();form();slider();});
})();