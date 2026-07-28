const welcome = document.getElementById("welcome");
const invite = document.getElementById("invite");
const openInvite = document.getElementById("openInvite");
const music = document.getElementById("background-music");

// Configura o áudio para um volume agradável
music.volume = 0.4;

// Função para tentar dar o play no áudio
function tentarTocarMusica() {
    music.play().then(() => {
        // Se funcionar, remove os ouvintes para não dar play de novo à toa
        document.removeEventListener("click", tentarTocarMusica);
        document.removeEventListener("touchstart", tentarTocarMusica);
    }).catch(error => {
        console.log("Aguardando interação real do usuário...");
    });
}

// Fica ouvindo QUALQUER primeiro clique ou toque na tela para ligar o som
document.addEventListener("click", tentarTocarMusica);
document.addEventListener("touchstart", tentarTocarMusica);

// Botão Abrir Convite (Troca de tela e reforça o play do áudio se ainda não tiver começado)
openInvite.addEventListener("click", () => {
    tentarTocarMusica(); // Garante o som

    welcome.classList.add("hidden");
    invite.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    invite.animate([
        { opacity:0, transform:"translateY(40px) scale(.95)" },
        { opacity:1, transform:"translateY(0) scale(1)" }
    ],{ duration:800, easing:"ease" });
});

// ... O RESTANTE DO SEU SCRIPT CONTINUA IGUAL ...
// CONTADOR REGRESSIVO
const eventDate = new Date("2026-08-14T19:30:00");
function updateCountdown(){
    const now = new Date();
    const distance = eventDate - now;
    if(distance<=0){
        document.getElementById("days").innerText="00";
        document.getElementById("hours").innerText="00";
        document.getElementById("minutes").innerText="00";
        document.getElementById("seconds").innerText="00";
        return;
    }
    const days=Math.floor(distance/(1000*60*60*24));
    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds=Math.floor((distance%(1000*60))/1000);
    
    document.getElementById("days").innerText=String(days).padStart(2,'0');
    document.getElementById("hours").innerText=String(hours).padStart(2,'0');
    document.getElementById("minutes").innerText=String(minutes).padStart(2,'0');
    document.getElementById("seconds").innerText=String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

// CONFETES (CANVAS)
const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
});

let confetti=[];
function createConfetti(){
    confetti=[];
    for(let i=0;i<100;i++){
        confetti.push({
            x:Math.random()*canvas.width,
            y:-Math.random()*canvas.height,
            size:4+Math.random()*6,
            speed:2+Math.random()*4,
            angle:Math.random()*360,
            rotation:Math.random()*10,
            emoji:["🌴","🌴","🎉","🪘","🌞","🥁"][Math.floor(Math.random()*6)]
        });
    }
    animateConfetti();
}

function animateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c=>{
        ctx.font=c.size*3+"px serif";
        ctx.fillText(c.emoji,c.x,c.y);
        c.y+=c.speed;
        c.x+=Math.sin(c.angle)*1.2;
        c.angle+=0.03;
    });
    confetti=confetti.filter(c=>c.y<canvas.height+50);
    if(confetti.length>0){ requestAnimationFrame(animateConfetti); }
}
document.getElementById("surprise").onclick=()=> { createConfetti(); showMessage(); };

// MENSAGEM FLUTUANTE
function showMessage(){
    const msg=document.createElement("div");
    msg.innerHTML=" 🌴Aposte em cores vibrantes, estampas e muita alegria. E não se esqueça: sua pontualidade fará toda a diferença para começarmos a festa juntos! 🌴";
    msg.style.position="fixed";
    msg.style.left="50%";
    msg.style.top="50%";
    msg.style.transform="translate(-50%,-50%)";
    msg.style.background="white";
    msg.style.padding="20px";
    msg.style.borderRadius="25px";
    msg.style.boxShadow="0 15px 40px rgba(0,0,0,.2)";
    msg.style.fontSize="22px";
    msg.style.zIndex="9999";
    msg.style.textAlign="center";
    msg.style.width="85%";
    msg.style.maxWidth="320px";
    document.body.appendChild(msg);
    setTimeout(()=> { msg.remove(); },10000);
}

// CALENDÁRIO
document.getElementById("calendar").onclick=()=>{
    const start="20260814T193000";
    const end="20260814T235900";
    const title="Aniversário do Igor";
    const location="Tropicanos - Fortaleza";
    const details="Espero você para comemorarmos juntos!";
    const url=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(url,"_blank");
};

// CORAÇÕES AO CLICAR
document.body.addEventListener("click",(e)=>{
    if(e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
    for(let i=0;i<5;i++){
        const heart=document.createElement("div");
        heart.innerHTML="💖";
        heart.style.position="fixed";
        heart.style.left=e.clientX+"px";
        heart.style.top=e.clientY+"px";
        heart.style.pointerEvents="none";
        heart.style.fontSize=(14+Math.random()*14)+"px";
        heart.style.transition="all 1.2s ease";
        heart.style.zIndex="9999";
        document.body.appendChild(heart);
        setTimeout(()=>{
            heart.style.transform=`translate(${(Math.random()-0.5)*150}px,-${100+Math.random()*100}px) rotate(${Math.random()*360}deg)`;
            heart.style.opacity="0";
        },10);
        setTimeout(()=>heart.remove(),1300);
    }
});

// BALÕES SUBINDO
function criarBalao() {
    if(document.hidden) return;
    const balao = document.createElement("div");
    balao.innerHTML = ["🌴","🌴","🎉","🪘","🌞","🥁"][Math.floor(Math.random()*6)];
    balao.style.position="fixed";
    balao.style.left=Math.random()*90+"vw";
    balao.style.bottom="-60px";
    balao.style.fontSize=(20+Math.random()*20)+"px";
    balao.style.pointerEvents="none";
    balao.style.zIndex="1000";
    balao.style.transition="transform 8s linear, opacity 8s linear";
    document.body.appendChild(balao);
    requestAnimationFrame(()=>{
        balao.style.transform=`translateY(-120vh) translateX(${(Math.random()-0.5)*60}px) rotate(${Math.random()*360}deg)`;
        balao.style.opacity="0";
    });
    setTimeout(()=>{ balao.remove(); },8000);
}
setInterval(criarBalao,3500);

// VIBRAÇÃO NO SMARTPHONE
if("vibrate" in navigator){
    document.getElementById("surprise").addEventListener("click",()=>{
        navigator.vibrate([120,60,120]);
    });
}

console.log("Convite estruturado com som carregado com sucesso 🎉");