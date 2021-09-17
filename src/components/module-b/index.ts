import ModuleBHTML from './index.html';
import './index.scss';
const container = document.body.querySelector('#container');

if (container) {
  container.innerHTML += ModuleBHTML;
}
