// theme.js

const setTheme = (theme) => {
    const root = document.documentElement;

    const themes = {
      light: {
        /* 主要背景色 */
        "--bg-color1": "#FFFFFF",
        "--bg-color2": "#F5F5F7",
        "--bg-color3": "#F5F5F7",
        "--bg-color4": "rgba(0, 0, 0, 0.6)",

        "--bg-primary": "#FF5502",
        /* 登录注册 */
        "--text-color1": "#181E2A",
        "--text-color2":  "#606980",

        /* 主要字体颜色 */
        "--text-color3":  "#606980",
        "--text-color4": "rgba(255, 255, 255, 0.20)",

        /* 弹窗色 */
        "--dialog-bg-color": "#FFFFFF",
        "--dialog-text-color": "#FFFFFF", 

        /* 线边框颜色 */
        "--border-line": "rgba(245, 245, 247, 0.06)",
      },
      dark: {
        /* 主要背景色 */
        "--bg-color1": "#0E0E0F",
        "--bg-color2": "rgba(255, 255, 255, 0.06)",
        "--bg-color3": "rgba(255, 255, 255, 0.10)",
        "--bg-color4": "rgba(0, 0, 0, 0.6)",
        
        "--bg-primary": "#FF5502",
        /* 主要字体颜色 */
        "--text-color1": "#FFFFFF",
        "--text-color2": "rgba(255, 255, 255, 0.70)",
      
        /* 登录注册 */
        "--text-color3": "rgba(96, 105, 128, 0.40)",
        "--text-color4": "rgba(255, 255, 255, 0.20)",

        /* 弹窗色 */
        "--dialog-bg-color": "#18181C",
        "--dialog-text-color": "#FFFFFF",  

        /* 线边框颜色 */
        "--border-line": "rgba(245, 245, 247, 0.06)",
      },
    };

    Object.entries(themes[theme]).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  
    localStorage.setItem('theme', theme);
  };
  
  export default setTheme;
  