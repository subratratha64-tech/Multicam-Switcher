let peer;
let connectedPeersCount = 0;

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
    peer = new Peer();

    peer.on('open', (id) => {
        console.log("Master Peer ID: " + id);
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
            let camNum = getNextAvailableBox();
            if (camNum) {
                let videoElement = document.getElementById(`cam${camNum}`);
                videoElement.srcObject = remoteStream;
                videoElement.play().catch(e => console.log("Autoplay blocked:", e));
                
                // Box ka label update karna
                let labelBox = videoElement.parentElement.querySelector('.cam-label');
                labelBox.innerText = `Camera ${camNum} (Connected)`;
                labelBox.style.background = "green";
                connectedPeersCount++;
            } else {
                alert("All 6 camera slots are full!");
            }
        });
    });

    peer.on('error', (err) => {
        console.error("Peer error:", err);
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
        mainOutput.play().catch(e => console.log("Autoplay blocked:", e));
    } else {
        alert(`Camera ${camNumber} is offline!`);
    }
}

// Live News Headline update karne ke liye function
function updateHeadline() {
    let inputText = document.getElementById("headlineInput").value;
    if (inputText.trim() !== "") {
        let tickerSpan = document.querySelector(".news-ticker span");
        tickerSpan.innerText = "⚡ Breaking News: " + inputText + " ";
        document.getElementById("headlineInput").value = "";
    }
}
