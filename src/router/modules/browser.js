import Layout from '@/views/layout/Layout'

const browserRouter = {
  path: '/browser',
  component: Layout,
  redirect: '/browser/essay/lst',
  name: 'Browser',
  meta: {
    title: '浏览',
    icon: 'browser'
  },
  children: [
    {
      path: 'essay',
      component: () => import('@/views/browser/essay/index'),
      name: 'Essay',
      meta: { title: '文章' },
      redirect: '/browser/essay/lst',
      children: [
        {
          path: 'lst',
          hide: true,
          component: () => import('@/views/browser/essay/lst'),
          name: 'EssayLst',
          meta: { title: '文章', icon: 'essay' }
        },
        {
          path: 'detail',
          hidden: true,
          component: () => import('@/views/browser/essay/detail'),
          name: 'EssayDetail',
          meta: { title: '详情' }
        }
      ]
    },
    {
      path: 'topic',
      component: () => import('@/views/browser/topic/index'),
      name: 'Topic',
      meta: { title: '话题' },
      redirect: '/browser/topic/lst',
      children: [
        {
          path: 'lst',
          hide: true,
          component: () => import('@/views/browser/topic/lst'),
          name: 'TopicLst',
          meta: { title: '话题', icon: 'topic' }
        },
        {
          path: 'detail',
          hidden: true,
          component: () => import('@/views/browser/topic/detail'),
          name: 'TopicDetail',
          meta: { title: '详情' }
        }
      ]
    }
  ]
}

export default browserRouter
