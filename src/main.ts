import { createApp } from 'vue'
import type { App } from 'vue' 
import AppComponent from './App.vue'
import route from './router'
import WebGLTestModule from './utils/WebGL/webgl.test'

// WebGLTestModule();



const VueApp: App = createApp(AppComponent);
// VueApp.use(route);
VueApp.mount('#app');

export default VueApp