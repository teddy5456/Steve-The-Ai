// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const quickActions = document.querySelectorAll('.quick-action');
const chatBackBtn = document.getElementById('chatBack');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultContainer = document.getElementById('resultContainer');
const chatInput = document.querySelector('.chat-input');
const sendMessageBtn = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const darkModeToggle = document.getElementById('darkModeToggle');
const advisoryTabs = document.querySelectorAll('.advisory-tab');
const advisoryContents = document.querySelectorAll('[data-tab-content]');
const topicCards = document.querySelectorAll('.topic-card');
const refreshWeatherBtn = document.getElementById('refreshWeather');
const viewTasksBtn = document.getElementById('viewTasksBtn');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const cancelPreviewBtn = document.getElementById('cancelPreviewBtn');
const newScanBtn = document.getElementById('newScanBtn');

// Current Date
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', options);

// Time Greeting
const updateGreeting = () => {
    const hour = currentDate.getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Morning';
    } else if (hour < 18) {
        greeting = 'Afternoon';
    } else {
        greeting = 'Evening';
    }
    
    document.getElementById('time-greeting').textContent = greeting;
};

updateGreeting();

// Page Navigation System
const navigateToPage = (pageId) => {
    // Update active nav item
    navItems.forEach(nav => nav.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${pageId}"]`).classList.add('active');
    
    // Show selected page
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Special handling for specific pages
    if (pageId === 'detection') {
        previewContainer.style.display = 'none';
        resultContainer.style.display = 'none';
    }
};

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Quick Actions
quickActions.forEach(action => {
    action.addEventListener('click', function() {
        const actionId = this.id;
        
        switch(actionId) {
            case 'quickChat':
                navigateToPage('chat');
                break;
            case 'quickDetect':
                navigateToPage('detection');
                break;
            case 'quickCommunity':
                showToast('Community feature coming soon!');
                break;
            case 'quickMarket':
                navigateToPage('home');
                setTimeout(() => {
                    document.querySelector('.market-prices').scrollIntoView({ behavior: 'smooth' });
                }, 300);
                break;
            case 'quickWeather':
                navigateToPage('home');
                setTimeout(() => {
                    document.querySelector('.weather-widget').scrollIntoView({ behavior: 'smooth' });
                }, 300);
                break;
            case 'quickFinance':
                showToast('Farm finance feature coming soon!');
                break;
        }
    });
});

// Chat Back Button
chatBackBtn.addEventListener('click', function() {
    navigateToPage('home');
});

// Image Upload and Analysis
uploadBtn?.addEventListener('click', function() {
    fileInput.click();
});

fileInput?.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            previewImage.src = event.target.result;
            previewContainer.style.display = 'flex';
            analyzeBtn.disabled = false;
        };
        
        reader.readAsDataURL(file);
    }
});

// Capture Button (for camera)
captureBtn?.addEventListener('click', function() {
    // Simulate capturing an image
    previewImage.src = 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3';
    previewContainer.style.display = 'flex';
    analyzeBtn.disabled = false;
    
    // Hide scanner and show preview
    document.querySelector('.scanner-container').style.display = 'none';
});

// Retake Button
retakeBtn?.addEventListener('click', function() {
    previewContainer.style.display = 'none';
    document.querySelector('.scanner-container').style.display = 'block';
});

// Cancel Preview Button
cancelPreviewBtn?.addEventListener('click', function() {
    previewContainer.style.display = 'none';
    document.querySelector('.scanner-container').style.display = 'block';
});

// New Scan Button
newScanBtn?.addEventListener('click', function() {
    resultContainer.style.display = 'none';
    document.querySelector('.scanner-container').style.display = 'block';
    previewContainer.style.display = 'none';
});

analyzeBtn?.addEventListener('click', function() {
    // Show loading state
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate analysis delay
    setTimeout(function() {
        previewContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Set the result image
        document.getElementById('resultImage').src = previewImage.src;
        
        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Reset analyze button
        analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Image';
        analyzeBtn.disabled = false;
    }, 2000);
});

// Chat Message System
const addMessage = (text, type, isImage = false) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (isImage) {
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <img src="${text}" style="width:100%; border-radius:10px; margin-bottom:5px;">
                <div class="message-time">${timeString}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-bubble">
                ${text}
                <div class="message-time">${timeString}</div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

sendMessageBtn.addEventListener('click', function() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'sent');
        chatInput.value = '';
        
        // Simulate AI response after delay
        setTimeout(function() {
            const responses = [
                "I understand your concern about that farming issue. Based on my knowledge, here are some recommendations...",
                "That's an interesting question! Many farmers face similar challenges. The best approach would be...",
                "Thanks for sharing those details. For your specific situation, I would suggest...",
                "Based on the information you've provided, here's what I recommend..."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'received');
        }, 1000);
    }
});

