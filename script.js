let peer;
let connectedCalls = {};

window.onload = function() {
    // GitHub page ka URL handle karna
    let currentUrl = window.location.href;
    let mobileUrl;
    if (currentUrl.includes("index.html")) {
        mobileUrl = currentUrl.replace("index.html", "mobile.html");
    } else {
        mobileUrl = currentUrl.endsWith("/") ? currentUrl + "mobile.html" : currentUrl + "/mobile.html";
    }

    // PeerJS initialization for Computer (Master Dashboard)
    // Ek unique random ID computer ke liye banegi
    peer = new Peer();

    peer.on('open', (id) => {
        console.log("Master Peer ID: " + id);
        // QR code ke URL me computer ki Peer ID bhi bhejenge taaki mobile ko pata chale kisse connect hona hai
        let finalQRUrl = mobileUrl + "?host=" + id;

        document.getElementById("qrcode").innerHTML = ""; 
        new QRCode(document.getElementById("qrcode"), {
            text: finalQRUrl,
            width: 128,
            height: 128
        });

        document.getElementById("connection-url").innerText = finalQRUrl;
    });

    // Jab koi mobile camera connect hone ki koshish karega
    peer.on('call', (call) => {
        call.answer(); // Call accept karna

        call.on('stream', (remoteStream) => {
            // Mobile se jo video stream aa rahi hai usko hum kisi bhi khali box me daal denge
            let camNum = getNextAvailableBox();
            if (camNum) {
                let videoElement = document.getElementById(`cam${camNum}`);
                videoElement.srcObject = remoteStream;
                
                // Box ka label update karna
                let labelBox = videoElement.parentElement.querySelector('.cam-label');
                labelBox.innerText = `Camera ${camNum} (Connected)`;
                labelBox.style.background = "green";
            }
        });
    });
};

// Khali box dhundne ke liye function
function getNextAvailableBox() {
    for (let i = 1; i <= 6; i++) {
        let video = document.getElementById(`cam${i}`);
        if (!video.srcObject) {
            return i;
        }
    }
    return null;
}

// Computer par kisi box par click karne se bada screen par dikhna
function selectCamera(camNumber) {
    let selectedVideo = document.getElementById(`cam${camNumber}`);
    let mainOutput = document.getElementById("mainOutput");
    
    if (selectedVideo.srcObject) {
        mainOutput.srcObject = selectedVideo.srcObject;
    } else {
        alert(`Camera ${camNumber} is offline!`);
    }
}
