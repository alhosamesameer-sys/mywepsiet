const $=s=>document.querySelector(s),links=$("#links");
$("#menu").onclick=()=>links.classList.toggle("open");
document.querySelectorAll(".links a").forEach(a=>a.onclick=()=>links.classList.remove("open"));
const mode=$("#mode");if(localStorage.theme==="dark")document.body.classList.add("dark");
mode.onclick=()=>{document.body.classList.toggle("dark");localStorage.theme=document.body.classList.contains("dark")?"dark":"light"};
const bar=$("#progress"),top=$("#top");
addEventListener("scroll",()=>{bar.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+"%";top.classList.toggle("show",scrollY>500)},{passive:true});
top.onclick=()=>scrollTo({top:0,behavior:"smooth"});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));$("#year").textContent=new Date().getFullYear();
const CONTACT={whatsapp:"967714692465",telegram:"S7m_5",email:"alhsamshbl@gmail.com"};
function toast(m){let t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000)}
document.querySelectorAll("[data-contact]").forEach(a=>a.onclick=e=>{let k=a.dataset.contact;if(!CONTACT[k]){e.preventDefault();toast("أضف بيانات "+(k==="whatsapp"?"واتساب":k==="telegram"?"تيليجرام":"البريد الإلكتروني")+" في script.js.");return}if(k==="whatsapp")a.href="https://wa.me/"+CONTACT[k];if(k==="telegram")a.href="https://t.me/"+CONTACT[k];if(k==="email")a.href="mailto:"+CONTACT[k]});
$("#form").onsubmit=e=>{e.preventDefault();let d=new FormData(e.target),text="طلب مشروع — هلوسات أفكار\n\nالاسم: "+d.get("name")+"\nالبريد: "+d.get("email")+"\nالخدمة: "+d.get("service")+"\n\nفكرة المشروع:\n"+d.get("message");let url="https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(text);window.open(url,"_blank")|| (location.href=url);toast("تم تجهيز الرسالة وفتح واتساب لإرسال الفكرة.");};