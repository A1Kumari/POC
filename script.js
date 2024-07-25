const colorRadios = document.querySelectorAll('input[name="color"]');
const memoryRadios = document.querySelectorAll('input[name="memory"]');

colorRadios.forEach(radio => radio.addEventListener('change', updateOptions));
memoryRadios.forEach(radio => radio.addEventListener('change', updateOptions));

function updateOptions() {
  const selectedColor = document.querySelector('input[name="color"]:checked');
  const selectedMemory = document.querySelector('input[name="memory"]:checked');

  colorRadios.forEach(radio => radio.disabled = false);
  memoryRadios.forEach(radio => radio.disabled = false);

  if (selectedColor) {
    const color = selectedColor.value;

    if (color === 'Red') {
      disableMemoryOption('128GB');
    } else if (color === 'Black') {
      disableMemoryOption('256GB');
    } else if (color === 'White') {
      disableMemoryOption('64GB');
      disableMemoryOption('128GB');
      disableMemoryOption('256GB');
    }
  }

  if (selectedMemory) {
    const memory = selectedMemory.value;

    if (memory === '64GB') {
      disableColorOption('White');
    } else if (memory === '128GB') {
      disableColorOption('Red');
      disableColorOption('White');
    } else if (memory === '256GB') {
      disableColorOption('White');
      disableColorOption('Black');
    }
  }
}

function disableMemoryOption(value) {
  memoryRadios.forEach(radio => {
    if (radio.value === value) {
      radio.disabled = true;
    }
  });
}

function disableColorOption(value) {
  colorRadios.forEach(radio => {
    if (radio.value === value) {
      radio.disabled = true;
    }
  });
}

document.getElementById('saveChanges').addEventListener('click', function() {
  const selectedColor = document.querySelector('input[name="color"]:checked');
  const selectedMemory = document.querySelector('input[name="memory"]:checked');

  if (!selectedColor || !selectedMemory) {
    alert('Please select both color and memory options.');
    return;
  }

  const color = selectedColor.value;
  const memory = selectedMemory.value;
  let productId = '';

  if (color === 'Red' && memory === '64GB') {
    productId = '1001';
  } else if (color === 'Black' && memory === '64GB') {
    productId = '1002';
  } else if (color === 'Red' && memory === '256GB') {
    productId = '1003';
  } else if (color === 'Black' && memory === '128GB') {
    productId = '1004';
  } else {
    alert('This combination is not available.');
    return;
  }

  alert('Selected Product ID: ' + productId);
});
