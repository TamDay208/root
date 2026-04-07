document.addEventListener('DOMContentLoaded', () => {

    // --- ACCORDION LOGIC ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            
            // Toggle current active state
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                body.classList.add('hidden');
            } else {
                item.classList.add('active');
                body.classList.remove('hidden');
            }
        });
    });

    // Initial state: hide inactive accordion bodies
    document.querySelectorAll('.accordion-item:not(.active) .accordion-body').forEach(body => {
        body.classList.add('hidden');
    });

    // --- TIER SELECT & QR UPDATE (Bypass AdBlock) ---
    const tiers = document.querySelectorAll('.tier-item');
    const qrImage = document.getElementById('qrImage');
    const qrStatus = document.getElementById('qrStatus');

    tiers.forEach(tier => {
        tier.addEventListener('click', () => {
            const amount = tier.getAttribute('data-amount');
            
            // Format URL (MBBank, Account: 0913635724)
            const addInfo = encodeURIComponent('Ung ho TamDayyy');
            const qrUrl = `https://img.vietqr.io/image/MB-0913635724-compact2.png?amount=${amount}&addInfo=${addInfo}`;
            
            // Visual feedback on QR update
            qrImage.style.opacity = 0.5;
            qrImage.src = qrUrl;
            
            qrImage.onload = () => {
                qrImage.style.transition = 'opacity 0.3s';
                qrImage.style.opacity = 1;
                
                // Show status text
                qrStatus.style.opacity = 1;
                setTimeout(() => {
                    qrStatus.style.opacity = 0;
                }, 2000);
            };

            // Scroll to QR on mobile
            if (window.innerWidth < 900) {
                const qrSection = document.getElementById('qrSection');
                qrSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const moonPath = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
    const sunPath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon.querySelector('path')) {
            themeIcon.querySelector('path').setAttribute('d', sunPath);
        }
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        if (isLight) {
            themeIcon.querySelector('path').setAttribute('d', sunPath);
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.querySelector('path').setAttribute('d', moonPath);
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- BILINGUAL (I18N) LOGIC ---
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'vi';

    const translations = {
        vi: {
            title: "Dự Án Nuôi Tôi - TamDayyy",
            nav_title: "Dự án Nuôi Tôi",
            nav_subtitle: "Phiên bản \"minh bạch tuyệt đối\"",
            marquee_text: "🌟 Cảm ơn đã đến với website của mình, dự án nuôi tôi được thực hiện bởi <span>TamDayyy</span> 🌟",
            hero_title: "Nuôi Tôi — để tôi no... (và bạn vui)",
            hero_desc: "Mỗi khoản chuyển khoản của bạn sẽ góp phần giúp <strong>tôi được no hơn một chút</strong> và mang lại <strong>niềm vui tinh thần cho bạn.</strong> 😄",
            stat_goal: "Mục tiêu tháng này",
            btn_donate: "Ủng hộ ngay",
            package_title: "Gói ủng hộ",
            pkg_1k: "1 cái kẹo mút",
            pkg_5k: "1 gói bim bim",
            pkg_10k: "1 ổ bánh mì xá xíu",
            pkg_50k: "1 ly trà sữa xịn xò",
            pkg_100k: "Bạn đã cho tôi 1 bữa cơm no !!!",
            faq_title: "FAQ",
            faq_q1: "Tiền của tôi đi đâu?",
            faq_a1: "Đi vào \"quỹ\" — và quỹ thì đi vào... lòng tin. (đùa thôi, vào tài khoản của tôi mà 😅)",
            faq_q2: "Có minh bạch không?",
            faq_a2: "Minh bạch: bạn thấy rõ là bạn đã chuyển khoản để nuôi tôi.",
            faq_q3: "Có sao kê không?",
            faq_a3: "Sao kê sẽ được cập nhật định kỳ (hoặc không). 😊",
            qr_title: "Quét mã để ủng hộ nhanh",
            qr_note: "* QR là thật và bạn đang chuyển khoản để nuôi tôi 😅",
            qr_success: "Đã cập nhật mã QR!",
            tl_title: "Hành trình “nuôi tôi”",
            tl_step1_title: "Kêu gọi",
            tl_step1_desc: "Lời kêu gọi cảm động, nhạc nền piano...",
            tl_step2_title: "Đóng góp",
            tl_step2_desc: "Bạn bấm “Ủng hộ ngay” với niềm tin rực cháy.",
            tl_step3_title: "Cập nhật",
            tl_step3_desc: "Tiến độ nhảy số... hơi nghệ thuật.",
            tl_step4_title: "Cảm ơn",
            tl_step4_desc: "Bạn nhận được một cái ôm online 🫂",
            btn_dl_qr: "⬇️ Tải mã QR",
            btn_copy: "📋 Copy STK"
        },
        en: {
            title: "Feed Me Project - TamDayyy",
            nav_title: "Feed Me Project",
            nav_subtitle: "The \"absolutely transparent\" edition",
            marquee_text: "🌟 Thank you for visiting my website, the Feed Me project was created by <span>TamDayyy</span> 🌟",
            hero_title: "Feed Me — so I get full... (and you get happy)",
            hero_desc: "Every donation of yours helps <strong>keep my stomach a bit fuller</strong> and brings <strong>mental joy to you.</strong> 😄",
            stat_goal: "This month's goal",
            btn_donate: "Donate Now",
            package_title: "Donation Packages",
            pkg_1k: "1 lollipop",
            pkg_5k: "1 pack of snacks",
            pkg_10k: "1 BBQ pork banh mi",
            pkg_50k: "1 premium milk tea",
            pkg_100k: "You gave me a full meal !!!",
            faq_title: "FAQ",
            faq_q1: "Where does my money go?",
            faq_a1: "Into the \"fund\" — and the fund goes into... trust. (kidding, it goes to my bank account 😅)",
            faq_q2: "Is it transparent?",
            faq_a2: "Transparent: you can clearly see that you wired money to feed me.",
            faq_q3: "Is there a bank statement?",
            faq_a3: "Statements will be updated periodically (or never). 😊",
            qr_title: "Scan to donate quickly",
            qr_note: "* The QR is real and you are actually sending money to feed me 😅",
            qr_success: "QR Code updated!",
            tl_title: "The “feed me” journey",
            tl_step1_title: "The Appeal",
            tl_step1_desc: "Touching words, sad piano music...",
            tl_step2_title: "The Donation",
            tl_step2_desc: "You click “Donate Now” with burning passion.",
            tl_step3_title: "The Update",
            tl_step3_desc: "Numbers go up... very artistically.",
            tl_step4_title: "The Gratitude",
            tl_step4_desc: "You receive a giant virtual hug 🫂",
            btn_dl_qr: "⬇️ Download QR",
            btn_copy: "📋 Copy Acc No."
        }
    };

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'title') {
                    document.title = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
        langToggle.innerText = lang === 'vi' ? 'EN' : 'VI';
    }

    // Init language
    applyTranslations(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'vi' ? 'en' : 'vi';
        localStorage.setItem('lang', currentLang);
        applyTranslations(currentLang);
    });

});

// Global function for Smooth Scroll (Refactored to bypass adblock)
window.scrollSection = function(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

window.downloadQR = function () {
    const qrImage = document.getElementById('qrImage');
    fetch(qrImage.src)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'QR_NuoiToi.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('Không thể tải mã QR tự động. Xin hãy chụp ảnh màn hình nhé!'));
};

window.copySTK = function () {
    navigator.clipboard.writeText("0913635724")
        .then(() => alert("Đã sao chép thành công: 0913635724"))
        .catch(() => alert("Không thể sao chép, bạn copy thủ công nhé!"));
};
