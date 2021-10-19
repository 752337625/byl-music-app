import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  base: '/byl',
  publicDir: 'public',
  server: {
    host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    port: 3000,// 服务器端口号
    open: true,  // boolean | string 启动项目时自动在浏览器打开应用程序；如果为string，比如"/index.html"，会打开http://localhost:3000/index.html
    // 自定义代理规则
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
});
