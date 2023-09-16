  const form = document.getElementById("add-data-form");
  form.addEventListener("submit", function(e) {

    e.preventDefault();

    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;

    // Create an object with the data you want to send in the request body
    const data = {
        "word": word,
        "definition": definition,
    };

    // Make a PUT request using the fetch API
  
    fetch(`http://${url}:3222/products/name/${name_swiper}`, { // Replace 'YourProductName' with the actual product name
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
          
            return response.json(); // Parse the JSON response
            
        })
        .then((updatedProduct) => {
          alert("เรียบร้อยค่ะเตง")
            console.log('Product updated:', updatedProduct);
            // Handle the successful response as needed
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });

    })
  
