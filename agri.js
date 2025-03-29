// Main Application Controller
class AgriHubApp {
    constructor() {
      this.currentPage = 'home';
      this.chatHistory = [];
      this.weatherData = {};
      this.userProfile = {};
      this.cropHealthData = [];
      this.initialize();
    }
  
    // Initialize the application
    initialize() {
      this.setupDOMReferences();
      this.setupEventListeners();
      this.loadUserData();
      this.updateTime();
      this.simulateWeatherData();
      this.setupDefaultChat();
      this.setupQuickActions();
      this.setupAdvisoryTopics();
      this.setupDarkMode();
    }
  
    // DOM References
    setupDOMReferences() {
      this.dom = {
        // Main elements
        appContainer: document.querySelector('.app-container'),
        statusBarTime: document.getElementById('time'),
        headerTitle: document.getElementById('headerTitle'),
        
        // Navigation
        navItems: document.querySelectorAll('.nav-item'),
        pages: document.querySelectorAll('.page'),
        
        // Home page
        quickActions: {
          chat: document.getElementById('quickChat'),
          detect: document.getElementById('quickDetect'),
          community: document.getElementById('quickCommunity'),
          market: document.getElementById('quickMarket')
        },
        weatherWidget: document.querySelector('.weather-widget'),
        
        // Chat page
        chatBackBtn: document.getElementById('chatBack'),
        chatMessages: document.getElementById('chatMessages'),
        chatInput: document.querySelector('.chat-input'),
        sendMessageBtn: document.getElementById('sendMessage'),
        
        // Detection page
        uploadBtn: document.getElementById('uploadBtn'),
        fileInput: document.getElementById('fileInput'),
        previewContainer: document.getElementById('previewContainer'),
        previewImage: document.getElementById('previewImage'),
        analyzeBtn: document.getElementById('analyzeBtn'),
        resultContainer: document.getElementById('resultContainer'),
        
        // Profile page
        darkModeToggle: document.getElementById('darkModeToggle'),
        
        // Advisory page
        advisoryTabs: document.querySelectorAll('.advisory-tab'),
        topicCards: document.querySelectorAll('.topic-card')
      };
    }
  
