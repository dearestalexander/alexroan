const {DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

eleventyConfig.addPassthroughCopy('./src/styles.css');
eleventyConfig.addPassthroughCopy('./src/styles__content.css');
eleventyConfig.addPassthroughCopy('./src/assets');
eleventyConfig.addPassthroughCopy('./src/coding/assets');
eleventyConfig.addPassthroughCopy('./src/classics/assets');
eleventyConfig.addPassthroughCopy('./src/admin/config.yml');

eleventyConfig.addFilter("postDate", (dateObj) => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
})

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
}

