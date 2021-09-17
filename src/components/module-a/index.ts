import ModuleAHTML from './index.html';
import './index.scss';

const container = document.body.querySelector('#container');

if (container) {
  container.innerHTML += ModuleAHTML;
}
