// ==========================================
// TRANSLATION DICTIONARY
// ==========================================
const translations = {
    en: {
        title: "EXIF Cleaner Pro",
        subtitle: "Drag and drop as many images as you want. We analyze them and pack them cleaned into a ZIP. <br><span class='text-green-600 font-medium'>100% local in your browser.</span>",
        formatLabel: "Output Format",
        formatOriginal: "Keep Original",
        formatJpeg: "Convert to JPEG",
        formatWebp: "Convert to WebP (for Web)",
        formatPng: "Convert to PNG",
        qualityLabel: "Image Quality",
        qualityHint: "PNG ignores this setting.",
        dropBoxText: "<span class='font-semibold text-blue-600'>Choose images</span> or drag them here",
        progressPrep: "Preparing processing...",
        resultsTitle: "Analysis Results:",
        btnWaiting: "Waiting for processing...",
        alertNoImage: "Please upload only image files (JPEG, PNG, WEBP).",
        statusStart: "Starting processing of {count} image(s)...",
        statusProcess: "Processing image {current} of {total}...",
        statusZip: "Creating ZIP archive...",
        statusDone: "✅ All images successfully cleaned!",
        btnDownload: "Download {count} image(s) as ZIP",
        gpsFound: "<span class='text-red-500 font-bold'>GPS found!</span>",
        noGps: "<span class='text-green-500'>No GPS</span>",
        unknown: "Unknown"
    },
    de: {
        title: "EXIF Cleaner Pro",
        subtitle: "Zieh so viele Bilder rein, wie du willst. Wir analysieren sie und packen sie bereinigt in ein ZIP. <br><span class='text-green-600 font-medium'>100% lokal im Browser.</span>",
        formatLabel: "Ausgabeformat",
        formatOriginal: "Original beibehalten",
        formatJpeg: "Konvertieren zu JPEG",
        formatWebp: "Konvertieren zu WebP (fürs Web)",
        formatPng: "Konvertieren zu PNG",
        qualityLabel: "Bildqualität",
        qualityHint: "PNG ignoriert diese Einstellung.",
        dropBoxText: "<span class='font-semibold text-blue-600'>Bilder auswählen</span> oder reinziehen",
        progressPrep: "Bereite Verarbeitung vor...",
        resultsTitle: "Analyse-Ergebnisse:",
        btnWaiting: "Warte auf Verarbeitung...",
        alertNoImage: "Bitte lade nur Bilddateien (JPEG, PNG, WEBP) hoch.",
        statusStart: "Starte Verarbeitung von {count} Bild(ern)...",
        statusProcess: "Verarbeite Bild {current} von {total}...",
        statusZip: "Erstelle ZIP-Archiv...",
        statusDone: "✅ Alle Bilder erfolgreich bereinigt!",
        btnDownload: "{count} Bild(er) als ZIP herunterladen",
        gpsFound: "<span class='text-red-500 font-bold'>GPS gefunden!</span>",
        noGps: "<span class='text-green-500'>Kein GPS</span>",
        unknown: "Unbekannt"
    },
    es: {
        title: "EXIF Cleaner Pro",
        subtitle: "Arrastra y suelta tantas imágenes como quieras. Las analizamos y las empaquetamos limpias en un ZIP. <br><span class='text-green-600 font-medium'>100% local en tu navegador.</span>",
        formatLabel: "Formato de salida",
        formatOriginal: "Mantener Original",
        formatJpeg: "Convertir a JPEG",
        formatWebp: "Convertir a WebP (para Web)",
        formatPng: "Convertir a PNG",
        qualityLabel: "Calidad de imagen",
        qualityHint: "PNG ignora esta configuración.",
        dropBoxText: "<span class='font-semibold text-blue-600'>Elige imágenes</span> o arrástralas aquí",
        progressPrep: "Preparando procesamiento...",
        resultsTitle: "Resultados del análisis:",
        btnWaiting: "Esperando procesamiento...",
        alertNoImage: "Sube solo archivos de imagen (JPEG, PNG, WEBP).",
        statusStart: "Iniciando el procesamiento de {count} imagen(es)...",
        statusProcess: "Procesando imagen {current} de {total}...",
        statusZip: "Creando archivo ZIP...",
        statusDone: "✅ ¡Todas las imágenes limpiadas con éxito!",
        btnDownload: "Descargar {count} imagen(es) como ZIP",
        gpsFound: "<span class='text-red-500 font-bold'>¡GPS encontrado!</span>",
        noGps: "<span class='text-green-500'>Sin GPS</span>",
        unknown: "Desconocido"
    },
    fr: {
        title: "EXIF Cleaner Pro",
        subtitle: "Glissez et déposez autant d'images que vous le souhaitez. Nous les analysons et les regroupons nettoyées dans un ZIP. <br><span class='text-green-600 font-medium'>100% local dans votre navigateur.</span>",
        formatLabel: "Format de sortie",
        formatOriginal: "Conserver l'original",
        formatJpeg: "Convertir en JPEG",
        formatWebp: "Convertir en WebP (pour le Web)",
        formatPng: "Convertir en PNG",
        qualityLabel: "Qualité d'image",
        qualityHint: "Le PNG ignore ce paramètre.",
        dropBoxText: "<span class='font-semibold text-blue-600'>Choisissez des images</span> ou glissez-les ici",
        progressPrep: "Préparation du traitement...",
        resultsTitle: "Résultats d'analyse :",
        btnWaiting: "En attente de traitement...",
        alertNoImage: "Veuillez télécharger uniquement des fichiers image (JPEG, PNG, WEBP).",
        statusStart: "Démarrage du traitement de {count} image(s)...",
        statusProcess: "Traitement de l'image {current} sur {total}...",
        statusZip: "Création de l'archive ZIP...",
        statusDone: "✅ Toutes les images ont été nettoyées avec succès !",
        btnDownload: "Télécharger {count} image(s) en ZIP",
        gpsFound: "<span class='text-red-500 font-bold'>GPS trouvé !</span>",
        noGps: "<span class='text-green-500'>Pas de GPS</span>",
        unknown: "Inconnu"
    }
};

