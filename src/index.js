import './styles/main.scss';
import natur from '../public/natur.jpg';

// console.log('Hello webpack');

const h1 = document.createElement('h1')
h1.textContent = 'Hello Webpack';

const p = document.createElement('p')
p.textContent = 'Hello';


const img = document.createElement('img');
img.setAttribute('src', natur);

const app = document.querySelector('#root')
app.append(h1, p, img);

