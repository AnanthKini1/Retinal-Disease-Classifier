// Update file name when file is selected
document.getElementById("imageInput").addEventListener("change", (e) => {
    const fileName = e.target.files[0] ? e.target.files[0].name : "Choose File";
    document.getElementById("imageInput").textContent = fileName;
});

// Main function to upload and analyze retinal images

function uploadImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image first!');
        return;
    }

    document.getElementById('results').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    const formData = new FormData();
    formData.append('file', file);

    // Sends POST request to Flask API and displays results
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayResults(file, data.predictions);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error analyzing image. Please try again.');
        document.getElementById('loading').classList.add('hidden');
    });
};

function displayResults() {
    document.getElementById('loading').classList.add('hidden');

    // Show image preview
    const imagePreview = document.getElementById('imagePreview');
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    imagePreview.innerHTML = '';
    imagePreview.appendChild(img);
    
    // Show predictions
    const predictionsDiv = document.getElementById('predictions');
    predictionsDiv.innerHTML = '<h3>Top 3 Diseases Identified:</h3>';
    
    predictions.forEach((pred, index) => {
        const predItem = document.createElement('div');
        predItem.className = 'prediction-item';
        predItem.innerHTML = `
            <span class="disease-name">${index + 1}. ${pred.disease}</span>
            <span class="probability">${pred.percentage}</span>
        `;
        predictionsDiv.appendChild(predItem);
    });
    
    // Show results section
    document.getElementById('results').classList.remove('hidden');

}