let currentLang = 'en';

// ==========================================
// DOM ELEMENTS
// ==========================================
const langSelect = document.getElementById('langSelect');
const imageUpload = document.getElementById('imageUpload');
const dropzone = document.getElementById('dropzone');
const resultArea = document.getElementById('resultArea');
const downloadBtn = document.getElementById('downloadBtn');
const logList = document.getElementById('logList');
const progressStatus = document.getElementById('progressStatus');
const progressPercentage = document.getElementById('progressPercentage');
const progressBar = document.getElementById('progressBar');
const formatSelect = document.getElementById('formatSelect');
const qualitySlider = document.getElementById('qualitySlider');
const qualityLabel = document.getElementById('qualityLabel');

let generatedZipBlob = null;

// ==========================================
// LANGUAGE SWITCHER LOGIC
// ==========================================
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang; // Update HTML lang tag
    
    // Update all static text elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
}

langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

// Helper function to get text
function t(key, params = {}) {
    let text = translations[currentLang][key] || key;
    for (const [paramKey, paramValue] of Object.entries(params)) {
        text = text.replace(`{${paramKey}}`, paramValue);
    }
    return text;
}

// ==========================================
// UI LOGIC
// ==========================================
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
// CORE LOGIC
// ==========================================
async function processFilesArray(files) {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) {
        alert(t('alertNoImage'));
        return;
    }

    logList.innerHTML = '';
    resultArea.classList.remove('hidden');
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = t('btnWaiting');
    
    progressBar.style.width = '0%';
    progressPercentage.textContent = '0%';
    progressStatus.textContent = t('statusStart', { count: validFiles.length });
    
    const zip = new JSZip();
    const targetFormat = formatSelect.value;
    const targetQuality = parseInt(qualitySlider.value) / 100;

    for (let i = 0; i < validFiles.length; i++) {
        progressStatus.textContent = t('statusProcess', { current: i + 1, total: validFiles.length });
        
        await processSingleFile(validFiles[i], zip, targetFormat, targetQuality);
        
        const percent = Math.round(((i + 1) / validFiles.length) * 100);
        progressBar.style.width = `${percent}%`;
        progressPercentage.textContent = `${percent}%`;
    }

    progressStatus.textContent = t('statusZip');
    
    zip.generateAsync({ type: "blob" }).then(function(content) {
        generatedZipBlob = content;
        downloadBtn.disabled = false;
        downloadBtn.textContent = t('btnDownload', { count: validFiles.length });
        progressStatus.textContent = t('statusDone');
    });
}

function processSingleFile(file, zip, targetFormat, targetQuality) {
    return new Promise((resolve) => {
        EXIF.getData(file, function() {
            const make = EXIF.getTag(this, "Make") || t('unknown');
            const model = EXIF.getTag(this, "Model") || "";
            const hasGPS = EXIF.getTag(this, "GPSLatitude") ? true : false;
            
            const li = document.createElement('li');
            const gpsText = hasGPS ? t('gpsFound') : t('noGps');
                
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

                let outputMimeType = targetFormat;
                if (outputMimeType === 'original') outputMimeType = file.type;
                if (!['image/jpeg', 'image/png', 'image/webp'].includes(outputMimeType)) outputMimeType = 'image/jpeg';

                const dataUrl = canvas.toDataURL(outputMimeType, targetQuality);
                const base64Data = dataUrl.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
                
                let extension = outputMimeType.split('/')[1];
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
    link.download = "cleaned_images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Initialize default language on page load
setLanguage(currentLang);