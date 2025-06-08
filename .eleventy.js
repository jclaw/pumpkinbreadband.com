// .eleventy.js  (ES module)
import Image           from '@11ty/eleventy-img';
import pluginBundle    from '@11ty/eleventy-plugin-bundle';
import pluginImages    from './.eleventy.images.js';
import pluginYouTube   from 'eleventy-plugin-youtube-embed';
import embedVimeo      from 'eleventy-plugin-vimeo-embed';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginBundle, {
    bundles: [
      { name: "base", type: "css" },
      { name: "page", type: "css" }
    ]
  });
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(embedVimeo);
  eleventyConfig.addPlugin(pluginYouTube, {
    modestBranding: true,
    lite: { responsive: true, thumbnailQuality: 'maxresdefault' }
  });

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addWatchTarget('css/');
  eleventyConfig.addWatchTarget('js/');

  eleventyConfig.setServerOptions({ liveReload: false });

  eleventyConfig.addCollection('projectsByPriority', (collection) => {
    const projects = [
      ...collection.getFilteredByGlob('projects/**/*.liquid'),
      ...collection.getFilteredByGlob('projects/**/*.md')
    ];

    return projects
      .map((project) => {
        const folder = project.inputPath.split('/')[2];
        project.imgPath = `./projects/${folder}`;
        return project;
      })
      .sort((a, b) => b.data.priority - a.data.priority);
  });
}