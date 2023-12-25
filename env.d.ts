/// <reference types="vite/client" />

// 由于ts文件无法识别.vue文件，只有加了才不会报错
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const vueComponent: DefineComponent<{}, {}, any>;
    export default vueComponent;
} 
