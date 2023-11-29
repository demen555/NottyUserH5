// plugins/theme-init.js

import setTheme from './theme.js';
export default ({ app }, inject) => {
  if (process.client) {
    console.log(app, )
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || 'dark');
    inject('theme', savedTheme);
  }
};

