
// Get 'hashtags' from front matter & de-duplicate
window.addEventListener('load', () => {
  const postHashtags = document.querySelectorAll('.card');
  let str = "";
  for (const hashtag of postHashtags) {
    str += hashtag.dataset.hashtags + ",";
  }

  const arr = str.split(',').sort();
  let hashTagList = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1] && arr[i] !== "") {
      hashTagList.push(arr[i]);
    }
  }

  // Build 'hashtag' based select element
  const selectCtr = document.getElementById('select-ctr');
  const hashTagSelect = document.createElement('select');
  const hashTagLabel = document.createElement('label');
  hashTagSelect.id = 'hashtag-select';
  hashTagSelect.classList.add('hashtag-select');
  hashTagSelect.required = true;
  hashTagLabel.setAttribute('for', 'hashtag-select');
  hashTagLabel.textContent = 'Topic:';

  hashTagList.forEach(hashtag => {
    const option = document.createElement('option');
    option.value = hashtag;
    option.textContent = hashtag;
    hashTagSelect.appendChild(option);
  })

  // Build 'date' based select element
  const dateSelect = document.createElement('select');
  const dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'date-select');
  dateLabel.textContent = 'Sort by date:';
  dateSelect.classList.add('date-select');
  dateSelect.id = 'date-select';
  const newestFirstOption = document.createElement('option');
  const oldestFirstOption = document.createElement('option');
  newestFirstOption.value = 'newest';
  newestFirstOption.textContent = 'newest first';
  oldestFirstOption.value = 'oldest';
  oldestFirstOption.textContent = 'oldest first';
  dateSelect.appendChild(newestFirstOption);
  dateSelect.appendChild(oldestFirstOption);

  // Update HTML with selects
  selectCtr.appendChild(hashTagLabel);
  selectCtr.appendChild(hashTagSelect);
  selectCtr.appendChild(dateLabel);
  selectCtr.appendChild(dateSelect);

  // Filter posts by hashtag (using hide)
  hashTagSelect.addEventListener('change', (event) => {
    const selectedTag = event.target.value;
    const posts = document.querySelectorAll('.card');
    posts.forEach(post => {
      const postHashTags = post.dataset.hashtags;
      console.log(postHashTags);
      if (postHashTags.includes(selectedTag)) {
        post.style.display = 'block'; // Show post if it matches the tag
      } else {
        post.style.display = 'none'; // Hide post if it doesn't match 
      }
    })
    console.log(`Selected tag: ${selectedTag}`);
  })

  // Filter posts by date
  dateSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value; // newest / oldest
    const cards = Array.from(document.querySelectorAll('.card'));

    // get dates
    const getISO = (card) =>
      card.dataset.date || 
      card.querySelector('.card-date')?.getAttribute('datetime');

    const getTime = (card) => new Date(getISO(card)).getTime();

    // sort
    cards.sort((a,b) => {
      const diff = getTime(b) - getTime(a); // newest first
      return selectedOption === 'newest' ? diff : -diff;
    });

    // Re-append sorted
    const container = document.querySelector('.card-grid');
    const frag = document.createDocumentFragment();
    cards.forEach(card => frag.appendChild(card));
    container.appendChild(frag);
  })
});
