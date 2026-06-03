import DefaultTheme from 'vitepress/theme'
import './style.css'

if (typeof window !== 'undefined') {
  window.localStorage.setItem('vitepress-theme-appearance', 'light')
  document.documentElement.classList.remove('dark')
}

export default DefaultTheme
