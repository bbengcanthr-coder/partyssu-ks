function updateName() {
    const nameInput = document.getElementById('nameInput').value;
    const guestNameSpan = document.getElementById('guestName');
    const downloadButton = document.getElementById('downloadButton');
    
    if (nameInput.trim() !== "") {
        // อัปเดตชื่อผู้ใช้
        guestNameSpan.textContent = nameInput;
        // แสดงปุ่มดาวน์โหลด
        downloadButton.style.display = 'inline-block';
    } else {
        guestNameSpan.textContent = "";
        downloadButton.style.display = 'none';
        alert("กรุณากรอกชื่อของคุณก่อน");
    }
}

function downloadImage() {
    const letterContainer = document.getElementById('letter-container');
    const nameInput = document.getElementById('nameInput').value;
    
    // ใช้ html2canvas แปลง div เป็น canvas
    html2canvas(letterContainer, {
        allowTaint: true, // อนุญาตให้โหลดภาพจากแหล่งอื่น (ถ้าจำเป็น)
        useCORS: true, // ใช้ CORS สำหรับการโหลดภาพ
        scale: 2, // เพิ่ม scale เพื่อให้ภาพที่ได้มีความละเอียดสูงขึ้น
        backgroundColor: null // ทำให้พื้นหลังโปร่งใส (ถ้าไม่มีพื้นหลัง)
    }).then(canvas => {
        // แปลง canvas เป็น URL รูปภาพ
        const imageURL = canvas.toDataURL('image/jpeg', 0.9); // สามารถเปลี่ยนเป็น 'image/png' ได้
        
        // สร้างลิงก์ดาวน์โหลด
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = `Invitation_${nameInput.replace(/\s/g, '_')}.jpg`; // ตั้งชื่อไฟล์
        
        // คลิกเพื่อเริ่มดาวน์โหลด
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
