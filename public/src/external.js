$(document).ready(() => {

  let signupdiv = $('#sgnup');
  let grtngdiv = $('greetingdiv');
  signupdiv.fadeOut(0);

  setTimeout(() => {
    document.getElementById('greeting').innerHTML = '<h2 id="greeting">Hola👲</h2>';
  },2500);

  setTimeout(() => {
    document.getElementById('greeting').innerHTML = '<h2 id="greeting">Bonjour👦</h2>';
  },4500);

  setTimeout(() => {
    document.getElementById('greeting').innerHTML = '<h2 id="greeting">Makadini🧓</h2>';
  },6500);

  setTimeout(() => {
    document.getElementById('greeting').innerHTML = '<h2 id="greeting">Unjani🤵</h2>';
  },8500);

  setTimeout(() => {
    document.getElementById('greeting').innerHTML = '';
  }, 11500);

  setTimeout(() => {
    signupdiv.fadeIn(5000);
  }, 12000);
});