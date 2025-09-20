// Calendar functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    const calendarCells = document.querySelectorAll('.calendar td:not(.unavailable)');
    let selectedDate = null;
    
    console.log('Calendar cells found:', calendarCells.length);
    
    calendarCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // Remove selected class from all cells
            calendarCells.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked cell
            this.classList.add('selected');
            selectedDate = this.textContent + 'Sep 2025';
        });
    });

    // Package data
    const packageData = {
        basic: {
            title: "Basic Package",
            price: "300.000 VNĐ",
            features: [
                "AI Personal Color Test",
                "Basic color palette",
                "Makeup recommendations",
                "Email report",
            ],
            illustration: "basic_package.jpeg",
            gradient: null
        },
        style: {
            title: "Style Package",
            price: "400.000 VNĐ",
            features: [
                "AI Personal Color Test",
                "Makeup recommendations",
                "Outfit color guide",
                "Detailed PDF report"
            ],
            illustration: "style_package.jpeg",
            gradient: null
        },
        advance: {
            title: "Advance Package",
            price: "1.000.000 VNĐ", 
            features: [
                "AI Personal Color Test",
                "Makeup + Outfit + Hair Color Advisor",
                "Detailed PDF Report",
                "On-the-spot makeup"
            ],
            illustration: "advance_package.jpeg",
            gradient: null
        }
    };

    // Function to update package content
    function updatePackageContent(packageType) {
        const data = packageData[packageType];
        const illustration = document.getElementById('packageIllustration');
        
        document.getElementById('packageTitle').textContent = data.title;
        document.getElementById('packagePrice').textContent = data.price;
        
        // Check if illustration is an image file or text
        if (data.illustration.includes('.jpeg') || data.illustration.includes('.jpg') || data.illustration.includes('.png')) {
            // Display as image
            illustration.innerHTML = `<img src="${data.illustration}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
            illustration.style.background = 'transparent';
        } else {
            // Display as text with gradient
            illustration.innerHTML = data.illustration;
            illustration.style.background = data.gradient || 'transparent';
        }
        
        const featuresList = document.getElementById('packageFeatures');
        featuresList.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }

    // Package tabs functionality
    const tabs = document.querySelectorAll('.package-tab');
    const serviceIcons = document.querySelectorAll('.service-icon-item');
    let currentSelectedPackage = 'basic'; // Default to basic package
    
    function switchPackage(packageType) {
        // Update current selected package
        currentSelectedPackage = packageType;
        
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.package-tab[data-package="${packageType}"]`);
        if (activeTab) activeTab.classList.add('active');
        
        // Update service icons
        serviceIcons.forEach(icon => icon.classList.remove('active'));
        const activeIcon = document.querySelector(`.service-icon-item[data-package="${packageType}"]`);
        if (activeIcon) activeIcon.classList.add('active');
        
        // Update content
        updatePackageContent(packageType);
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            switchPackage(packageType);
        });
    });
    
    // Service icons functionality
    serviceIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            switchPackage(packageType);
        });
    });
    
    // Initialize with basic package and sync service icon
    document.querySelector('.service-icon-item[data-package="basic"]').classList.add('active');
    updatePackageContent('basic');

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Book now button functionality
    const bookButtons = document.querySelectorAll('.cta-button');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'BOOK NOW' || (this.textContent === 'Book Now' && this.id !== 'bookingSubmitBtn')) {
                // Auto-select the current package in the service dropdown
                const serviceSelect = document.getElementById('selectedService');
                if (serviceSelect && currentSelectedPackage) {
                    const packageNames = {
                        'basic': 'Basic Package',
                        'style': 'Style Package',
                        'advance': 'Advance Package'
                    };
                    const packageName = packageNames[currentSelectedPackage];
                    if (packageName) {
                        serviceSelect.value = packageName;
                        serviceSelect.classList.remove('error'); // Remove any error styling
                    }
                }
                
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation function
    function validateForm() {
        const name = document.getElementById('customerName');
        const phone = document.getElementById('customerPhone');
        const email = document.getElementById('customerEmail');
        const service = document.getElementById('selectedService');
        const time = document.getElementById('selectedTime');
        
        // Check if all form elements exist
        if (!name || !phone || !email || !service || !time) {
            console.error('Some form elements not found');
            alert('Form elements not found. Please refresh the page.');
            return false;
        }
        
        let isValid = true;
        
        // Clear previous errors
        [name, phone, email, service, time].forEach(field => {
            if (field) field.classList.remove('error');
        });
        
        // Validate name
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }
        
        // Validate phone
        if (!phone.value.trim()) {
            phone.classList.add('error');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.classList.add('error');
            isValid = false;
        }
        
        // Validate service
        if (!service.value) {
            service.classList.add('error');
            isValid = false;
        }
        
        // Validate time
        if (!time.value) {
            time.classList.add('error');
            isValid = false;
        }
        
        // Validate date selection
        if (!selectedDate) {
            alert('Please select a date from the calendar.');
            isValid = false;
        }
        
        return isValid;
    }

    // Function to generate QR code
    function generateQRCode(bookingData) {
        const qrContainer = document.getElementById('qrcode');
        if (!qrContainer) {
            console.error('QR container not found');
            return;
        }
        
        // Clear previous QR code
        qrContainer.innerHTML = '';
        
        // Create booking ID
        const bookingId = 'PRS-' + Date.now().toString().slice(-6);
        
        // Create QR code image element
        const qrImage = document.createElement('img');
        qrImage.src = 'qrcode.png';
        qrImage.alt = 'Booking QR Code';
        qrImage.style.width = '150px';
        qrImage.style.height = '150px';
        qrImage.style.border = '2px solid #e91e63';
        qrImage.style.borderRadius = '12px';
        qrImage.style.padding = '8px';
        qrImage.style.background = 'white';
        qrImage.style.boxShadow = '0 5px 20px rgba(233, 30, 99, 0.2)';
        
        // Add success handler
        qrImage.onload = function() {
            console.log('QR code image loaded successfully');
        };
        
        // Add error handling for image load
        qrImage.onerror = function() {
            console.error('QR code image not found');
            qrContainer.innerHTML = `
                <div style="width: 150px; height: 150px; border: 2px solid #e91e63; border-radius: 12px; 
                           display: flex; align-items: center; justify-content: center; background: #f8f9fa; 
                           color: #e91e63; font-weight: bold; text-align: center; font-size: 14px;">
                    QR Code<br>
                    ${bookingId}<br>
                    <small style="font-size: 11px;">Image not found</small>
                </div>
            `;
        };
        
        qrContainer.appendChild(qrImage);
        
        // Store booking ID for reference
        window.currentBookingId = bookingId;
        console.log('Generated booking ID:', bookingId);
    }

    // Booking form submission
    const bookingSubmitBtn = document.getElementById('bookingSubmitBtn');
    const bookingModal = document.getElementById('bookingModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Check if elements exist
    if (!bookingSubmitBtn) {
        console.error('bookingSubmitBtn not found');
        return;
    }
    if (!bookingModal) {
        console.error('bookingModal not found');
        return;
    }
    
    bookingSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Book Now button clicked');
        
        if (validateForm()) {
            console.log('Form validation passed');
            
            // Get form values
            const name = document.getElementById('customerName')?.value || '';
            const phone = document.getElementById('customerPhone')?.value || '';
            const email = document.getElementById('customerEmail')?.value || '';
            const service = document.getElementById('selectedService')?.value || '';
            const time = document.getElementById('selectedTime')?.value || '';
            
            // Update modal with booking details
            const confirmName = document.getElementById('confirmName');
            const confirmPhone = document.getElementById('confirmPhone');
            const confirmEmail = document.getElementById('confirmEmail');
            const confirmService = document.getElementById('confirmService');
            const confirmDate = document.getElementById('confirmDate');
            const confirmTime = document.getElementById('confirmTime');
            
            if (confirmName) confirmName.textContent = name;
            if (confirmPhone) confirmPhone.textContent = phone;
            if (confirmEmail) confirmEmail.textContent = email;
            if (confirmService) confirmService.textContent = service;
            if (confirmDate) confirmDate.textContent = selectedDate || 'No date selected';
            if (confirmTime) confirmTime.textContent = time;
            
            // Generate QR code
            generateQRCode({
                name: name,
                phone: phone,
                email: email,
                service: service,
                date: selectedDate,
                time: time
            });
            
            // Show success modal
            bookingModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            const customerName = document.getElementById('customerName');
            const customerPhone = document.getElementById('customerPhone');
            const customerEmail = document.getElementById('customerEmail');
            const selectedService = document.getElementById('selectedService');
            const selectedTimeEl = document.getElementById('selectedTime');
            
            if (customerName) customerName.value = '';
            if (customerPhone) customerPhone.value = '';
            if (customerEmail) customerEmail.value = '';
            if (selectedService) selectedService.value = '';
            if (selectedTimeEl) selectedTimeEl.value = '';
            
            // Reset calendar selection
            calendarCells.forEach(c => c.classList.remove('selected'));
            selectedDate = null;
        } else {
            console.log('Form validation failed');
        }
    });
    
    // Close modal functionality
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            bookingModal.classList.remove('show');
            document.body.style.overflow = 'auto';
            // Clear QR code when closing modal
            const qrcode = document.getElementById('qrcode');
            if (qrcode) qrcode.innerHTML = '';
        });
    }
    
    // Close modal when clicking outside
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('show');
                document.body.style.overflow = 'auto';
                // Clear QR code when closing modal
                const qrcode = document.getElementById('qrcode');
                if (qrcode) qrcode.innerHTML = '';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('show')) {
            bookingModal.classList.remove('show');
            document.body.style.overflow = 'auto';
            // Clear QR code when closing modal
            const qrcode = document.getElementById('qrcode');
            if (qrcode) qrcode.innerHTML = '';
        }
    });
});