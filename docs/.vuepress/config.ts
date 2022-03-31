import { path } from '@vuepress/utils'

export default {
  lang: 'en-US',
  title: 'Vanilla Components',
  description: 'A lightweight Vue 3 component based on Tailwind CSS',
  serviceWorker: true,
  theme: path.resolve(__dirname, './theme'),
  port: 3000,
  head: [
    //['link', {href: 'https://fonts.googleapis.com/css?family=Nunito:400,600,700', rel: 'stylesheet'}],
    ['link', {href: 'https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700&display=swap', rel: 'stylesheet'}],
  ],
  themeConfig: {
    docsDir: 'docs',
    darkMode: true,
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/igerslike/vanilla-documents',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'Components',
        children: [
          { text: 'Introduction', link: '/guide/components/shared-options' },
          { text: 'Text & Password', link: '/guide/components/Input' },
          { text: 'Textarea', link: '/guide/components/Textarea' },
          { text: 'Select', link: '/guide/components/select' },
          { text: 'Rich Select', link: '/guide/components/RichSelect' },
          { text: 'Country Select', link: '/guide/components/SelectCountry' },
          { text: 'Phone Number', link: '/guide/components/PhoneNumber' },
          { text: 'Checkbox', link: '/guide/components/Checkbox' },
          { text: 'Toggle', link: '/guide/components/Toggle' },
          { text: 'Avatar', link: '/guide/components/Avatar' },
          { text: 'Button', link: '/guide/components/Button' },
          { text: 'Rich Radio', link: '/guide/components/RichRadio' },
          { text: 'Datetime', link: '/guide/components/DatetimePicker' },
          { text: 'Dropdown', link: '/guide/components/Dropdown' },
          { text: 'Dialog ( Modal )', link: '/guide/components/Dialog' },
          { text: 'Card', link: '/guide/components/Card' },
          { text: 'Input Group', link: '/guide/components/InputGroup' },
          { text: 'Datatables', link: '/guide/components/Datatables' },
        ],
      },
    ],
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './../guide'),
        components: {
          Wrapper: path.resolve(__dirname, './components/Wrapper.vue'),
          SharedProperties: path.resolve(__dirname, './components/SharedProperties.vue'),
        },
        getComponentName: (filePath: string) => {
          const fileName = path.basename(filePath, path.extname(filePath))
          return fileName
            .replace(/^[a-z]/, (s) => s.toUpperCase())
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/\s+/g, '-')
            .toLowerCase();
        },
      },
    ],
  ],
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
      viteOptions: {
        global: {

        },
        optimizeDeps: {
          //exclude: ['@indigit/vanilla-components']
        },
        resolve: {
          alias: [
            //{ find: '@', replacement: path.resolve(__dirname,'./../../src') }
          ]
        },
        css: {
          postcss: {
            plugins: [
              require('postcss-import'),
              require('tailwindcss/nesting'),
              require('tailwindcss'),
              require('autoprefixer'),
            ]
          }
        },
      }
  },
  extendsMarkdown: (md: any) => {
    // use more markdown-it plugins!
    md.use(require('markdown-it-include'))
  }
}
