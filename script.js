const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const timeline = document.querySelector('[data-timeline]');
const progress = document.querySelector('.timeline__progress');
const timelineItems = document.querySelectorAll('.timeline__item');

function onScroll(){
  header.classList.toggle('is-scrolled', window.scrollY > 20);

  if(timeline && progress){
    const rect = timeline.getBoundingClientRect();
    const marker = window.innerHeight * .55;
    const travelled = Math.min(Math.max(marker - rect.top, 0), rect.height);
    progress.style.height = `${(travelled / rect.height) * 100}%`;

    timelineItems.forEach(item => {
      const r = item.getBoundingClientRect();
      item.classList.toggle('is-active', r.top < marker && r.bottom > marker - 120);
    });
  }
}

window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

if('IntersectionObserver' in window){
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.12});

  revealItems.forEach(el => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, {rootMargin:'-35% 0px -55% 0px'});

  sections.forEach(section => sectionObserver.observe(section));
}else{
  revealItems.forEach(el => el.classList.add('is-visible'));
}
