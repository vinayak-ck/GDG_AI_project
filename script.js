// Common functionality for all pages

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (if any page has it)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Tab functionality for pages with tabs (auth, resume)
    function setupTabs(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tabs = container.querySelectorAll('[data-tab]');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active classes from all tabs
                tabs.forEach(t => {
                    t.classList.remove('border-blue-600', 'text-blue-600');
                    t.classList.add('text-gray-500');
                });

                // Add active class to clicked tab
                this.classList.add('border-blue-600', 'text-blue-600');
                this.classList.remove('text-gray-500');

                // Hide all content
                const contents = container.querySelectorAll('[data-tab-content]');
                contents.forEach(content => {
                    content.classList.add('hidden');
                });

                // Show selected content
                const tabName = this.getAttribute('data-tab');
                const content = container.querySelector(`[data-tab-content="${tabName}"]`);
                if (content) {
                    content.classList.remove('hidden');
                }
            });
        });
    }

    // Initialize tab systems
    setupTabs('auth-tabs');
    setupTabs('resume-tabs');

    // Dropzone functionality for resume upload
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
        const fileInput = document.getElementById('file-upload');
        const fileName = document.getElementById('file-name');
        const fileSize = document.getElementById('file-size');
        const uploadProgress = document.getElementById('upload-progress');
        const progressFill = document.getElementById('progress-fill');
        const analyzeBtn = document.getElementById('analyze-btn');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            dropzone.classList.add('active');
        }

        function unhighlight() {
            dropzone.classList.remove('active');
        }

        dropzone.addEventListener('drop', handleDrop, false);
        fileInput.addEventListener('change', handleFiles, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles({ target: { files } });
        }

        function handleFiles(e) {
            const files = e.target.files;
            if (files.length) {
                const file = files[0];
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size exceeds 5MB limit');
                    return;
                }

                // Show file info
                fileName.textContent = file.name;
                fileSize.textContent = formatFileSize(file.size);

                // Hide dropzone, show progress
                dropzone.classList.add('hidden');
                uploadProgress.classList.remove('hidden');

                // Simulate upload progress
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 10;
                    if (progress > 100) progress = 100;
                    progressFill.style.width = `${progress}%`;

                    if (progress === 100) {
                        clearInterval(interval);
                        analyzeBtn.disabled = false;
                        analyzeBtn.classList.remove('opacity-50');
                    }
                }, 200);
            }
        }

        function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' bytes';
            else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
            else return (bytes / 1048576).toFixed(1) + ' MB';
        }

        // Analyze button click handler
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', function() {
                window.location.href = 'analysis.html';
            });
        }
    }
});

// Form validation for auth forms
function validateAuthForm(formType) {
    const email = document.getElementById(`${formType}-email`).value;
    const password = document.getElementById(`${formType}-password`).value;
    
    if (!email || !password) {
        alert('Please fill in all required fields');
        return false;
    }

    if (formType === 'register') {
        const name = document.getElementById('register-name').value;
        if (!name) {
            alert('Please enter your name');
            return false;
        }
    }

    return true;
}

// Feedback form submission
function submitFeedback() {
    const rating = document.getElementById('rating-value').value;
    const feedback = document.getElementById('feedback').value;
    
    if (!rating || rating === '0') {
        alert('Please provide a rating');
        return false;
    }

    if (!feedback) {
        alert('Please provide your feedback');
        return false;
    }

    // In a real app, you would send this to your backend
    alert('Thank you for your feedback!');
    window.location.href = 'dashboard.html';
    return false;
}