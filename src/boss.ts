import { render } from './test';
import './assets/style/index.scss';
import BossHTML from './boss.html';

console.log(BossHTML);

function test1(): void {
  console.log('星哥nb');
}
test1();

render('Hello World!');

document.body.innerHTML += BossHTML;

await import('./components/module-a');
await import('./components/module-b');
