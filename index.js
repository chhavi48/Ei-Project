var clickedSections = [];

function toggleSection(section) {
  section.classList.toggle('shaded');
}

function submitAnswer() {
  var shadedSections = document.querySelectorAll('.section.shaded');
  clickedSections = Array.from(shadedSections).map(function (section) {
    return section.classList[1];
  });
  
  console.log('Clicked Sections:', clickedSections);
  // Additional actions or processing can be done here
}
