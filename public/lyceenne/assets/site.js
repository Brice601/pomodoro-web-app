/* La Lycéenne — menu mobile (burger) partagé */
(function(){
  var nav = document.querySelector('.nav');
  if(!nav) return;
  var header = nav.closest('header');
  var b = document.createElement('button');
  b.className = 'burger';
  b.type = 'button';
  b.setAttribute('aria-label','Ouvrir le menu');
  b.setAttribute('aria-expanded','false');
  b.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(b);
  b.addEventListener('click', function(){
    var open = header.classList.toggle('nav-open');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    b.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', function(){
      header.classList.remove('nav-open');
      b.setAttribute('aria-expanded','false');
    });
  });
})();
