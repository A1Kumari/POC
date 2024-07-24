document.getElementById('colorDropdown').addEventListener('change', function() {
    updateOptions();
  });

  document.getElementById('memoryDropdown').addEventListener('change', function() {
    updateOptions();
  });

  function updateOptions() {
    const color = document.getElementById('colorDropdown').value;
    const memory = document.getElementById('memoryDropdown').value;

    const memoryOptions = document.getElementById('memoryDropdown').options;
    const colorOptions = document.getElementById('colorDropdown').options;

    // Enable all options first
    for (let i = 0; i < memoryOptions.length; i++) {
      memoryOptions[i].disabled = false;
    }

    for (let i = 0; i < colorOptions.length; i++) {
      colorOptions[i].disabled = false;
    }

    // Disable incompatible options based on selection
    if (color === 'Red') {
      disableOption('128GB');
    } else if (color === 'Black') {
      disableOption('256GB');
    } else if (color === 'White') {
      disableOption('64GB');
      disableOption('128GB');
      disableOption('256GB');
    }

    if (memory === '64GB') {
      disableOption('White');
    } else if (memory === '128GB') {
      disableOption('Red');
      disableOption('White');
    } else if (memory === '256GB') {
      disableOption('White');
      disableOption('Black');
    }
  }

  function disableOption(value) {
    const memoryOptions = document.getElementById('memoryDropdown').options;
    const colorOptions = document.getElementById('colorDropdown').options;

    for (let i = 0; i < memoryOptions.length; i++) {
      if (memoryOptions[i].value === value) {
        memoryOptions[i].disabled = true;
      }
    }

    for (let i = 0; i < colorOptions.length; i++) {
      if (colorOptions[i].value === value) {
        colorOptions[i].disabled = true;
      }
    }
  }

  document.getElementById('saveChanges').addEventListener('click', function() {
    const color = document.getElementById('colorDropdown').value;
    const memory = document.getElementById('memoryDropdown').value;

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