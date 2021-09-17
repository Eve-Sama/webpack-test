import Logo from './assets/image/logo.jpg';

export const render = (content: string) => {
  const h1 = document.createElement('h1');
  h1.innerHTML = content;
  document.body.appendChild(h1);

  const img = document.createElement('img');
  img.src = Logo;

  document.body.appendChild(img);
};
