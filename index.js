let clickedSections = [];
let correctAnswer = [];

// Get the sections in the first and second rows
const row1Sections = document.querySelectorAll('#row1 .section');
const row2Sections = document.querySelectorAll('#row2 .section');


assignRandomColors();


row2Sections.forEach((section, index) => {
  section.addEventListener('click', () => toggleSection(section, index + 1));
});

function toggleSection(section, sectionNumber) {
  if (section.classList.contains('shaded')) {
    section.classList.remove('shaded');
    clickedSections = clickedSections.filter((item) => item !== sectionNumber);
  } else {
    section.classList.add('shaded');
    clickedSections.push(sectionNumber);
  }
}

function submitAnswer() {
  const alertBox = document.getElementById('alert');
  if (arraysEqual(clickedSections, correctAnswer)) {
    alertBox.textContent = 'Correct!';
    alertBox.className = 'alert correct';
  } else {
    alertBox.textContent = 'Incorrect!';
    alertBox.className = 'alert incorrect';
  }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function refreshExercise() {
  // Clear the clicked sections
  clickedSections = [];

  // Assign random background color to two sections in the first row
  assignRandomColors();

  // Clear the shaded sections in the second row
  row2Sections.forEach((section) => {
    section.classList.remove('shaded');
  });

  // Clear the alert message
  const alertBox = document.getElementById('alert');
  alertBox.textContent = '';
  alertBox.className = 'alert';
}

function assignRandomColors() {

  row1Sections.forEach((section) => {
    section.style.backgroundColor = '';
  });

  // Select random sections in the first row
  const randomSections = getRandomSections(2);


  correctAnswer = randomSections.map((section) => Array.from(row1Sections).indexOf(section) + 1);

  // Assign the same random background color to the selected sections
  const randomColor = generateRandomColor();
  randomSections.forEach((section) => {
    section.style.backgroundColor = randomColor;
  });
}

function getRandomSections(count) {
  const randomSections = [];
  const sectionCount = row1Sections.length;

  while (randomSections.length < count) {
    const randomIndex = Math.floor(Math.random() * sectionCount);
    const randomSection = row1Sections[randomIndex];
    if (!randomSections.includes(randomSection)) {
      randomSections.push(randomSection);
    }
  }

  return randomSections;
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


document.getElementById('submit').addEventListener('click', submitAnswer);
document.getElementById('refresh').addEventListener('click', refreshExercise);
