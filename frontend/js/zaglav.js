const contactsBtn = document.getElementById('contactsBtn');
        const closeBtn = document.getElementById('closeBtn');
        const contactsPanel = document.getElementById('contactsPanel');
        const overlay = document.getElementById('overlay');
        
        contactsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactsPanel.classList.add('active');
            overlay.classList.add('active');
        });
        
        closeBtn.addEventListener('click', function() {
            contactsPanel.classList.remove('active');
            overlay.classList.remove('active');
        });
        
        overlay.addEventListener('click', function() {
            contactsPanel.classList.remove('active');
            overlay.classList.remove('active');
        });