    // Event Listeners
    setupEventListeners() {
      // Navigation
      this.dom.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigateToPage(item.getAttribute('data-page'));
        });
      });
  
      // Chat functionality
      this.dom.chatBackBtn.addEventListener('click', () => this.navigateToPage('home'));
      this.dom.sendMessageBtn.addEventListener('click', () => this.sendChatMessage());
      this.dom.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendChatMessage();
        }
      });
  
      // Detection functionality
      this.dom.uploadBtn.addEventListener('click', () => this.dom.fileInput.click());
      this.dom.fileInput.addEventListener('change', (e) => this.handleImageUpload(e));
      this.dom.analyzeBtn.addEventListener('click', () => this.analyzeImage());
  
      // Advisory tabs
      this.dom.advisoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          this.dom.advisoryTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          // In real app, would load content for this tab
          console.log(`Switched to ${tab.textContent} tab`);
        });
      });
  
      // Topic cards
      this.dom.topicCards.forEach(card => {
        card.addEventListener('click', () => {
          const topic = card.getAttribute('data-topic');
          this.showTopicDetail(topic);
        });
      });
  
      // Dark mode toggle
      this.dom.darkModeToggle.addEventListener('change', () => this.toggleDarkMode());
    }
  
    // Navigation System
    navigateToPage(pageId) {
      // Update active nav item
      this.dom.navItems.forEach(nav => nav.classList.remove('active'));
      document.querySelector(`.nav-item[data-page="${pageId}"]`).classList.add('active');
      
      // Show selected page
      this.dom.pages.forEach(page => page.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
      
      // Update header title
      const pageTitle = document.querySelector(`.nav-item[data-page="${pageId}"] span`).textContent;
      this.dom.headerTitle.textContent = pageTitle;
      
      // Store current page
      this.currentPage = pageId;
      
      // Page-specific initialization
      if (pageId === 'chat') {
        this.scrollChatToBottom();
      }
      
      // Scroll to top
      window.scrollTo(0, 0);
    }
  
    // Time and Date Management
    updateTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      
      this.dom.statusBarTime.textContent = `${hours}:${minutes} ${ampm}`;
      
      // Update every minute
      setTimeout(() => this.updateTime(), 60000 - (now.getSeconds() * 1000 + now.getMilliseconds()));
    }
  
    // Weather Data Simulation
    simulateWeatherData() {
      this.weatherData = {
        temp: 24 + Math.floor(Math.random() * 5) - 2, // 22-26
        humidity: 60 + Math.floor(Math.random() * 10) - 5, // 55-65
        wind: 10 + Math.floor(Math.random() * 6), // 10-15
        rain: Math.floor(Math.random() * 30), // 0-30
        condition: ['sun', 'cloud', 'cloud-sun', 'cloud-rain'][Math.floor(Math.random() * 4)]
      };
      
      this.updateWeatherDisplay();
      
      // Update every 30 minutes
      setInterval(() => {
        this.simulateWeatherData();
      }, 1800000);
    }
  
    updateWeatherDisplay() {
      const weather = this.weatherData;
      document.querySelector('.weather-temp').textContent = `${weather.temp}°C`;
      document.querySelector('.weather-icon').className = `fas fa-${weather.condition} weather-icon float`;
      
      const details = document.querySelectorAll('.weather-detail');
      details[0].querySelector('.weather-detail-value').textContent = `${weather.humidity}%`;
      details[1].querySelector('.weather-detail-value').textContent = `${weather.wind} km/h`;
      details[2].querySelector('.weather-detail-value').textContent = `${weather.rain}%`;
    }
  
    // User Data Management
    loadUserData() {
      // In a real app, this would load from backend/local storage
      this.userProfile = {
        name: "David Waweru",
        location: "Nairobi, Kenya",
        phone: "+254 712 345 678",
        email: "david@farm.co.ke",
        farmSize: "12 Acres",
        mainCrops: "Maize, Beans, Coffee",
        livestock: "Dairy Cattle, Poultry",
        farmingMethod: "Mixed Farming",
        darkMode: false
      };
      
      this.cropHealthData = [
        {
          name: "Maize Field A",
          status: "healthy",
          image: "https://images.unsplash.com/photo-1594282416549-65cc3075533d?ixlib=rb-4.0.3",
          lastChecked: "Today"
        },
        {
          name: "Tomatoes",
          status: "warning",
          image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3",
          lastChecked: "Yesterday",
          issue: "Possible blight"
        },
        {
          name: "Coffee Plants",
          status: "danger",
          image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3",
          lastChecked: "2 days ago",
          issue: "Pest infestation"
        }
      ];
      
      this.updateProfileDisplay();
      this.updateCropHealthDisplay();
    }
  
    updateProfileDisplay() {
      const profile = this.userProfile;
      document.querySelector('.profile-avatar').textContent = 
        profile.name.split(' ').map(n => n[0]).join('');
      document.querySelector('.profile-name').textContent = profile.name;
      document.querySelector('.profile-location span').textContent = profile.location;
      
      // Profile section
      document.querySelectorAll('.profile-item-value')[0].textContent = profile.name;
      document.querySelectorAll('.profile-item-value')[1].textContent = profile.location;
      document.querySelectorAll('.profile-item-value')[2].textContent = profile.phone;
      document.querySelectorAll('.profile-item-value')[3].textContent = profile.email;
      
      // Farm section
      document.querySelectorAll('.profile-item-value')[4].textContent = profile.farmSize;
      document.querySelectorAll('.profile-item-value')[5].textContent = profile.mainCrops;
      document.querySelectorAll('.profile-item-value')[6].textContent = profile.livestock;
      document.querySelectorAll('.profile-item-value')[7].textContent = profile.farmingMethod;
    }
  
    updateCropHealthDisplay() {
      const container = document.querySelector('.health-cards');
      container.innerHTML = '';
      
      this.cropHealthData.forEach(crop => {
        const statusClass = {
          healthy: 'healthy',
          warning: 'warning',
          danger: 'danger'
        }[crop.status];
        
        const card = document.createElement('div');
        card.className = 'health-card';
        card.innerHTML = `
          <div class="health-card-image">
            <img src="${crop.image}" alt="${crop.name}">
          </div>
          <div class="health-card-status">
            <div class="status-indicator ${statusClass}"></div>
            <span>${crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}</span>
          </div>
          <h4 class="health-card-title">${crop.name}</h4>
          <p class="health-card-desc">${crop.issue ? crop.issue : `Last checked: ${crop.lastChecked}`}</p>
        `;
        
        container.appendChild(card);
      });
    }
  
    // Chat System
    setupDefaultChat() {
      this.addChatMessage("Hello David! I'm your farming assistant. How can I help you today?", 'received');
    }
  
    sendChatMessage() {
      const message = this.dom.chatInput.value.trim();
      if (message) {
        this.addChatMessage(message, 'sent');
        this.dom.chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
          this.generateAIResponse(message);
        }, 1000 + Math.random() * 2000); // Random delay 1-3s
      }
    }
  
    addChatMessage(text, type) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${type}`;
      messageDiv.innerHTML = `
        <div class="message-bubble">
          ${text}
          <div class="message-time">${timeString}</div>
        </div>
      `;
      
      this.dom.chatMessages.appendChild(messageDiv);
      this.scrollChatToBottom();
      
      // Store in history
      this.chatHistory.push({
        text,
        type,
        time: now
      });
    }
  
    scrollChatToBottom() {
      this.dom.chatMessages.scrollTop = this.dom.chatMessages.scrollHeight;
    }
  
    generateAIResponse(userMessage) {
      // Simple response generation - in a real app, this would call an AI API
      const responses = {
        'hello': "Hello there! How can I assist with your farming today?",
        'hi': "Hi David! What farming questions do you have?",
        'pest': "For pest control, I recommend identifying the specific pest first. Could you describe or send a photo of the affected plants?",
        'disease': "Plant diseases can be tricky. Common signs include spots, wilting, or discoloration. A photo would help with accurate diagnosis.",
        'weather': "Based on your location, the weather forecast shows... (would connect to real API in production)",
        'default': "I understand your question about farming. For more specific advice, could you provide details like crop type, symptoms, and preferably an image?"
      };
      
      const lowerMsg = userMessage.toLowerCase();
      let response = responses.default;
      
      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        response = responses.hello;
      } else if (lowerMsg.includes('pest')) {
        response = responses.pest;
      } else if (lowerMsg.includes('disease')) {
        response = responses.disease;
      } else if (lowerMsg.includes('weather')) {
        response = responses.weather;
      }
      
      this.addChatMessage(response, 'received');
    }
  
    // Disease Detection System
    handleImageUpload(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          this.dom.previewImage.src = e.target.result;
          this.dom.previewContainer.style.display = 'block';
          this.dom.analyzeBtn.disabled = false;
        };
        
        reader.readAsDataURL(file);
      }
    }
  
    analyzeImage() {
      // Show loading state
      this.dom.analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
      this.dom.analyzeBtn.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        this.showDetectionResults();
        
        // Reset analyze button
        this.dom.analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Image';
        this.dom.analyzeBtn.disabled = false;
      }, 2000);
    }
  
    showDetectionResults() {
      this.dom.previewContainer.style.display = 'none';
      this.dom.resultContainer.style.display = 'block';
      
      // Scroll to results
      this.dom.resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
  
    // Advisory System
    showTopicDetail(topic) {
      const topicData = {
        'pest-control': {
          title: "Pest Control",
          content: "Effective pest management involves identification, monitoring, and control. Common methods include cultural practices, biological control, and as a last resort, chemical pesticides."
        },
        'fertilization': {
          title: "Fertilization",
          content: "Proper fertilization requires soil testing to determine nutrient needs. Organic options include compost and manure, while synthetic fertilizers provide precise nutrient ratios."
        },
        'irrigation': {
          title: "Irrigation",
          content: "Efficient water use depends on crop needs, soil type, and climate. Drip irrigation saves water, while sprinklers are good for large areas. Monitor soil moisture regularly."
        },
        'harvesting': {
          title: "Harvesting",
          content: "Harvest timing affects yield and quality. Most crops have visual indicators for readiness. Handle produce gently to prevent bruising and store properly immediately after harvest."
        },
        'rainy-season': {
          title: "Rainy Season Preparation",
          content: "Before rains: clear drainage, repair structures, apply pre-emergent herbicides. Choose disease-resistant varieties and have fungicides ready for humid conditions."
        },
        'drought': {
          title: "Drought Preparation",
          content: "Drought strategies: mulch to retain moisture, choose drought-resistant crops, reduce planting density, install efficient irrigation, and consider rainwater harvesting."
        }
      };
      
      // In a real app, would show a detailed view
      alert(`${topicData[topic].title}\n\n${topicData[topic].content}`);
    }
  
    // Quick Actions
    setupQuickActions() {
      this.dom.quickActions.chat.addEventListener('click', () => this.navigateToPage('chat'));
      this.dom.quickActions.detect.addEventListener('click', () => this.navigateToPage('detection'));
      this.dom.quickActions.community.addEventListener('click', () => {
        alert('Community feature coming soon!');
      });
      this.dom.quickActions.market.addEventListener('click', () => {
        this.addChatMessage("Here are today's market prices:\nMaize: $250/ton\nBeans: $400/ton\nCoffee: $5/kg", 'received');
        this.navigateToPage('chat');
      });
    }
  
    // Advisory Topics
    setupAdvisoryTopics() {
      // Could load from API in real app
      console.log('Advisory topics loaded');
    }
  
    // Dark Mode
    setupDarkMode() {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.dom.darkModeToggle.checked = prefersDark;
      this.userProfile.darkMode = prefersDark;
    }
  
    toggleDarkMode() {
      this.userProfile.darkMode = this.dom.darkModeToggle.checked;
      // In a real app, would update CSS variables
      alert(`Dark mode ${this.userProfile.darkMode ? 'enabled' : 'disabled'}`);
    }
  }
  
  // Initialize the application when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const app = new AgriHubApp();
    
    // Make app available globally for debugging
    window.AgriHub = app;
  });