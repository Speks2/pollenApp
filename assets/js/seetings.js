// Retrieve saved preferences from local storage, defaulting to true if not found
const treePollenEnabled = JSON.parse(localStorage.getItem('treePollenEnabled')) ?? true;
const grassPollenEnabled = JSON.parse(localStorage.getItem('grassPollenEnabled')) ?? true;
const weedPollenEnabled = JSON.parse(localStorage.getItem('weedPollenEnabled')) ?? true;

// Set initial state of checkboxes based on saved preferences
document.getElementById('treePollenCheckbox').checked = treePollenEnabled;
document.getElementById('grassPollenCheckbox').checked = grassPollenEnabled;
document.getElementById('weedPollenCheckbox').checked = weedPollenEnabled;

// Event listeners for checkbox changes
document.getElementById('treePollenCheckbox').addEventListener('change', function() {
  localStorage.setItem('treePollenEnabled', this.checked);
  // Code to update pollen display based on this.checked
});

document.getElementById('grassPollenCheckbox').addEventListener('change', function() {
  localStorage.setItem('grassPollenEnabled', this.checked);
  // Code to update pollen display based on this.checked
});

document.getElementById('weedPollenCheckbox').addEventListener('change', function() {
  localStorage.setItem('weedPollenEnabled', this.checked);
  // Code to update pollen display based on this.checked
});
