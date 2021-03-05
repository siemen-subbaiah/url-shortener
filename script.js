const ham = document.querySelector('#b');
const navItems = document.querySelector('.ul-items');
const link = document.querySelector('#link');
const form = document.querySelector('.flex');
const copy = document.querySelector('#copy');
const error = document.querySelector('#error');
const load = document.querySelector('#load');
const orignalLink = document.querySelector('#orignal-link');
const shortLink = document.querySelector('#short-link');

const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

ham.addEventListener('click', () => {
  navItems.classList.toggle('show');
});

const getUrl = async () => {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link.value}`);
  const data = await res.json();
  console.log(data);
  orignalLink.textContent = link.value;
  shortLink.textContent = data.result.full_short_link;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!link.value.match(regex)) {
    error.textContent = 'Enter a valid URL';
    link.style.border = '2px solid red';
  } else {
    getUrl();
    error.textContent = '';
    link.style.border = '0px solid red';
    shortLink.style.color = '#333';
  }
  //   link.value = '';
});

copy.addEventListener('click', () => {
  let el = document.createElement('textarea');
  el.value = shortLink.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  shortLink.style.color = '#2acfcf';
  document.body.removeChild(el);
});
