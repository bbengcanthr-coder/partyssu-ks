// ฟังก์ชันสำหรับอัปเดตชื่อผู้ใช้บนจดหมาย
function updateName() {
    const nameInput = document.getElementById('nameInput').value;
    const guestNameSpan = document.getElementById('guestName');
    const downloadButton = document.getElementById('downloadButton');
    
    if (nameInput.trim() !== "") {
        // อัปเดตชื่อผู้ใช้
        guestNameSpan.textContent = nameInput;
        // แสดงชื่อและปุ่มดาวน์โหลด
        guestNameSpan.classList.add('show');
        downloadButton.style.display = 'block';
    } else {
        // ซ่อนชื่อและปุ่มดาวน์โหลดถ้าไม่มีชื่อ
        guestNameSpan.textContent = "";
        guestNameSpan.classList.remove('show');
        downloadButton.style.display = 'none';
        alert("กรุณากรอกชื่อของคุณ");
    }
}

// ฟังก์ชันสำหรับดาวน์โหลดภาพจดหมาย
function downloadImage() {
    const letterContainer = document.getElementById('letter-container');
    const nameInput = document.getElementById('nameInput').value.trim();
    
    // ตรวจสอบว่ามีชื่อแล้วค่อยดาวน์โหลด
    if (nameInput === "") {
        alert("กรุณากรอกชื่อและกดยืนยันก่อนดาวน์โหลด");
        return;
    }

    // ใช้ html2canvas แปลง div (#letter-container) เป็น canvas
    html2canvas(letterContainer, {
        allowTaint: true, 
        useCORS: true, 
        scale: 2, // เพิ่ม scale เพื่อให้ภาพที่ได้มีความละเอียด 2 เท่าของขนาดที่แสดงผล
    }).then(canvas => {
        // แปลง canvas เป็น URL รูปภาพ JPEG (คุณภาพ 90%)
        const imageURL = canvas.toDataURL('image/jpeg', 0.9); 
        
        // สร้างลิงก์ดาวน์โหลด
        const link = document.createElement('a');
        link.href = imageURL;
        // ตั้งชื่อไฟล์ดาวน์โหลด: Invitation_ชื่อที่กรอก.jpg
        link.download = `Invitation_${nameInput.replace(/\s/g, '_')}.jpg`; 
        
        // สั่งให้คลิกเพื่อเริ่มดาวน์โหลด
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
