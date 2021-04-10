const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Forrest',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    nav: [
      {
        text: 'Posts',
        link: '/',
      },
      {
        text: 'Docker',
        link: '/tag/docker/',
      },
      {
        text: 'Markdown',
        link: '/tag/markdown/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
    ],
  },

  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-plantuml'))
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/nprogress',    
    [
      '@vuepress/blog',
      {
        directories: [
          {
            // Unique ID of current classification
            id: 'post',
            // Target directory
            dirname: '_posts',
            // Path of the `entry page` (or `list page`)
            path: '/',
          },
        ],
        frontmatters: [
          {
            // Unique ID of current classification
            id: 'tag',
            // Decide that the frontmatter keys will be grouped under this classification
            keys: ['tags'],
            // Path of the `entry page` (or `list page`)
            path: '/tag/'
          },
        ],
        sitemap: {
          hostname: 'http://localhost'
        },
        //  vuepress-plugin-vssue
        comment: {
          // Which service you'd like to use
          service: 'vssue',
          // The owner's name of repository to store the issues and comments.
          owner: 'You',
          // The name of repository to store the issues and comments.
          repo: 'Your repo',
          // The clientId & clientSecret introduced in OAuth2 spec.
          clientId: 'Your clientId',
          clientSecret: 'Your clientSecret',
        },
        // vuepress-plugin-mailchimp
        newsletter: {
          // Put your endpoint, not mine.
          endpoint: "https://billyyyyy3320.us4.list-manage.com/subscribe/post?u=4905113ee00d8210c2004e038&amp;id=bd18d40138"
        },
        feed: {
          canonical_base: 'http://localhost',
        },
      },
    ],
  ]

}
