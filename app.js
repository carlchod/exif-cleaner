// Wir holen uns die HTML-Elemente anhand ihrer IDs
const imageUpload = document.getElementById('imageUpload');
const resultArea = document.getElementById('resultArea');
const downloadBtn = document.getElementById('downloadBtn');

// Hier speichern wir das fertige Bild und den ursprünglichen Namen zwischen
let cleanedImageDataUrl = '';
let originalFileName = '';

// Event-Listener: Was passiert, wenn der Nutzer ein Bild auswählt?
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return; // Abbruch, falls keine Datei ausgewählt wurde

    originalFileName = file.name;

    // FileReader liest die Datei lokal im Browser des Nutzers ein
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Wir erstellen ein temporäres Bild-Objekt im Speicher
        const img = new Image();
        
        img.onload = function() {
            // 1. Eine unsichtbare Leinwand (Canvas) erstellen
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            // 2. Das Bild auf die Leinwand zeichnen (Hier verschwinden die EXIF-Daten!)
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // 3. Die reinen Pixeldaten wieder als Bild exportieren (Qualität: 100%)
            // Wir exportieren hier standardmäßig als JPEG, um es simpel zu halten
            cleanedImageDataUrl = canvas.toDataURL('image/jpeg', 1.0);

            // 4. UI aktualisieren: Den versteckten Erfolgs-Bereich sichtbar machen
            resultArea.classList.remove('hidden');
        };
        
        // Bildquelle mit den eingelesenen Daten füttern, um den Ladevorgang (img.onload) zu starten
        img.src = e.target.result;
    };
    
    // Den Lesevorgang starten
    reader.readAsDataURL(file);
});

// Event-Listener: Was passiert, wenn der Download-Button geklickt wird?
downloadBtn.addEventListener('click', function() {
    if (!cleanedImageDataUrl) return;

    // Wir erstellen einen temporären, unsichtbaren Link (<a> Tag)
    const link = document.createElement('a');
    link.href = cleanedImageDataUrl;
    
    // Wir hängen ein "_cleaned" an den ursprünglichen Dateinamen an
    const nameWithoutExtension = originalFileName.split('.').slice(0, -1).join('.');
    link.download = `${nameWithoutExtension}_cleaned.jpg`;
    
    // Wir fügen den Link kurz dem Dokument hinzu, "klicken" ihn per Code und entfernen ihn wieder
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});