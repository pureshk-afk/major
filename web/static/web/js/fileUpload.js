
const fileInput = document.getElementById('fileInput');
const uploadedFilesContainer = document.getElementById('uploadedFiles');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
let uploadedFilesData = [];

fileInput.addEventListener('change', function(e) {
const files = Array.from(e.target.files);
files.forEach(function(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
    const fileData = {
        name: file.name,
        dataUrl: event.target.result
    };
    uploadedFilesData.push(fileData);
    renderUploadedFiles();
    };
    reader.readAsDataURL(file);
});
fileInput.value = '';
});

function renderUploadedFiles() {
    uploadedFilesContainer.innerHTML = '';
    uploadedFilesData.forEach(function(fileData, index) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'uploaded-file';

        const img = document.createElement('img');
        img.src = fileData.dataUrl;
        img.alt = fileData.name;

        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-file';
        removeBtn.innerHTML = '<svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L8 8M8 2L2 8" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>';
        removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        uploadedFilesData.splice(index, 1);
        renderUploadedFiles();
        });

        fileDiv.appendChild(img);
        fileDiv.appendChild(removeBtn);
        uploadedFilesContainer.appendChild(fileDiv);
    });
}