// Allow Enter key to send message (but Shift+Enter for new line)
chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageBtn.click();
    }
});

// Quick Replies
document.querySelectorAll('.quick-reply').forEach(reply => {
    reply.addEventListener('click', function() {
        const replyText = this.textContent;
        addMessage(replyText, 'sent');
        
        // Simulate AI response
        setTimeout(() => {
            addMessage("Here's the information you requested about that topic...", 'received');
        }, 1000);
    });
});

// Dark Mode Toggle
darkModeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked);
    
    showToast(`Dark mode ${this.checked ? 'enabled' : 'disabled'}`);
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    darkModeToggle.checked = true;
    document.body.classList.add('dark-mode');
}

// Advisory Tabs
advisoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Update active tab
        advisoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding content
        advisoryContents.forEach(content => {
            content.classList.remove('active');
            if (content.getAttribute('data-tab-content') === tabName) {
                content.classList.add('active');
            }
        });
    });
});

// Topic Cards
topicCards.forEach(card => {
    card.addEventListener('click', function() {
        const topic = this.getAttribute('data-topic');
        showToast(`Loading information about ${topic.replace('-', ' ')}`);
        
        // Simulate navigation to topic detail
        setTimeout(() => {
            const topicTitle = this.querySelector('h3').textContent;
            addMessage(`I need information about ${topicTitle}`, 'sent');
            addMessage(`Here's detailed information about ${topicTitle}...`, 'received');
            navigateToPage('chat');
        }, 500);
    });
});

// Weather Refresh
refreshWeatherBtn.addEventListener('click', function() {
    // Add spin animation
    this.style.transform = 'rotate(180deg)';
    
    // Simulate weather data refresh
    setTimeout(() => {
        const tempElement = document.querySelector('.weather-temp');
        const currentTemp = parseInt(tempElement.textContent);
        const newTemp = currentTemp + (Math.random() > 0.5 ? 1 : -1);
        
        if (newTemp >= 22 && newTemp <= 28) {
            tempElement.textContent = `${newTemp}°C`;
        }
        
        // Randomly change weather icon
        const icons = ['sun', 'cloud', 'cloud-sun', 'cloud-rain'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        document.querySelector('.weather-icon').className = `fas fa-${randomIcon} weather-icon float`;
        
        // Reset refresh button
        this.style.transform = 'rotate(0)';
        
        showToast('Weather data updated');
    }, 1000);
});

// View Tasks Button
viewTasksBtn.addEventListener('click', function() {
    showToast('Opening your task list');
    
    // Simulate navigation to tasks
    setTimeout(() => {
        document.querySelector('.advisory-cards').scrollIntoView({ behavior: 'smooth' });
    }, 300);
});

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Add show class
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Simulate weather data changes
function updateWeatherData() {
    const tempElement = document.querySelector('.weather-temp');
    if (!tempElement) return;
    
    const currentTemp = parseInt(tempElement.textContent);
    const newTemp = currentTemp + (Math.random() > 0.5 ? 1 : -1);
    
    if (newTemp >= 22 && newTemp <= 28) {
        tempElement.textContent = `${newTemp}°C`;
    }
    
    // Randomly change weather icon
    const icons = ['sun', 'cloud', 'cloud-sun', 'cloud-rain'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    document.querySelector('.weather-icon').className = `fas fa-${randomIcon} weather-icon float`;
}

setInterval(updateWeatherData, 30000);

// Add some sample messages when opening chat
document.querySelector('.nav-item[data-page="chat"]').addEventListener('click', function(e) {
    if (!this.classList.contains('active')) {
        // Clear existing messages except the first few
        const messages = document.querySelectorAll('.chat-messages .message');
        if (messages.length <= 6) return;
        
        for (let i = 6; i < messages.length; i++) {
            messages[i].remove();
        }
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = 1;
        }, index * 100);
    });
    
    // Set current year in footer if exists
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Add CSS for toast notifications
const toastStyle = document.createElement('style');
toastStyle.textContent = `
.toast-notification {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--surface);
    color: var(--text);
    padding: 12px 24px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.toast-notification.show {
    opacity: 1;
}
`;
document.head.appendChild(toastStyle);