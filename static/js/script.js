// Update file name when file is selected
document.getElementById("imageInput").addEventListener("change", (e) => {
    const fileName = e.target.files[0] ? e.target.files[0].name : "Choose File";
    document.getElementById("fileName").textContent = fileName;
});

/// Disease name mapping
const diseaseNames = {
    'DR': 'Diabetic Retinopathy',
    'ARMD': 'Age-Related Macular Degeneration',
    'MH': 'Macular Hole',
    'DN': 'Drusen',
    'MYA': 'Myopia',
    'BRVO': 'Branch Retinal Vein Occlusion',
    'TSLN': 'Tessellation',
    'ERM': 'Epiretinal Membrane',
    'LS': 'Laser Scars',
    'MS': 'Macular Scar',
    'CSR': 'Central Serous Retinopathy',
    'ODC': 'Optic Disc Cupping',
    'CRVO': 'Central Retinal Vein Occlusion',
    'TV': 'Tortuous Vessels',
    'AH': 'Asteroid Hyalosis',
    'ODP': 'Optic Disc Pallor',
    'ODE': 'Optic Disc Edema',
    'ST': 'Optociliary Shunt',
    'AION': 'Anterior Ischemic Optic Neuropathy',
    'PT': 'Parafoveal Telangiectasia',
    'RT': 'Retinal Traction',
    'RS': 'Retinitis',
    'CRS': 'Chorioretinitis',
    'EDN': 'Exudation',
    'RPEC': 'Retinal Pigment Epithelium Changes',
    'MHL': 'Macular Hole (Lamellar)',
    'RP': 'Retinitis Pigmentosa',
    'CWS': 'Cotton Wool Spots',
    'CB': 'Coloboma',
    'ODPM': 'Optic Disc Pit Maculopathy',
    'PRH': 'Preretinal Hemorrhage',
    'MNF': 'Myelinated Nerve Fibers',
    'HR': 'Hemorrhagic Retinopathy',
    'CRAO': 'Central Retinal Artery Occlusion',
    'TD': "Tilted Disc",
    'CME': 'Cystoid Macular Edema',
    'PTCR': 'Post-Traumatic Choroidal Rupture',
    'CF': 'Choroidal Folds',
    'VH': 'Vitreous Hemorrhage',
    'MCA': 'Macroaneurysm',
    'VS': 'Vasculitis',
    'BRAO': 'Branch Retinal Artery Occlusion',
    'PLQ': 'Plaque',
    'HPED': 'Hemorrhagic Pigment Epithelial Detachment',
    'CL': 'Chorioretinal Lesion'
};

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

function displayResults(file, predictions) {
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
        const fullName = diseaseNames[pred.disease] || pred.disease;
        const displayName = diseaseNames[pred.disease] ? `${fullName} (${pred.disease})` : pred.disease;
        predItem.innerHTML = `
            <span class="disease-name">${index + 1}. ${displayName}</span>
            <span class="probability">${pred.percentage}</span>
        `;
        predictionsDiv.appendChild(predItem);
    });
    
    // Show results section
    document.getElementById('results').classList.remove('hidden');

}
