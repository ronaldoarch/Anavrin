document.addEventListener('DOMContentLoaded', function() {
  const banner = document.getElementById('cookie-banner');
  const btn = document.getElementById('accept-cookies');

  // Verifica se o usuário já aceitou os cookies
  if (localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'none';
  }

  btn.addEventListener('click', function() {
    banner.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
  });
});

// Menu hamburger mobile
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');
hamburger.addEventListener('click', () => {
  menu.classList.toggle('open');
});
hamburger.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') menu.classList.toggle('open');
});
// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      menu.classList.remove('open');
    }
  });
});

// Redirecionamento para WhatsApp ao clicar na imagem da massagista
const numeroWhatsApp = '5511999999999';
document.querySelectorAll('.card-terapeuta img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
    const nome = this.alt;
    const mensagem = encodeURIComponent(`Olá, gostaria de agendar uma massagem com a ${nome}`);
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, '_blank');
  });
}); 