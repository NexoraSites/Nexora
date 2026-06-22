// Troque este número pelo WhatsApp oficial da sua empresa.
// Formato correto: código do país + DDD + número.
// Exemplo: 5534999999999
const WHATSAPP_EMPRESA = "5542998486760";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.getElementById("contactForm");
const messagePreview = document.getElementById("messagePreview");

const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const plano = document.getElementById("plano");
const ideia = document.getElementById("ideia");

function getPlanoFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const planoUrl = params.get("plano");

  if (plano && planoUrl) {
    plano.value = planoUrl;
  }
}

function gerarMensagem() {
  const nomeValor = nome?.value.trim() || "[Nome]";
  const telefoneValor = telefone?.value.trim() || "[Telefone]";
  const planoValor = plano?.value || "[Plano desejado]";
  const ideiaValor = ideia?.value.trim() || "[Ideia do projeto]";

  return `Olá, Nexora! Vim pelo site e quero conversar sobre um projeto digital.

Nome: ${nomeValor}
Telefone: ${telefoneValor}
Plano desejado: ${planoValor}

Minha ideia:
${ideiaValor}

Gostaria de receber mais informações e uma proposta.`;
}

function atualizarPreview() {
  if (messagePreview) {
    messagePreview.textContent = gerarMensagem();
  }
}

[nome, telefone, plano, ideia].forEach((campo) => {
  if (campo) {
    campo.addEventListener("input", atualizarPreview);
    campo.addEventListener("change", atualizarPreview);
  }
});

if (contactForm) {
  getPlanoFromUrl();
  atualizarPreview();

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const mensagem = gerarMensagem();
    const url = `https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
  });
}
