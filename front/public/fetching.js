  const form = document.getElementById("add-data-form");
  const url = "localhost";
  let name_swiper = "test1";
  form.addEventListener("submit", function(e) {

    e.preventDefault();

    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;

    const data = {
        "word": word,
        "definition": definition,
    };
  
    fetch(`http://${url}:3222/products/name/${name_swiper}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
          
            return response.json(); 
            
        })
        .then((updatedProduct) => {
          alert("เรียบร้อยค่ะเตง")
            console.log('Product updated:', updatedProduct);

        })
        .catch((error) => {
            console.error('Error:', error);
    
        });

    })
  
