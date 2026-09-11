window.onload = function() {
    // Tumhara exact local IP aur Live Server port
    const localIP = "10.236.169.201:5500";

    let mobileUrl = `http://${localIP}/mobile.html`;

    // QR code generate karna
    document.getElementById("qrcode").innerHTML = ""; 
    new QRCode(document.getElementById("qrcode"), {
        text: mobileUrl,
        width: 128,
        height: 128
    });

    document.getElementById("connection-url").innerText = mobileUrl;
};

// Function jab chote camera box par click ho
function selectCamera(camNumber) {
    let selectedVideo = document.getElementById(`cam${camNumber}`);
    let mainOutput = document.getElementById("mainOutput");
    
    if (selectedVideo.srcObject) {
        mainOutput.srcObject = selectedVideo.srcObject;
    } else {
        alert(`Camera ${camNumber} is not connected yet!`);
    }
}