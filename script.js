const colors = [
  { id: 0, name: 'Red' },
  { id: 1, name: 'Black' },
  { id: 2, name: 'White' }
];

const memories = [
  { id: 0, name: '64GB' },
  { id: 1, name: '128GB' },
  { id: 2, name: '256GB' }
];

const products = [
  [1001, 'iPhone 64GB Red'],
  [1002, 'iPhone 64GB Black'],
  [1003, 'iPhone 256GB Red'],
  [1004, 'iPhone 128GB Black']
];

const productCombinations = [
  [1001, 0, 0], // ProductID 1001 corresponds to Red (0), 64GB (0)
  [1002, 1, 0], // ProductID 1002 corresponds to Black (1), 64GB (0)
  [1003, 0, 2], // ProductID 1003 corresponds to Red (0), 256GB (2)
  [1004, 1, 1]  // ProductID 1004 corresponds to Black (1), 128GB (1)
];

function displayProduct() {
  const selectedColorId = parseInt(document.querySelector('input[name="color"]:checked').value);
  const selectedMemoryId = parseInt(document.querySelector('input[name="memory"]:checked').value);

  const product = productCombinations.find(combination => 
    combination[1] === selectedColorId && combination[2] === selectedMemoryId
  );

  if (product) {
    const productId = product[0];
    const productName = products.find(p => p[0] === productId)[1];
    alert(`Selected Product ID: ${productId}\nProduct Name: ${productName}`);
  } else {
    alert('This combination is not available.');
  }
}

document.querySelectorAll('input[name="color"], input[name="memory"]').forEach(radio => {
  radio.addEventListener('change', updateOptions);
});



function updateOptions() {
  const selectedColor = document.querySelector('input[name="color"]:checked');
  const selectedMemory = document.querySelector('input[name="memory"]:checked');

  const selectedColorId = selectedColor ? parseInt(selectedColor.value) : null;
  const selectedMemoryId = selectedMemory ? parseInt(selectedMemory.value) : null;

  enableAllOptions();

  if (selectedColorId !== null) {
    disableInvalidOptions('memory', selectedColorId);
  }
  
  if (selectedMemoryId !== null) {
    disableInvalidOptions('color', selectedMemoryId);
  }
}

function enableAllOptions() {
  const allRadios = document.querySelectorAll('input[type="radio"]');
  allRadios.forEach(radio => radio.disabled = false);
}

function disableInvalidOptions(type, selectedId) {
  const invalidOptions = [];

  if (type === 'color') {
    productCombinations.forEach(combination => {
      if (combination[2] === selectedId && !invalidOptions.includes(combination[1])) {
        invalidOptions.push(combination[1]);
      }
    });
    colors.forEach(color => {
      if (!invalidOptions.includes(color.id)) {
        document.querySelector(`input[name="color"][value="${color.id}"]`).disabled = true;
      }
    });
  } else if (type === 'memory') {
    productCombinations.forEach(combination => {
      if (combination[1] === selectedId && !invalidOptions.includes(combination[2])) {
        invalidOptions.push(combination[2]);
      }
    });
    memories.forEach(memory => {
      if (!invalidOptions.includes(memory.id)) {
        document.querySelector(`input[name="memory"][value="${memory.id}"]`).disabled = true;
      }
    });
  }
}
