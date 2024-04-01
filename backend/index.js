const fs = require('fs');

// Read the JSON data from the file
fs.readFile('/Users/saisreeharsha/Desktop/CUDA/Coding Assessment - Data Visualization/API_DATA.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Function to convert JSON data to HTML
  const convertJSONToHTML = (data) => {
    let html = '<ul>';
    for (const key in data) {
      html += `<li>${key}: `;
      if (typeof data[key] === 'object') {
        html += convertJSONToHTML(data[key]);
      } else {
        html += data[key];
      }
      html += '</li>';
    }
    html += '</ul>';
    return html;
  };

  // Convert JSON data to HTML
  const htmlData = convertJSONToHTML(jsonData);

  // Output the HTML data
  console.log(htmlData);
});
