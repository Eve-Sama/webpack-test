export const render = (content: string) => {
  const h1 = document.createElement('h1');
  h1.innerHTML = content;
  document.body.appendChild(h1);
};
