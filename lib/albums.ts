export interface Album {
  title: string
  bandcampAlbumId: string
  bandcampUrl: string
  listenUrl: string
}

export const albums: Album[] = [
  {
    title: 'Dear Starling',
    bandcampAlbumId: '2954327959',
    bandcampUrl: 'http://pumpkinbread.bandcamp.com/album/dear-starling',
    listenUrl: 'http://pumpkinbread.bandcamp.com/album/dear-starling',
  },
  {
    title: 'Pumpkin Bread',
    bandcampAlbumId: '989194367',
    bandcampUrl: 'http://pumpkinbread.bandcamp.com/album/pumpkin-bread',
    listenUrl: 'http://pumpkinbread.bandcamp.com/album/pumpkin-bread',
  },
]
