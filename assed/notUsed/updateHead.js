function updateHead() {
    // Fetch the template file
    fetch('html-template.html')
        .then(response => response.text())
        .then(template => {
            // Find the <head> section of the template
            const parser = new DOMParser();
            const doc = parser.parseFromString(template, 'text/html');
            const templateHead = doc.querySelector('head');

            // Select the HTML files you want to update
            const filesToUpdate = ['Contact.html', 'Addtask.html', 'Board.html', 'index.html'];

            // Iterate through the files and update their <head> sections
            filesToUpdate.forEach(file => {
                // Fetch the content of the HTML file
                fetch(file)
                    .then(response => response.text())
                    .then(content => {
                        // Find the <head> section of the current HTML file
                        const doc = parser.parseFromString(content, 'text/html');
                        const currentHead = doc.querySelector('head');

                        // Replace the contents of the current <head> with the template <head>
                        currentHead.innerHTML = templateHead.innerHTML;

                        // Update the HTML file with the modified content
                        fetch(file, {
                            method: 'PUT', // Use the appropriate HTTP method (e.g., PUT, POST) for your server
                            body: doc.documentElement.outerHTML,
                        })
                            .then(() => {
                                console.log(`Updated ${file}`);
                            })
                            .catch(error => {
                                console.error(`Error updating ${file}: ${error}`);
                            });
                    })
                    .catch(error => {
                        console.error(`Error fetching ${file}: ${error}`);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching the template:', error);
        });
}

// Call the updateHead function when the page loads
updateHead();