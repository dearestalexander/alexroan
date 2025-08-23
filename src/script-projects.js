// create unique project names for menu IDs
const slugify = s => (s || '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-') 
  .replace(/(^-|-$)/g, '');  
  
// Build project menu based on frontmatter field 'project'
window.addEventListener('load', () => {
  const projMenuCtr = document.getElementById('proj-menu-ctr');
  const cards = Array.from(document.querySelectorAll('.project-card'));

  // use set to get cards and use set to de-duplicate
  const projectCards = [...new Set(cards.map(c => c.dataset.project))]; 
  projectCards.forEach((project) => {
    const projectMenuItem = document.createElement('li');
    projectMenuItem.classList.add('project-menu-item');
    projectMenuItem.setAttribute("id", `project-${slugify(project)}`);
    projectMenuItem.textContent = project;
    projMenuCtr.appendChild(projectMenuItem);
  })
})


// Filter page by clicks on project menu
document.body.addEventListener('click', (event) => {
  const subProjMenuCtr = document.getElementById('subproj-menu-ctr');
  if (event.target.classList.contains('project-menu-item')) {
    // clear project menu formatting & sub project list
    Array.from(document.getElementById('proj-menu-ctr').children).forEach(item => item.classList.remove('project-menu-selected'));
    subProjMenuCtr.innerHTML = "";
    // highlight selected project and populate subproject menu
    event.target.classList.add('project-menu-selected');
    const projectCards = document.querySelectorAll('.project-card');
    const subProjMenuItems = [];
    for (const projectCard of projectCards) {
      if (event.target.id === "project-menu-all") {
        projectCard.style.display = 'block';
      } else if (`project-${slugify(projectCard.dataset.project)}` === event.target.id) {
        projectCard.style.display = 'block';
        // Capture subproject for seleected project
        if (!subProjMenuItems.includes(projectCard.dataset.subproject)) {
          subProjMenuItems.push(projectCard.dataset.subproject);
        }
      } else {
        projectCard.style.display = 'none';
      }
    }
    subProjMenuCtr.insertAdjacentHTML("beforeend", `<li class="project-menu-title">Sub category:</li>`);
    subProjMenuItems.forEach((subProj) => {
      const subProjMenuItem = document.createElement('li');
      subProjMenuItem.classList.add('subproject-menu-item');
      subProjMenuItem.setAttribute("id", `subproject-${slugify(subProj)}`);
      subProjMenuItem.textContent = subProj;
      subProjMenuCtr.appendChild(subProjMenuItem);
    })
  }
})

document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('subproject-menu-item')) {
    Array.from(document.getElementById('subproj-menu-ctr').children).forEach(item => item.classList.remove('project-menu-selected'));
    event.target.classList.add('project-menu-selected');

    const projectCards = document.querySelectorAll('.project-card');
    for (const projectCard of projectCards) {
      if (`subproject-${slugify(projectCard.dataset.subproject)}` === event.target.id) {
        projectCard.style.display = 'block';
      } else {
        projectCard.style.display = 'none';
      }
    }
  }
})





