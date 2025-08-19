// create unique project names for menu IDs
const slugify = s => (s || '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-') 
  .replace(/(^-|-$)/g, ''); 

const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5'));

const postType = document.getElementById('post-tag').textContent;
console.log(postType);
console.log(typeof postType);

const tocContainer = document.getElementById('post-sidebar-toc-ctr');

// Add backlink to top of contents (based on collection tag)
const tocItemBackLink = document.createElement('li');
tocItemBackLink.classList.add('post-toc-back-link');
const tocItemBackLinkAnchor = document.createElement('a');

if (postType.includes("post")) {
  tocItemBackLinkAnchor.textContent = "..back to blog posts";
  tocItemBackLinkAnchor.setAttribute('href', "/")
} else if (postType.includes("project")) {
  tocItemBackLinkAnchor.textContent = "..back to projects";
  tocItemBackLinkAnchor.setAttribute('href', "/projects/")
}

tocItemBackLink.appendChild(tocItemBackLinkAnchor);
tocContainer.appendChild(tocItemBackLink);

// Add title to contents
const tocItemTitle = document.createElement('li');
tocItemTitle.classList.add('post-toc-title');
tocItemTitle.textContent = "Contents:";
tocContainer.appendChild(tocItemTitle);

// Add links to h2,h3,h4,h5 to table of contents
const fragment = document.createDocumentFragment();
headings.forEach((heading) => {
  heading.id = slugify(heading.innerText); 
  const tocItem = document.createElement('li');
  tocItem.classList.add('post-toc-item');
  tocItem.classList.add('post-toc-item-light');
  tocItem.setAttribute('id', `menu-${heading.id}`);
  const level = el => parseInt(el.tagName.slice(1));
  if (level(heading) === 2) {
    tocItem.classList.add(`post-toc-item-l${level(heading)}`);
  } else if (level(heading) === 3) {
    tocItem.classList.add(`post-toc-item-l${level(heading)}`);
  } else if (level(heading) === 4) {
    tocItem.classList.add(`post-toc-item-l${level(heading)}`);
  } else if (level(heading) === 5) {
    tocItem.classList.add(`post-toc-item-l${level(heading)}`);
  }

  const tocItemLink = document.createElement('a');
  tocItemLink.href = `#${heading.id}`;
  tocItemLink.innerText = heading.textContent;

  tocItem.appendChild(tocItemLink);
  fragment.appendChild(tocItem);
})
tocContainer.appendChild(fragment);


const tocItems = Array.from(document.querySelectorAll('.post-toc-item'));


function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      tocItems.forEach((item) => {
        if (item.id === `menu-${entry.target.id}`) {
          item.classList.remove('post-toc-item-light');
          item.classList.add('post-toc-item-dark');
          Array.from(item.children)[0].classList.add('anchor-text-light');
          Array.from(item.children)[0].classList.remove('anchor-text-dark');
        } else {
          item.classList.remove('post-toc-item-dark');
          item.classList.add('post-toc-item-light');
          Array.from(item.children)[0].classList.add('anchor-text-dark');
          Array.from(item.children)[0].classList.remove('anchor-text-light');
        }
      })      
    } 
  })
}


window.addEventListener("load", (event) => {
  const observer = new IntersectionObserver(handleIntersection);
  headings.forEach((heading) => observer.observe(heading));
});



