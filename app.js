const imageUpload = document.getElementById('imageUpload');
const dropzone = document.getElementById('dropzone');
const resultArea = document.getElementById('resultArea');
const downloadBtn = document.getElementById('downloadBtn');
const logList = document.getElementById('logList');

const progressStatus = document.getElementById('progressStatus');
const progressPercentage = document.getElementById('progressPercentage');
const progressBar = document.getElementById('progressBar');

// NEU: Elemente für die Einstellungen
const formatSelect = document.getElementById('formatSelect');
const qualitySlider = document.getElementById('qualitySlider');
const qualityLabel = document.getElementById('qualityLabel');

let generatedZipBlob = null;

// UI-Logik für den Slider (Label live updaten)
qualitySlider.addEventListener('input', function(e) {
    qualityLabel.textContent = `${e.target.value}%`;
});

// Drag & Drop Event-Handling
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
        dropzone.classList.add('border-blue-500', 'bg-blue-50');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
        dropzone.classList.remove('border-blue-500', 'bg-blue-50');
    }, false);
});

dropzone.addEventListener('drop', function(e) {
    const files = e.dataTransfer.files;
    if (files.length > 0) processFilesArray(files);
}, false);

imageUpload.addEventListener('change', function(event) {
    const files = event.target.files;
    if (files.length > 0) processFilesArray(files);
});

// ==========================================
// KERN-LOGIK
// ==========================================
async function processFilesArray(files) {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) {
        alert("Bitte lade nur Bilddateien (JPEG, PNG, WEBP) hoch.");
        return;
    }

    logList.innerHTML = '';
    resultArea.classList.remove('hidden');
    downloadBtn.disabled = true;
    downloadBtn.textContent = "Verarbeite Bilder...";
    
    progressBar.style.width = '0%';
    progressPercentage.textContent = '0%';
    progressStatus.textContent = `Starte Verarbeitung von ${validFiles.length} Bild(ern)...`;
    
    const zip = new JSZip();

    // Aktuelle Einstellungen auslesen
    const targetFormat = formatSelect.value;
    // Canvas benötigt die Qualität als Float zwischen 0.0 und 1.0
    const targetQuality = parseInt(qualitySlider.value) / 100;

    for (let i = 0; i < validFiles.length; i++) {
        progressStatus.textContent = `Verarbeite Bild ${i + 1} von ${validFiles.length}...`;
        
        // Einstellungen an die Funktion übergeben
        await processSingleFile(validFiles[i], zip, targetFormat, targetQuality);
        
        const percent = Math.round(((i + 1) / validFiles.length) * 100);
        progressBar.style.width = `${percent}%`;
        progressPercentage.textContent = `${percent}%`;
    }

    progressStatus.textContent = "Erstelle ZIP-Archiv...";
    
    zip.generateAsync({ type: "blob" }).then(function(content) {
        generatedZipBlob = content;
        downloadBtn.disabled = false;
        downloadBtn.textContent = `${validFiles.length} Bild(er) als ZIP herunterladen`;
        progressStatus.textContent = "✅ Alle Bilder erfolgreich bereinigt!";
    });
}

function processSingleFile(file, zip, targetFormat, targetQuality) {
    return new Promise((resolve) => {
        EXIF.getData(file, function() {
            const make = EXIF.getTag(this, "Make") || "Unbekannt";
            const model = EXIF.getTag(this, "Model") || "";
            const hasGPS = EXIF.getTag(this, "GPSLatitude") ? true : false;
            
            const li = document.createElement('li');
            const gpsText = hasGPS 
                ? '<span class="text-red-500 font-bold">GPS gefunden!</span>' 
                : '<span class="text-green-500">Kein GPS</span>';
                
            li.innerHTML = `<strong>${file.name}</strong>: ${make} ${model} | ${gpsText}`;
            logList.appendChild(li);
        });

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Bestimmen, welches Format genutzt werden soll
                let outputMimeType = targetFormat;
                if (outputMimeType === 'original') {
                    outputMimeType = file.type;
                }
                
                // Fallback: Canvas unterstützt nur jpeg, png und webp. 
                if (!['image/jpeg', 'image/png', 'image/webp'].includes(outputMimeType)) {
                    outputMimeType = 'image/jpeg';
                }

                // Das Bild im gewünschten Format und der gewünschten Qualität extrahieren
                const dataUrl = canvas.toDataURL(outputMimeType, targetQuality);
                
                // Präfix abschneiden für ZIP (Regex passt sich dynamisch an jpeg, png oder webp an)
                const base64Data = dataUrl.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
                
                // Richtige Dateiendung generieren
                let extension = outputMimeType.split('/')[1]; // z.B. 'jpeg' aus 'image/jpeg'
                if (extension === 'jpeg') extension = 'jpg';
                
                const cleanName = file.name.split('.').slice(0, -1).join('.') + '_cleaned.' + extension;
                
                zip.file(cleanName, base64Data, {base64: true});
                resolve();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

downloadBtn.addEventListener('click', function() {
    if (!generatedZipBlob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(generatedZipBlob);
    link.download = "bereinigte_bilder.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});