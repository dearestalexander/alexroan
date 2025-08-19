const {DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/styles.css');
  eleventyConfig.addPassthroughCopy('./src/script.js');
  eleventyConfig.addPassthroughCopy('./src/script-projects.js');
  eleventyConfig.addPassthroughCopy('./src/script-posts.js');
  eleventyConfig.addPassthroughCopy('./src/fcc/fccstyles.css');
  eleventyConfig.addPassthroughCopy('./src/styles__content.css');
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/coding/assets');
  eleventyConfig.addPassthroughCopy('./src/classics/assets');
  eleventyConfig.addPassthroughCopy('./src/admin/config.yml');

  // Human-readable date (like your old postDate)
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("d LLL yyyy");
  });

  // Machine-friendly ISO date
  eleventyConfig.addFilter("postDateIso", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
}

