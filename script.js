window.onload = function() {
    // Yeh automatic current GitHub page ka URL detect kar lega
    let currentUrl = window.location.href;
    let mobileUrl;
    
    if (currentUrl.includes("index.html")) {
        mobileUrl = currentUrl.replace("index.html", "mobile.html");
    } else {
        mobileUrl = currentUrl.endsWith("/") ? currentUrl + "mobile.html" : currentUrl + "/mobile.html";
    }

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
