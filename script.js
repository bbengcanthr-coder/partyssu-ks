// ฟังก์ชันสำหรับอัปเดตชื่อผู้ใช้บนจดหมาย
function updateName() {
    const nameInput = document.getElementById('nameInput').value;
    const guestNameSpan = document.getElementById('guestName');
    const downloadButton = document.getElementById('downloadButton');
    
    if (nameInput.trim() !== "") {
        // อัปเดตชื่อผู้ใช้
        guestNameSpan.textContent = nameInput;
        // แสดงชื่อ (ใช้ class 'show' เพื่อให้ชื่อปรากฏแบบมี transition)
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
    
    if (nameInput === "") {
        alert("กรุณากรอกชื่อและกดยืนยันก่อนดาวน์โหลด");
        return;
    }

    // ใช้ html2canvas แปลง div (#letter-container) เป็น canvas
    // นี่คือส่วนสำคัญที่ทำให้ชื่อ "เข้าไปอยู่ในภาพ" ที่ดาวน์โหลด
    html2canvas(letterContainer, {
        allowTaint: true, 
        useCORS: true, 
        scale: 2, // เพิ่ม scale เพื่อให้ภาพที่ได้มีความละเอียดสูง (High Resolution)
        // ตรวจสอบให้แน่ใจว่าภาพพื้นหลัง (College of Aviation.jpg) ถูกโหลดสมบูรณ์
    }).then(canvas => {
        // แปลง canvas เป็น URL รูปภาพ JPEG 
        const imageURL = canvas.toDataURL('image/jpeg', 0.95); // 0.95 คือคุณภาพของภาพ
        
        // สร้างลิงก์และสั่งดาวน์โหลด
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = `Invitation_${nameInput.replace(/\s/g, '_')}.jpg`; 
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
