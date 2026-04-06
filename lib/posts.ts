export interface Post {
  slug: string
  date: string
  title: string
  excerpt: string
  content: string
  image: string
}

export const posts: Post[] = [
  {
    slug: 'dujour-soundbite',
    date: '2019-03-09',
    title: 'Dujour Magazine – Soundbite feature',
    excerpt: 'We\'re excited to be written up in Dujour Magazine and in good company!',
    content: `We're excited to be written up in Dujour Magazine and in good company! They feature the new album, and say How'd We Get to Know Each Other "plays like a short story that you can't stop turning the pages to." Thanks for the kind words! <a href="http://dujour.com/culture/sound-bite-audien-pumpkin-bread-the-black-keys-billie-eilish-new-songs/">Read the full article</a>`,
    image: '/images/posts/dujour-soundbite.avif',
  },
  {
    slug: 'dear-starling-released',
    date: '2019-03-08',
    title: '"Dear Starling" released!',
    excerpt: 'Our album came out today! Find it on all major streaming platforms.',
    content: 'Our album came out today! Find it on all major streaming platforms: <a href="https://pumpkinbreadband.com/dear-starling">pumpkinbreadband.com/dear-starling</a>',
    image: '/images/posts/dear-starling.avif',
  },
  {
    slug: 'vents-interview',
    date: '2019-03-05',
    title: 'Vents Magazine Interview',
    excerpt: 'We had an interview with Vents Magazine in anticipation of Dear Starling coming out.',
    content: 'We had an interview with Vents Magazine in anticipation of Dear Starling coming out in a few days. Thanks RJ! <a href="http://ventsmagazine.com/2019/03/05/interview-pumpkin-bread/">Read the full article</a>',
    image: '/images/posts/vents-interview.avif',
  },
  {
    slug: 'glide-premiere',
    date: '2019-03-01',
    title: 'Glide Magazine Premiere of single "How\'d We Get to Know Each Other"',
    excerpt: 'Glide Magazine was kind enough to premiere the video of our new single, released today!',
    content: `Glide Magazine was kind enough to premiere the video of our new single, released today! It's <a href="https://www.pumpkinbreadband.com/howd-we-get">available on all platforms</a>. Read the full <a href="https://glidemagazine.com/220873/video-premiere-five-piece-folk-ensemble-pumpkin-bread-enchant-with-stellar-melodies-via-howd-we-get-to-know-each-other/">Glide article</a>`,
    image: '/images/posts/glide-premiere.avif',
  },
  {
    slug: 'porchfest-2018',
    date: '2018-05-09',
    title: 'Boston Globe Feature – Somerville Porchfest 2018',
    excerpt: 'Thanks to Zoe Madonna at The Boston Globe for another writeup!',
    content: 'Thanks to Zoe Madonna at The Boston Globe for another writeup! Come on out, the weather will be nice. <a href="https://www.bostonglobe.com/arts/music/2018/05/09/too-many-choices-porchfest-let-walk-you-through/qWNrFfWZzyWEwP8tkiD58N/story.html">Read the full article</a>',
    image: '/images/posts/porchfest-2018.avif',
  },
  {
    slug: 'bcmfest-2018',
    date: '2018-01-11',
    title: 'Boston Globe Feature – BCMFest 2018',
    excerpt: 'We\'re in the paper, mom! Thanks to Zoë Madonna at The Boston Globe for featuring us.',
    content: `We're in the paper, mom! Thanks to Zoë Madonna at The Boston Globe for featuring us in their article about Boston Celtic Music Festival 2018. "Pure progressive folk fusion" they say. It's going to be fun! <a href="https://www.bostonglobe.com/arts/music/2018/01/11/reeling-through-years-boston-celtic-music-festival-turns/yv44FZEkjQJQ6vqgDAZ09H/story.html">Read the full article</a>`,
    image: '/images/posts/bcmfest-2018.avif',
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getRecentPosts(excludeSlug?: string, count = 3): Post[] {
  return posts.filter((p) => p.slug !== excludeSlug).slice(0, count)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
