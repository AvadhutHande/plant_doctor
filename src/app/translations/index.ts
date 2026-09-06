/**
 * Translation files for Smart Agriculture Advisory System
 * Supports: English, Hindi, Marathi
 */

export type Language = 'English' | 'Hindi' | 'Marathi';

interface TranslationStructure {
  // Common
  common: {
    save: string;
    cancel: string;
    back: string;
    next: string;
    submit: string;
    edit: string;
    delete: string;
    confirm: string;
    yes: string;
    no: string;
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    search: string;
    filter: string;
    download: string;
    upload: string;
    select: string;
    clear: string;
    apply: string;
    close: string;
    view: string;
    manage: string;
    with: string;
  };

  // Navigation
  nav: {
    dashboard: string;
    weather: string;
    aiTools: string;
    market: string;
    profile: string;
  };

  // Dashboard
  dashboard: {
    title: string;
    subtitle: string;
    activeFields: string;
    totalLand: string;
    activeCrops: string;
    seasonEarnings: string;
    quickActions: string;
    viewFieldDetails: string;
    manageFields: string;
    checkWeather: string;
    diseaseDetection: string;
    fertilizer: string;
    marketPrices: string;
    cropCalendar: string;
    expenses: string;
    govtSchemes: string;
    myFields: string;
    field: string;
    area: string;
    crop: string;
    stage: string;
    status: string;
    active: string;
    fallow: string;
    addField: string;
    currentField: string;
    todaysWeather: string;
    clearSky: string;
    cropHealth: string;
    goodCondition: string;
    alertFor: string;
    alertCotton: string;
    alertWheat: string;
    alertSoybean: string;
    alertGeneral: string;
    aiScan: string;
    testSoil: string;
    cropSuggest: string;
    aiRecommend: string;
    getAdvice: string;
    allFeatures: string;
    smartAdvisory: string;
    cropLifecycle: string;
    pricePredictions: string;
    incomeComparison: string;
    compareCropProfits: string;
    subsidiesBenefits: string;
    expenseTracker: string;
    trackCostsProfits: string;
    remindersSchedules: string;
    soilAnalysis: string;
  };

  // Weather
  weather: {
    title: string;
    subtitle: string;
    temperature: string;
    humidity: string;
    windSpeed: string;
    rainfall: string;
    forecast: string;
    today: string;
    tomorrow: string;
    advisory: string;
    weatherAlert: string;
    goodForSpraying: string;
    avoidFieldWork: string;
  };

  // AI Tools
  aiTools: {
    title: string;
    subtitle: string;
    diseaseDetection: string;
    diseaseSubtitle: string;
    soilAnalysis: string;
    soilSubtitle: string;
    cropSuggest: string;
    cropSubtitle: string;
    fertilizerReco: string;
    fertilizerSubtitle: string;
    smartAdvisory: string;
    smartAdvisoryDesc: string;
    carbonCredits: string;
    carbonCreditsDesc: string;
    howAiHelps: string;
    aiFeature1: string;
    aiFeature2: string;
    aiFeature3: string;
    aiFeature4: string;
    aiFeature5: string;
  };

  // Market
  market: {
    title: string;
    subtitle: string;
    todayPrices: string;
    marketTrends: string;
    incomeComparison: string;
    sellingTips: string;
    viewAllPrices: string;
    compareIncome: string;
    pricePerQuintal: string;
    trend: string;
    up: string;
    down: string;
    stable: string;
    // Market Prices - Enhanced
    marketPrices: string;
    realTimePredictions: string;
    myCrop: string;
    otherCrops: string;
    todaysPrice: string;
    perQuintal: string;
    fromLastMonth: string;
    lastUpdated: string;
    hoursAgo: string;
    sixMonthTrend: string;
    aiPredictions: string;
    nextWeek: string;
    nextMonth: string;
    harvestSeason: string;
    nearbyMandis: string;
    governmentMSP: string;
    minimumSupportPrice: string;
    mediumStaple: string;
    mspAdvice: string;
    sellingStrategy: string;
    strategyTip1: string;
    strategyTip2: string;
    strategyTip3: string;
    compareOtherCrops: string;
    compare: string;
    demand: string;
    high: string;
    medium: string;
    low: string;
    highDemandCrops: string;
    considerNextSeason: string;
    // Search & Filter
    searchPrices: string;
    findTodaysPrice: string;
    selectCrop: string;
    selectState: string;
    selectMarket: string;
    searchResults: string;
    noResultsFound: string;
    tryDifferentFilters: string;
    // Comparison
    compareCrops: string;
    yourCrop: string;
    selectedCrop: string;
    currentPrice: string;
    priceDifference: string;
    higher: string;
    lower: string;
    demandLevel: string;
    profitability: string;
    roi: string;
    comparisonInsights: string;
    closeComparison: string;
    cropName: string;
    state: string;
    market: string;
    apply: string;
    reset: string;
  };

  // Profile
  profile: {
    title: string;
    subtitle: string;
    personalInfo: string;
    farmDetails: string;
    preferences: string;
    settings: string;
    editProfile: string;
    logout: string;
    name: string;
    farmerId: string;
    phone: string;
    email: string;
    village: string;
    pinCode: string;
    totalLand: string;
    numFields: string;
    irrigationType: string;
    waterAvailability: string;
    experience: string;
    budget: string;
    riskPreference: string;
    preferredCrops: string;
    farmingType: string;
    language: string;
    notifications: string;
    years: string;
    guntha: string;
    fields: string;
    activeCrops: string;
    thisSeason: string;
    toolsAndServices: string;
    governmentSchemes: string;
    viewSubsidies: string;
    expenseTracker: string;
    trackCosts: string;
    appSettings: string;
  };

  // Carbon Credits
  carbonCredits: {
    title: string;
    subtitle: string;
    overview: string;
    calculator: string;
    apply: string;
    whatAre: string;
    whatAreDesc: string;
    keyBenefits: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    benefit5: string;
    benefit6: string;
    howItWorks: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
    step7Title: string;
    step7Desc: string;
    eligiblePractices: string;
    organic: string;
    organicDesc: string;
    conservation: string;
    conservationDesc: string;
    agroforestry: string;
    agroforestryDesc: string;
    integrated: string;
    integratedDesc: string;
    successStory: string;
    yourEarnings: string;
    yourLand: string;
    annualCredits: string;
    oneYear: string;
    threeYears: string;
    fiveYears: string;
    eligibility: string;
    requiredDocs: string;
    howToApply: string;
    startApplication: string;
    getHelp: string;
    phoneSupport: string;
    emailSupport: string;
    regionalOffice: string;
    faqs: string;
  };

  // Field Management
  fieldManagement: {
    title: string;
    subtitle: string;
    assignCrop: string;
    selectCrop: string;
    cropStage: string;
    expectedHarvest: string;
    clearCrop: string;
    addNewField: string;
    fieldName: string;
    fieldSize: string;
    currentCrop: string;
    lastUpdated: string;
    save: string;
  };

  // Disease Detection
  disease: {
    title: string;
    subtitle: string;
    uploadImage: string;
    takePhoto: string;
    scanLeaf: string;
    analyzing: string;
    detected: string;
    severity: string;
    treatment: string;
    prevention: string;
  };

  // Soil Analysis
  soil: {
    title: string;
    subtitle: string;
    testSoil: string;
    npkLevels: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    phLevel: string;
    soilType: string;
    recommendations: string;
  };

  // Fertilizer
  fertilizer: {
    title: string;
    subtitle: string;
    recommendedPlan: string;
    quantity: string;
    timing: string;
    cost: string;
    totalCost: string;
    basalDose: string;
    topDressing: string;
    flowering: string;
  };

  // Settings
  settings: {
    title: string;
    notifications: string;
    pushNotifications: string;
    weatherAlerts: string;
    cropReminders: string;
    marketUpdates: string;
    languageDisplay: string;
    darkMode: string;
    dataPrivacy: string;
    exportData: string;
    importData: string;
    clearData: string;
    helpSupport: string;
    helpCenter: string;
    aboutApp: string;
    version: string;
  };

  // Messages
  messages: {
    saveSuccess: string;
    saveError: string;
    deleteSuccess: string;
    deleteError: string;
    uploadSuccess: string;
    uploadError: string;
    noDataFound: string;
    loadingData: string;
    confirmDelete: string;
    cannotUndo: string;
  };
}

export const translations: Record<Language, TranslationStructure> = {
  English: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      search: 'Search',
      filter: 'Filter',
      download: 'Download',
      upload: 'Upload',
      select: 'Select',
      clear: 'Clear',
      apply: 'Apply',
      close: 'Close',
      view: 'View',
      manage: 'Manage',
      with: 'with',
    },
    nav: {
      dashboard: 'Dashboard',
      weather: 'Weather',
      aiTools: 'AI Tools',
      market: 'Market',
      profile: 'Profile',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welcome back',
      activeFields: 'Active Fields',
      totalLand: 'Total Land',
      activeCrops: 'Active Crops',
      seasonEarnings: 'Season Earnings',
      quickActions: 'Quick Actions',
      viewFieldDetails: 'View Field Details',
      manageFields: 'Manage Fields',
      checkWeather: 'Check Weather',
      diseaseDetection: 'Disease Detection',
      fertilizer: 'Fertilizer Guide',
      marketPrices: 'Market Prices',
      cropCalendar: 'Crop Calendar',
      expenses: 'Track Expenses',
      govtSchemes: 'Govt. Schemes',
      myFields: 'My Fields',
      field: 'Field',
      area: 'Area',
      crop: 'Crop',
      stage: 'Stage',
      status: 'Status',
      active: 'Active',
      fallow: 'Fallow',
      addField: 'Add New Field',
      currentField: 'Current Field',
      todaysWeather: "Today's Weather",
      clearSky: 'Clear Sky',
      cropHealth: 'Crop Health',
      goodCondition: 'Good Condition',
      alertFor: 'Alert for',
      alertCotton: 'Check for Pink Bollworm infestation due to high humidity.',
      alertWheat: 'Conditions favorable for Rust. Monitor closely.',
      alertSoybean: 'Heavy rainfall expected. Ensure drainage.',
      alertGeneral: 'Weather conditions require attention.',
      aiScan: 'AI Scan',
      testSoil: 'Test Soil',
      cropSuggest: 'Crop Suggest',
      aiRecommend: 'AI Recommend',
      getAdvice: 'Get Advice',
      allFeatures: 'All Features',
      smartAdvisory: 'Smart Advisory',
      cropLifecycle: 'Crop lifecycle guidance',
      pricePredictions: 'Price predictions & trends',
      incomeComparison: 'Income Comparison',
      compareCropProfits: 'Compare crop profits',
      subsidiesBenefits: 'View subsidies & benefits',
      expenseTracker: 'Expense Tracker',
      trackCostsProfits: 'Track costs & profits',
      remindersSchedules: 'Reminders & schedules',
      soilAnalysis: 'Soil Analysis',
    },
    weather: {
      title: 'Weather',
      subtitle: 'Today\'s weather forecast',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      rainfall: 'Rainfall',
      forecast: '7-Day Forecast',
      today: 'Today',
      tomorrow: 'Tomorrow',
      advisory: 'Weather Advisory',
      weatherAlert: 'Weather Alert',
      goodForSpraying: 'Good conditions for spraying',
      avoidFieldWork: 'Avoid field work today',
    },
    aiTools: {
      title: 'AI Tools',
      subtitle: 'Smart farming solutions',
      diseaseDetection: 'Disease Detection',
      diseaseSubtitle: 'AI Scan Leaves',
      soilAnalysis: 'Soil Analysis',
      soilSubtitle: 'Test Soil Health',
      cropSuggest: 'Crop Suggest',
      cropSubtitle: 'Best Crops',
      fertilizerReco: 'Fertilizer',
      fertilizerSubtitle: 'Get Advice',
      smartAdvisory: 'Smart Farming Advisory',
      smartAdvisoryDesc: 'Lifecycle guidance & tips',
      carbonCredits: 'Carbon Credits',
      carbonCreditsDesc: 'Earn money while going green',
      howAiHelps: 'How AI Helps You',
      aiFeature1: 'Instant disease identification with 90%+ accuracy',
      aiFeature2: 'Personalized crop recommendations based on your soil',
      aiFeature3: 'Optimized fertilizer usage to reduce costs',
      aiFeature4: 'Weather-aware farming schedule',
      aiFeature5: 'Earn additional income through carbon credits',
    },
    market: {
      title: 'Market',
      subtitle: 'Latest market prices',
      todayPrices: 'Today\'s Prices',
      marketTrends: 'Market Trends',
      incomeComparison: 'Income Comparison',
      sellingTips: 'Selling Tips',
      viewAllPrices: 'View All Prices',
      compareIncome: 'Compare Income',
      pricePerQuintal: 'Price per Quintal',
      trend: 'Trend',
      up: 'Up',
      down: 'Down',
      stable: 'Stable',
      // Market Prices - Enhanced
      marketPrices: 'Market Prices',
      realTimePredictions: 'Real-time & Predictions',
      myCrop: 'My Crop',
      otherCrops: 'Other Crops',
      todaysPrice: 'Today\'s Price',
      perQuintal: 'per quintal',
      fromLastMonth: 'from last month',
      lastUpdated: 'Last updated:',
      hoursAgo: 'hours ago',
      sixMonthTrend: '6-Month Price Trend',
      aiPredictions: 'AI Price Predictions',
      nextWeek: 'Next Week',
      nextMonth: 'Next Month',
      harvestSeason: 'Harvest Season',
      nearbyMandis: 'Nearby Mandi Prices',
      governmentMSP: 'Government MSP',
      minimumSupportPrice: 'Minimum Support Price',
      mediumStaple: 'Medium Staple',
      mspAdvice: 'Current market price is above MSP. Good time to sell!',
      sellingStrategy: 'Selling Strategy',
      strategyTip1: 'Prices are trending upward. Consider waiting 1-2 weeks for better rates.',
      strategyTip2: 'Latur Market offering highest price in your region.',
      strategyTip3: 'Sell 40-50% of produce now, hold rest for expected price rise.',
      compareOtherCrops: 'Compare Other Crops',
      compare: 'Compare',
      demand: 'Demand',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      highDemandCrops: 'High Demand Crops',
      considerNextSeason: 'Consider these crops for your next season:',
      // Search & Filter
      searchPrices: 'Search Prices',
      findTodaysPrice: 'Find Today\'s Price',
      selectCrop: 'Select Crop',
      selectState: 'Select State',
      selectMarket: 'Select Market/Mandi',
      searchResults: 'Search Results',
      noResultsFound: 'No results found',
      tryDifferentFilters: 'Try adjusting your filters',
      // Comparison
      compareCrops: 'Compare Crops',
      yourCrop: 'Your Crop',
      selectedCrop: 'Selected Crop',
      currentPrice: 'Current Price',
      priceDifference: 'Price Difference',
      higher: 'higher',
      lower: 'lower',
      demandLevel: 'Demand Level',
      profitability: 'Profitability',
      roi: 'ROI',
      comparisonInsights: 'Comparison Insights',
      closeComparison: 'Close Comparison',
      cropName: 'Crop Name',
      state: 'State',
      market: 'Market',
      apply: 'Apply Filters',
      reset: 'Reset',
    },
    profile: {
      title: 'Profile',
      subtitle: 'Your account details',
      personalInfo: 'Personal Information',
      farmDetails: 'Farm Details',
      preferences: 'Preferences',
      settings: 'Settings',
      editProfile: 'Edit Profile',
      logout: 'Logout',
      name: 'Name',
      farmerId: 'Farmer ID',
      phone: 'Phone',
      email: 'Email',
      village: 'Village',
      pinCode: 'PIN Code',
      totalLand: 'Total Land',
      numFields: 'Number of Fields',
      irrigationType: 'Irrigation Type',
      waterAvailability: 'Water Availability',
      experience: 'Farming Experience',
      budget: 'Seasonal Budget',
      riskPreference: 'Risk Preference',
      preferredCrops: 'Preferred Crops',
      farmingType: 'Farming Type',
      language: 'Language',
      notifications: 'Notifications',
      years: 'years',
      guntha: 'Guntha',
      fields: 'fields',
      activeCrops: 'Active Crops',
      thisSeason: 'This Season',
      toolsAndServices: 'Tools & Services',
      governmentSchemes: 'Government Schemes',
      viewSubsidies: 'View subsidies & benefits',
      expenseTracker: 'Expense Tracker',
      trackCosts: 'Track costs & income',
      appSettings: 'App Settings',
    },
    carbonCredits: {
      title: 'Carbon Credits',
      subtitle: 'Earn money while protecting the environment',
      overview: 'Overview',
      calculator: 'Calculator',
      apply: 'Apply',
      whatAre: 'What are Carbon Credits?',
      whatAreDesc: 'Carbon credits are certificates representing the reduction or removal of one ton of carbon dioxide (CO2) from the atmosphere. Farmers can earn these credits by adopting sustainable farming practices that capture and store carbon in the soil.',
      keyBenefits: 'Key Benefits:',
      benefit1: 'Additional income stream from your existing farmland',
      benefit2: 'Improve soil health and fertility naturally',
      benefit3: 'Reduce farming costs through sustainable practices',
      benefit4: 'Contribute to fighting climate change',
      benefit5: 'Access to premium markets for sustainable produce',
      benefit6: 'Tax benefits and government incentives',
      howItWorks: 'How It Works - Complete Process',
      step1Title: 'Initial Inquiry',
      step1Desc: 'Submit your interest through our platform or contact carbon credit agency',
      step2Title: 'Site Visit & Assessment',
      step2Desc: 'Expert team visits your farm to assess eligibility and potential',
      step3Title: 'Soil Testing',
      step3Desc: 'Comprehensive soil analysis to measure current carbon levels',
      step4Title: 'Documentation',
      step4Desc: 'Prepare and submit required documents including land records',
      step5Title: 'Verification',
      step5Desc: 'Third-party verification of your farming practices and carbon sequestration',
      step6Title: 'Certification',
      step6Desc: 'Receive official carbon credit certification',
      step7Title: 'Start Earning',
      step7Desc: 'Credits are issued annually based on verified carbon sequestration',
      eligiblePractices: 'Eligible Farming Practices',
      organic: 'Organic Farming',
      organicDesc: 'No synthetic chemicals, focus on natural fertilizers and pest control',
      conservation: 'Conservation Tillage',
      conservationDesc: 'Minimum soil disturbance to preserve soil structure and carbon',
      agroforestry: 'Agroforestry',
      agroforestryDesc: 'Integrating trees with crops for maximum carbon capture',
      integrated: 'Integrated Farming',
      integratedDesc: 'Combination of crops, livestock, and sustainable practices',
      successStory: 'Success Story',
      yourEarnings: 'Your Estimated Earnings',
      yourLand: 'Your Land',
      annualCredits: 'Annual Credits',
      oneYear: '1 Year Earnings',
      threeYears: '3 Years Earnings',
      fiveYears: '5 Years Earnings',
      eligibility: 'Eligibility Criteria',
      requiredDocs: 'Required Documents',
      howToApply: 'How to Apply',
      startApplication: 'Start Your Application',
      getHelp: 'Get Help & Support',
      phoneSupport: 'Phone Support',
      emailSupport: 'Email Support',
      regionalOffice: 'Regional Office',
      faqs: 'Frequently Asked Questions',
    },
    fieldManagement: {
      title: 'Field Management',
      subtitle: 'Manage your fields and crops',
      assignCrop: 'Assign Crop',
      selectCrop: 'Select Crop',
      cropStage: 'Crop Stage',
      expectedHarvest: 'Expected Harvest',
      clearCrop: 'Clear Crop',
      addNewField: 'Add New Field',
      fieldName: 'Field Name',
      fieldSize: 'Field Size',
      currentCrop: 'Current Crop',
      lastUpdated: 'Last Updated',
      save: 'Save Changes',
    },
    disease: {
      title: 'Disease Detection',
      subtitle: 'AI-powered plant disease identification',
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      scanLeaf: 'Scan Leaf',
      analyzing: 'Analyzing image...',
      detected: 'Disease Detected',
      severity: 'Severity',
      treatment: 'Treatment',
      prevention: 'Prevention',
    },
    soil: {
      title: 'Soil Analysis',
      subtitle: 'Test your soil health',
      testSoil: 'Test Soil',
      npkLevels: 'NPK Levels',
      nitrogen: 'Nitrogen',
      phosphorus: 'Phosphorus',
      potassium: 'Potassium',
      phLevel: 'pH Level',
      soilType: 'Soil Type',
      recommendations: 'Recommendations',
    },
    fertilizer: {
      title: 'Fertilizer Recommendation',
      subtitle: 'Get personalized fertilizer advice',
      recommendedPlan: 'Recommended Plan',
      quantity: 'Quantity',
      timing: 'Timing',
      cost: 'Cost',
      totalCost: 'Total Cost',
      basalDose: 'Basal Dose',
      topDressing: 'Top Dressing',
      flowering: 'During Flowering',
    },
    settings: {
      title: 'Settings',
      notifications: 'Notifications',
      pushNotifications: 'Push Notifications',
      weatherAlerts: 'Weather Alerts',
      cropReminders: 'Crop Reminders',
      marketUpdates: 'Market Updates',
      languageDisplay: 'Language & Display',
      darkMode: 'Dark Mode',
      dataPrivacy: 'Data & Privacy',
      exportData: 'Export Data',
      importData: 'Import Data',
      clearData: 'Clear All Data',
      helpSupport: 'Help & Support',
      helpCenter: 'Help Center',
      aboutApp: 'About App',
      version: 'Version',
    },
    messages: {
      saveSuccess: 'Changes saved successfully!',
      saveError: 'Failed to save changes',
      deleteSuccess: 'Deleted successfully!',
      deleteError: 'Failed to delete',
      uploadSuccess: 'Uploaded successfully!',
      uploadError: 'Failed to upload',
      noDataFound: 'No data found',
      loadingData: 'Loading data...',
      confirmDelete: 'Are you sure you want to delete?',
      cannotUndo: 'This action cannot be undone',
    },
  },

  Hindi: {
    common: {
      save: 'सहेजें',
      cancel: 'रद्द करें',
      back: 'वापस',
      next: 'आगे',
      submit: 'जमा करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      confirm: 'पुष्टि करें',
      yes: 'हाँ',
      no: 'नहीं',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      warning: 'चेतावनी',
      info: 'जानकारी',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      download: 'डाउनलोड',
      upload: 'अपलोड',
      select: 'चुनें',
      clear: 'साफ़ करें',
      apply: 'लागू करें',
      close: 'बंद करें',
      view: 'देखें',
      manage: 'प्रबंधित करें',
      with: 'के साथ',
    },
    nav: {
      dashboard: 'डैशबोर्ड',
      weather: 'मौसम',
      aiTools: 'एआई उपकरण',
      market: 'बाज़ार',
      profile: 'प्रोफ़ाइल',
    },
    dashboard: {
      title: 'डैशबोर्ड',
      subtitle: 'स्वागत है',
      activeFields: 'सक्रिय खेत',
      totalLand: 'कुल भूमि',
      activeCrops: 'सक्रिय फसलें',
      seasonEarnings: 'सीज़न की कमाई',
      quickActions: 'त्वरित कार्य',
      viewFieldDetails: 'खेत विवरण देखें',
      manageFields: 'खेत प्रबंधित करें',
      checkWeather: 'मौसम जांचें',
      diseaseDetection: 'रोग पहचान',
      fertilizer: 'उर्वरक गाइड',
      marketPrices: 'बाज़ार मूल्य',
      cropCalendar: 'फसल कैलेंडर',
      expenses: 'खर्च ट्रैक करें',
      govtSchemes: 'सरकारी योजनाएं',
      myFields: 'मेरे खेत',
      field: 'खेत',
      area: 'क्षेत्रफल',
      crop: 'फसल',
      stage: 'चरण',
      status: 'स्थिति',
      active: 'सक्रिय',
      fallow: 'परती',
      addField: 'नया खेत जोड़ें',
      currentField: 'वर्तमान खेत',
      todaysWeather: 'आज का मौसम',
      clearSky: 'साफ आसमान',
      cropHealth: 'फसल स्वास्थ्य',
      goodCondition: 'अच्छी स्थिति',
      alertFor: 'अलर्ट',
      alertCotton: 'उच्च आर्द्रता के कारण गुलाबी बॉलवर्म संक्रमण की जांच करें।',
      alertWheat: 'रस्ट के लिए अनुकूल परिस्थितियां। बारीकी से निगरानी करें।',
      alertSoybean: 'भारी वर्षा की संभावना। जल निकासी सुनिश्चित करें।',
      alertGeneral: 'मौसम की स्थिति ध्यान देने योग्य है।',
      aiScan: 'एआई स्कैन',
      testSoil: 'मिट्टी परीक्षण',
      cropSuggest: 'फसल सुझाव',
      aiRecommend: 'एआई सिफारिश',
      getAdvice: 'सलाह प्राप्त करें',
      allFeatures: 'सभी सुविधाएं',
      smartAdvisory: 'स्मार्ट सलाह',
      cropLifecycle: 'फसल जीवनचक्र मार्गदर्शन',
      pricePredictions: 'मूल्य पूर्वानुमान और रुझान',
      incomeComparison: 'आय तुलना',
      compareCropProfits: 'फसल लाभ की तुलना करें',
      subsidiesBenefits: 'सब्सिडी और लाभ देखें',
      expenseTracker: 'खर्च ट्रैकर',
      trackCostsProfits: 'खर्च और लाभ ट्रैक करें',
      remindersSchedules: 'अनुस्मारक और कार्यक्रम',
      soilAnalysis: 'मिट्टी विश्लेषण',
    },
    weather: {
      title: 'मौसम',
      subtitle: 'आज का मौसम पूर्वानुान',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      windSpeed: 'हवा की गति',
      rainfall: 'वर्षा',
      forecast: '७ दिन का पूर्वानुमान',
      today: 'आज',
      tomorrow: 'कल',
      advisory: 'मौसम सलाह',
      weatherAlert: 'मौसम चेतावनी',
      goodForSpraying: 'छिड़काव के लिए अच्छी स्थिति',
      avoidFieldWork: 'आज खेत का काम टालें',
    },
    aiTools: {
      title: 'एआई उपकरण',
      subtitle: 'स्मार्ट खेती समाधान',
      diseaseDetection: 'रोग पहचान',
      diseaseSubtitle: 'एआई पत्ती स्कैन',
      soilAnalysis: 'मिट्टी विश्लेषण',
      soilSubtitle: 'मिट्टी स्वास्थ्य जांच',
      cropSuggest: 'फसल सुझाव',
      cropSubtitle: 'सर्वोत्तम फसलें',
      fertilizerReco: 'उर्वरक',
      fertilizerSubtitle: 'सलाह प्राप्त करें',
      smartAdvisory: 'स्मार्ट खेती सलाह',
      smartAdvisoryDesc: 'जीवनचक्र मार्गदर्शन और सुझाव',
      carbonCredits: 'कार्बन क्रेडिट',
      carbonCreditsDesc: 'हरित होते हुए पैसे कमाएं',
      howAiHelps: 'एआई कैसे मदद करता है',
      aiFeature1: '90%+ सटीकता के साथ तत्काल रोग पहचान',
      aiFeature2: 'आपकी मिट्टी के आधार पर व्यक्तिगत फसल सिफारिशें',
      aiFeature3: 'लागत कम करने के लिए अनुकूलि��� उर्वरक उपयोग',
      aiFeature4: 'मौसम-जागरूक खेती अनुसूची',
      aiFeature5: 'कार्बन क्रेडिट के माध्यम से अतिरिक्त आय',
    },
    market: {
      title: 'बाज़ार',
      subtitle: 'नवीनतम बाज़ार मूल्य',
      todayPrices: 'आज की कीमतें',
      marketTrends: 'बाज़ार रुझान',
      incomeComparison: 'आय तुलना',
      sellingTips: 'बिक्री सुझाव',
      viewAllPrices: 'सभी मूल्य देखें',
      compareIncome: 'आय की तुलना करें',
      pricePerQuintal: 'प्रति क्विंटल मूल्य',
      trend: 'रुझान',
      up: 'ऊपर',
      down: 'नीचे',
      stable: 'स्थिर',
      // Market Prices - Enhanced
      marketPrices: 'बाज़ार मूल्य',
      realTimePredictions: 'वास्तविक समय और पूर्वानुमान',
      myCrop: 'मेरी फसल',
      otherCrops: 'अन्य फसलें',
      todaysPrice: 'आज का मूल्य',
      perQuintal: 'प्रति क्विंटल',
      fromLastMonth: 'पिछले महीने से',
      lastUpdated: 'अंतिम अपडेट:',
      hoursAgo: 'घंटे पहले',
      sixMonthTrend: '६ महीने का मूल्य रुझान',
      aiPredictions: 'एआई मूल्य पूर्वानुमान',
      nextWeek: 'अगले सप्ताह',
      nextMonth: 'अगले महीने',
      harvestSeason: 'कटाई सीजन',
      nearbyMandis: 'नजदीकी मंडी मूल्य',
      governmentMSP: 'सरकारी एमएसपी',
      minimumSupportPrice: 'न्यूनतम समर्थन मूल्य',
      mediumStaple: 'मध्यम स्टेपल',
      mspAdvice: 'वर्तमान बाजार मूल्य एमएसपी से ऊपर है। बेचने का अच्छा समय!',
      sellingStrategy: 'बिक्री रणनीति',
      strategyTip1: 'कीमतें ऊपर की ओर बढ़ रही हैं। बेहतर दरों के लिए १-२ सप्ताह प्रतीक्षा करें।',
      strategyTip2: 'लातूर मार्केट आपके क्षेत्र में उच्चतम मूल्य की पेशकश कर रहा है।',
      strategyTip3: 'अब ४०-५०% उपज बेचें, शेष को अपेक्षित मूल्य वृद्धि के लिए रखें।',
      compareOtherCrops: 'अन्य फसलों की तुलना करें',
      compare: 'तुलना करें',
      demand: 'मांग',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      highDemandCrops: 'उच्च मांग वाली फसलें',
      considerNextSeason: 'अपने अगले सीज़न के लिए इन फसलों पर विचार करें:',
      // Search & Filter
      searchPrices: 'मूल्य खोजें',
      findTodaysPrice: 'आज का मूल्य खोजें',
      selectCrop: 'फसल चुनें',
      selectState: 'राज्य चुनें',
      selectMarket: 'मंडी/बाजार चुनें',
      searchResults: 'खोज परिणाम',
      noResultsFound: 'कोई परिणाम नहीं मिला',
      tryDifferentFilters: 'अपने फ़िल्टर समायोजित करने का प्रयास करें',
      // Comparison
      compareCrops: 'फसलों की तुलना करें',
      yourCrop: 'आपकी फसल',
      selectedCrop: 'चयनित फसल',
      currentPrice: 'वर्तमान मूल्य',
      priceDifference: 'मूल्य अंतर',
      higher: 'अधिक',
      lower: 'कम',
      demandLevel: 'मांग स्तर',
      profitability: 'लाभप्रदता',
      roi: 'आरओआई',
      comparisonInsights: 'तुलना अंतर्दृष्टि',
      closeComparison: 'तुलना बंद करें',
      cropName: 'फसल का नाम',
      state: 'राज्य',
      market: 'बाज़ार',
      apply: 'फ़िल्टर लागू करें',
      reset: 'रीसेट करें',
    },
    profile: {
      title: 'प्रोफ़ाइल',
      subtitle: 'आपके खाते का विवरण',
      personalInfo: 'व्यक्तिगत जानकारी',
      farmDetails: 'खेत विवरण',
      preferences: 'प्राथमिकताएं',
      settings: 'सेटिंग्स',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      logout: 'लॉगआउट',
      name: 'नाम',
      farmerId: 'किसान आईडी',
      phone: 'फोन',
      email: 'ईमेल',
      village: 'गाँव',
      pinCode: 'पिन कोड',
      totalLand: 'कुल भूमि',
      numFields: 'खेतों की संख्या',
      irrigationType: 'सिंचाई प्रकार',
      waterAvailability: 'पानी की उपलब्धता',
      experience: 'खेती का अनुभव',
      budget: 'मौसमी बजट',
      riskPreference: 'जोखिम प्राथमिकता',
      preferredCrops: 'पसंदीदा फसलें',
      farmingType: 'खेती का प्रकार',
      language: 'भाषा',
      notifications: 'सूचनाएं',
      years: 'वर्ष',
      guntha: 'गुंठा',
      fields: 'खेत',
      activeCrops: 'सक्रिय फसलें',
      thisSeason: 'इस सीज़न',
      toolsAndServices: 'उपकरण और सेवाएं',
      governmentSchemes: 'सरकारी योजनाएं',
      viewSubsidies: 'सब्सिडी और लाभ देखें',
      expenseTracker: 'खर्च ट्रैकर',
      trackCosts: 'खर्च और आय ट्रैक करें',
      appSettings: 'ऐप सेटिंग्स',
    },
    carbonCredits: {
      title: 'कार्बन क्रेडिट',
      subtitle: 'पर्यावरण की रक्षा करते हुए पैसे कमाएं',
      overview: 'अवलोकन',
      calculator: 'कैलकुलेटर',
      apply: 'आवेदन करें',
      whatAre: 'कार्बन क्रेडिट क्या हैं?',
      whatAreDesc: 'कार्बन क्रेडिट प्रमाण पत्र हैं जो वायुमंडल से एक टन कार्बन डाइऑक्साइड (CO2) की कमी या हटाने का प्रतिनिधित्व करते हैं। किसान मिट्टी में कार्बन को पकड़ने और संग्रहित करने वाली टिकाऊ खेती प्रथाओं को अपनाकर ये क्रेडिट अर्जित कर सकते हैं।',
      keyBenefits: 'मुख्य लाभ:',
      benefit1: 'आपकी मौजूदा कृषि भूमि से अतिरिक्त आय',
      benefit2: 'मिट्टी के स्वास्थ्य और उर्वरता में प्राकृतिक सुधार',
      benefit3: 'टिकाऊ प्रथाओं के माध्यम से खेती की लागत कम करें',
      benefit4: 'जलवायु परिवर्तन से लड़ने में योगदान',
      benefit5: 'टिकाऊ उत्पादनांसाठी प्रीमियम बाजारों तक पहुंच',
      benefit6: 'कर लाभ और सरकारी प्रोत्साहन',
      howItWorks: 'यह कैसे काम करता है - पूरी प्रक्रिया',
      step1Title: 'प्रारंभिक पूछताछ',
      step1Desc: 'हमारे मंच के माध्यम से अपनी रुचि जमा करें या कार्बन क्रेडिट एजेंसी से संपर्क करें',
      step2Title: 'साइट विजिट और मूल्यांकन',
      step2Desc: 'विशेषज्ञ टीम पात्रता और क्षमता का आकलन करने के लिए आपके खेत का दौरा करती है',
      step3Title: 'मिट्टी परीक्षण',
      step3Desc: 'वर्तमान कार्बन स्तर को मापने के लिए व्यापक मिट्टी विश्लेषण',
      step4Title: 'दस्तावेज़ीकरण',
      step4Desc: 'भूमि रिकॉर्ड सहित आवश्यक दस्तावेज तैयार और जमा करें',
      step5Title: 'सत्यापन',
      step5Desc: 'आपकी खेती प्रथाओं और कार्बन पृथक्करण का तृतीय-पक्ष सत्यापन',
      step6Title: 'प्रमाणीकरण',
      step6Desc: 'आधिकारिक कार्बन क्रेडिट प्रमाणन प्राप्त करें',
      step7Title: 'कमाई शुरू करें',
      step7Desc: 'सत्यापित कार्बन पृथक्करण के आधार पर क्रेडिट वार्षिक जारी किए जाते हैं',
      eligiblePractices: 'पात्र खेती प्रथाएं',
      organic: 'जैविक खेती',
      organicDesc: 'कोई सिंथेटिक रसायन नहीं, प्राकृतिक उर्वरक और कीट नियंत्रण पर ध्यान',
      conservation: 'संरक्षण जुताई',
      conservationDesc: 'मिट्टी की संरचना और कार्बन को संरक��षित करने के लिए न्यूनतम मिट्टी की गड़बड़ी',
      agroforestry: 'कृषि वानिकी',
      agroforestryDesc: 'अधिकतम कार्बन कैप्चर के लिए फसलों के साथ पेड़ों को एकीकृत करना',
      integrated: 'एकीकृत खेती',
      integratedDesc: 'फसलों, पशुधन और टिकाऊ प्रथाओं का संयोजन',
      successStory: 'सफलता की कहानी',
      yourEarnings: 'आपकी अनुमानित कमाई',
      yourLand: 'आपकी भूमि',
      annualCredits: 'वार्षिक क्रेडिट',
      oneYear: '1 वर्ष की कमाई',
      threeYears: '3 वर्ष की कमाई',
      fiveYears: '5 वर्ष की कमाई',
      eligibility: 'पात्रता मानदंड',
      requiredDocs: 'आवश्यक दस्तावेज',
      howToApply: 'आवेदन कैसे करें',
      startApplication: 'अपना आवेदन शुरू करें',
      getHelp: 'सहायता और समर्थन प्राप्त करें',
      phoneSupport: 'फोन समर्थन',
      emailSupport: 'ईमेल समर्थन',
      regionalOffice: 'क्षेत्रीय कार्यालय',
      faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    },
    fieldManagement: {
      title: 'खेत प्रबंधन',
      subtitle: 'अपने खेत और फसलों का प्रबंधन करें',
      assignCrop: 'फसल असाइन करें',
      selectCrop: 'फसल चुनें',
      cropStage: 'फसल चरण',
      expectedHarvest: 'अपेक्षित कटाई',
      clearCrop: 'फसल साफ़ करें',
      addNewField: 'नया खेत जोड़ें',
      fieldName: 'खेत का नाम',
      fieldSize: 'खेत का आकार',
      currentCrop: 'वर्तमान फसल',
      lastUpdated: 'अंतिम अपडेट',
      save: 'परिवर्तन सहेजें',
    },
    disease: {
      title: 'रोग पहचान',
      subtitle: 'एआई-संचालित पौधे रोग पहचान',
      uploadImage: 'छवि अपलोड करें',
      takePhoto: 'फोटो लें',
      scanLeaf: 'पत्ती स्कैन करें',
      analyzing: 'छवि का विश्लेषण...',
      detected: 'रोग का पता लगा',
      severity: 'गंभीरता',
      treatment: 'उपचार',
      prevention: 'रोकथाम',
    },
    soil: {
      title: 'मिट्टी विश्लेषण',
      subtitle: 'अपनी मिट्टी के स्वास्थ्य की जांच करें',
      testSoil: 'मिट्टी परीक्षण',
      npkLevels: 'NPK स्तर',
      nitrogen: 'नाइट्रोजन',
      phosphorus: 'फास्फोरस',
      potassium: 'पोटैशियम',
      phLevel: 'pH स्तर',
      soilType: 'मिट्टी का प्रकार',
      recommendations: 'सिफारिशें',
    },
    fertilizer: {
      title: 'उर्वरक सिफारिश',
      subtitle: 'व्यक्तिगत उर्वरक सलाह प्राप्त करें',
      recommendedPlan: 'अनुशंसित योजना',
      quantity: 'मात्रा',
      timing: 'समय',
      cost: 'लागत',
      totalCost: 'कुल लागत',
      basalDose: 'आधार खुराक',
      topDressing: 'शीर्ष ड्रेसिंग',
      flowering: 'फूल आने के दौरान',
    },
    settings: {
      title: 'सेटिंग्स',
      notifications: 'सूचनाएं',
      pushNotifications: 'पुश सूचनाएं',
      weatherAlerts: 'मौसम चेतावनी',
      cropReminders: 'फसल अनुस्मारक',
      marketUpdates: 'बाज़ार अपडेट',
      languageDisplay: 'भाषा और प्रदर्शन',
      darkMode: 'डार्क मोड',
      dataPrivacy: 'डेटा और गोपनीयता',
      exportData: 'डेटा निर्यात करें',
      importData: 'डेटा आयात करें',
      clearData: 'सभी डेटा साफ़ करें',
      helpSupport: 'सहायता और समर्थन',
      helpCenter: 'सहायता केंद्र',
      aboutApp: 'ऐप के बारे में',
      version: 'संस्करण',
    },
    messages: {
      saveSuccess: 'परिवर्तन सफलतापूर्वक सहेजे गए!',
      saveError: 'परिवर्तन सहेजने में विफल',
      deleteSuccess: 'सफलतापूर्वक हटाया गया!',
      deleteError: 'हटाने में विफल',
      uploadSuccess: 'सफलतापूर्वक अपलोड किया गया!',
      uploadError: 'अपलोड करने में विफल',
      noDataFound: 'कोई डेटा नहीं मिला',
      loadingData: 'डेटा लोड हो रहा है...',
      confirmDelete: 'क्या आप वाकई हटाना चाहते हैं?',
      cannotUndo: 'यह क्रिया पूर्ववत नहीं की ज�� सकती',
    },
  },

  Marathi: {
    common: {
      save: 'जतन करा',
      cancel: 'रद्द करा',
      back: 'मागे',
      next: 'पुढे',
      submit: 'सबमिट करा',
      edit: 'संपादित करा',
      delete: 'हटवा',
      confirm: 'पुष्टी करा',
      yes: 'होय',
      no: 'नाही',
      loading: 'लोड होत आहे...',
      error: 'त्रुटी',
      success: 'यश',
      warning: 'चेतावणी',
      info: 'माहिती',
      search: 'शोधा',
      filter: 'फिल्टर',
      download: 'डाउनलोड',
      upload: 'अपलोड',
      select: 'निवडा',
      clear: 'साफ करा',
      apply: 'लागू करा',
      close: 'बंद करा',
      view: 'पहा',
      manage: 'व्यवस्थापित करा',
      with: 'सोबत',
    },
    nav: {
      dashboard: 'डॅशबोर्ड',
      weather: 'हवामान',
      aiTools: 'एआय साधने',
      market: 'बाजार',
      profile: 'प्रोफाइल',
    },
    dashboard: {
      title: 'डॅशबोर्ड',
      subtitle: 'स्वागत आहे',
      activeFields: 'सक्रिय शेते',
      totalLand: 'एकूण जमीन',
      activeCrops: 'सक्रिय पिके',
      seasonEarnings: 'हंगामाची कमाई',
      quickActions: 'जलद क्रिया',
      viewFieldDetails: 'शेत तपशील पहा',
      manageFields: 'शेते व्यवस्थापित करा',
      checkWeather: 'हवामान तपासा',
      diseaseDetection: 'रोग ओळख',
      fertilizer: 'खत मार्गदर्शक',
      marketPrices: 'बाजार भाव',
      cropCalendar: 'पीक दिनदर्शिका',
      expenses: 'खर्चाचा मागोवा घ्या',
      govtSchemes: 'सरकारी योजना',
      myFields: 'माझी शेते',
      field: 'शेत',
      area: 'क्षेत्रफळ',
      crop: 'पीक',
      stage: 'टप्पा',
      status: 'स्थिती',
      active: 'सक्रिय',
      fallow: 'परती',
      addField: 'नवीन शेत जोडा',
      currentField: 'सध्याचे शेत',
      todaysWeather: 'आजचे हवामान',
      clearSky: 'स्वच्छ आकाश',
      cropHealth: 'पीक आरोग्य',
      goodCondition: 'चांगली स्थिती',
      alertFor: 'सावधानता',
      alertCotton: 'उच्च आर्द्रतेमुळे गुलाबी बोंडाळा संसर्ग तपासा.',
      alertWheat: 'गंजण्यासाठी अनुकूल परिस्थिती. बारकाईने निरीक्षण करा.',
      alertSoybean: 'मुसळधार पावसाची शक्यता. पाणी निचरा सुनिश्चित करा.',
      alertGeneral: 'हवामान परिस्थिती लक्ष देण्यास योग्य आहे.',
      aiScan: 'एआय स्कॅन',
      testSoil: 'माती चाचणी',
      cropSuggest: 'पीक सूचना',
      aiRecommend: 'एआय शिफारस',
      getAdvice: 'सल्ला घ्या',
      allFeatures: 'सर्व वैशिष्ट्ये',
      smartAdvisory: 'स्मार्ट सल्ला',
      cropLifecycle: 'पीक जीवनचक्र मार्गदर्शन',
      pricePredictions: 'किंमत अंदाज आणि कल',
      incomeComparison: 'उत्पन्न तुलना',
      compareCropProfits: 'पीक नफा तुलना करा',
      subsidiesBenefits: 'सबसिडी आणि लाभ पहा',
      expenseTracker: 'खर्च ट्रॅकर',
      trackCostsProfits: 'खर्च आणि नफा ट्रॅक करा',
      remindersSchedules: 'आठवणी आणि वेळापत्रक',
      soilAnalysis: 'माती विश्लेषण',
    },
    weather: {
      title: 'हवामान',
      subtitle: 'आजचे हवामान अंदाज',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      windSpeed: 'वाऱ्याचा वेग',
      rainfall: 'पाऊस',
      forecast: '७ दिवसांचा अंदाज',
      today: 'आज',
      tomorrow: 'उद्या',
      advisory: 'हवामान सल्ला',
      weatherAlert: 'हवामान इशारा',
      goodForSpraying: 'फवारणीसाठी चांगली परिस्थिती',
      avoidFieldWork: 'आज शेतातील काम टाळा',
    },
    aiTools: {
      title: 'एआय साधने',
      subtitle: 'स्मार्ट शेती उपाय',
      diseaseDetection: 'रोग ओळख',
      diseaseSubtitle: 'एआय पाने स्कॅन',
      soilAnalysis: 'माती विश्लेषण',
      soilSubtitle: 'माती आरोग्य तपासा',
      cropSuggest: 'पीक सूचना',
      cropSubtitle: 'सर्वोत्तम पिके',
      fertilizerReco: 'खत',
      fertilizerSubtitle: 'सल्ला मिळवा',
      smartAdvisory: 'स्मार्ट शेती सल्ला',
      smartAdvisoryDesc: 'जीवनचक्र मार्गदर्शन आणि टिप्स',
      carbonCredits: 'कार्बन क्रेडिट',
      carbonCreditsDesc: 'हरित होत असताना पैसे कमवा',
      howAiHelps: 'एआय कशी मदत करते',
      aiFeature1: '90%+ अचूकतेसह त्वरित रोग ओळख',
      aiFeature2: 'आपल्या मातीच्या आधारे वैयक्तिक पीक शिफारसी',
      aiFeature3: 'खर्च कमी करण्यासाठी अनुकूल खत वापर',
      aiFeature4: 'हवामान-जागरूक शेती वेळापत्रक',
      aiFeature5: 'कार्बन क्रेडिटद्वारे अतिरिक्त उत्पन्न',
    },
    market: {
      title: 'बाजार',
      subtitle: 'नवीनतम बाजार भाव',
      todayPrices: 'आजचे भाव',
      marketTrends: 'बाजार कल',
      incomeComparison: 'उत्पन्न तुलना',
      sellingTips: 'विक्री टिप्स',
      viewAllPrices: 'सर्व भाव पहा',
      compareIncome: 'उत्पन्नाची तुलना करा',
      pricePerQuintal: 'प्रति क्विंटल भाव',
      trend: 'कल',
      up: 'वर',
      down: 'खाली',
      stable: 'स्थिर',
      // Market Prices - Enhanced
      marketPrices: 'बाजार भाव',
      realTimePredictions: 'रिअल-टाइम आणि अंदाज',
      myCrop: 'माझे पीक',
      otherCrops: 'इतर पिके',
      todaysPrice: 'आजचा भाव',
      perQuintal: 'प्रति क्विंटल',
      fromLastMonth: 'गेल्या महिन्यापासून',
      lastUpdated: 'शेवटचे अपडेट:',
      hoursAgo: 'तासांपूर्वी',
      sixMonthTrend: '६ महिन्यांचा भाव कल',
      aiPredictions: 'एआय भाव अंदाज',
      nextWeek: 'पुढील आठवडा',
      nextMonth: 'पुढील महिना',
      harvestSeason: 'कापणी हंगाम',
      nearbyMandis: 'जवळचे मंडी भाव',
      governmentMSP: 'सरकारी MSP',
      minimumSupportPrice: 'किमान आधार मूल्य',
      mediumStaple: 'मध्यम स्टेपल',
      mspAdvice: 'सध्याचा बाजार भाव MSP पेक्षा जास्त आहे. विक्रीसाठी चांगली वेळ!',
      sellingStrategy: 'विक्री धोरण',
      strategyTip1: 'भाव वाढत आहेत. चांगल्या दरासाठी १-२ आठवडे थांबण्याचा विचार करा.',
      strategyTip2: 'लातूर मार्केट तुमच्या प्रदेशात सर्वोच्च किंमत देत आहे.',
      strategyTip3: 'आता ४०-५०% उत्पादन विका, बाकीचे अपेक्षित वाढीसाठी ठेवा.',
      compareOtherCrops: 'इतर पिकांची तुलना करा',
      compare: 'तुलना करा',
      demand: 'मागणी',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कमी',
      highDemandCrops: 'उच्च मागणी असलेली पिके',
      considerNextSeason: 'तुमच्या पुढील हंगामासाठी या पिकांचा विचार करा:',
      // Search & Filter
      searchPrices: 'भाव शोधा',
      findTodaysPrice: 'आजचा भाव शोधा',
      selectCrop: 'पीक निवडा',
      selectState: 'राज्य निवडा',
      selectMarket: 'मंडी/बाजार निवडा',
      searchResults: 'शोध परिणाम',
      noResultsFound: 'कोणतेही परिणाम आढळले नाहीत',
      tryDifferentFilters: 'तुमचे फिल्टर समायोजित करण्याचा प्रयत्न करा',
      // Comparison
      compareCrops: 'पिकांची तुलना करा',
      yourCrop: 'तुमचे पीक',
      selectedCrop: 'निवडलेले पीक',
      currentPrice: 'सध्याचा भाव',
      priceDifference: 'किंमत फरक',
      higher: 'जास्त',
      lower: 'कमी',
      demandLevel: 'मागणी पातळी',
      profitability: 'नफा',
      roi: 'ROI',
      comparisonInsights: 'तुलना अंतर्दृष्टी',
      closeComparison: 'तुलना बंद करा',
      cropName: 'पिकाचे नाव',
      state: 'राज्य',
      market: 'बाजार',
      apply: 'फिल्टर लागू करा',
      reset: 'रीसेट करा',
    },
    profile: {
      title: 'प्रोफाइल',
      subtitle: 'तुमचा खाता तपशील',
      personalInfo: 'वैयक्तिक माहिती',
      farmDetails: 'शेत तपशील',
      preferences: 'प्राधान्ये',
      settings: 'सेटिंग्ज',
      editProfile: 'प्रोफाइल संपादित करा',
      logout: 'लॉगआउट',
      name: 'नाव',
      farmerId: 'शेतकरी आयडी',
      phone: 'फोन',
      email: 'ईमेल',
      village: 'गाव',
      pinCode: 'पिन कोड',
      totalLand: 'एकूण जमीन',
      numFields: 'शेतांची संख्या',
      irrigationType: 'सिंचन प्रकार',
      waterAvailability: 'पाणी उपलब्धता',
      experience: 'शेतीचा अनुभव',
      budget: 'हंगामी बजेट',
      riskPreference: 'जोखीम प्राधान्य',
      preferredCrops: 'आवडती पिके',
      farmingType: 'शेतीचा प्रकार',
      language: 'भाषा',
      notifications: 'सूचना',
      years: 'वर्षे',
      guntha: 'गुंठे',
      fields: 'शेते',
      activeCrops: 'सक्रिय पिके',
      thisSeason: 'इस सीज़न',
      toolsAndServices: 'उपकरण आणि सेवांसाठी',
      governmentSchemes: 'सरकारी योजनांसाठी',
      viewSubsidies: 'सब्सिडी आणि लाभ देखा',
      expenseTracker: 'खर्च ट्रॅकर',
      trackCosts: 'खर्च आणि आय ट्रॅक करा',
      appSettings: 'ऐप सेटिंग्ज',
    },
    carbonCredits: {
      title: 'कार्बन क्रेडिट',
      subtitle: 'पर्यावरणाचे संरक्षण करताना पैसे कमवा',
      overview: 'विहंगावलोकन',
      calculator: 'कॅल्क्युलेटर',
      apply: 'अर्ज करा',
      whatAre: 'कार्बन क्रेडिट काय आहेत?',
      whatAreDesc: 'कार्बन क्रेडिट हे प्रमाणपत्र आहेत जे वातावरणातून एक टन कार्बन डायऑक्साइड (CO2) कमी करणे किंवा काढणे दर्शवितात. शेतकरी मातीत कार्बन पकडणाऱ्या आणि साठवणाऱ्या शाश्वत शेती पद्धती स्वीकारून ही क्रेडिट मिळवू शकतात.',
      keyBenefits: 'मुख्य फायदे:',
      benefit1: 'तुमच्या विद्यमान शेतजमिनीतून अतिरिक्त उत्पन्न',
      benefit2: 'मातीचे आरोग्य आणि सुपीकता नैसर्गिकरित्या सुधारा',
      benefit3: 'शाश्वत पद्धतींद्वारे शेतीचा खर्च कमी करा',
      benefit4: 'हवामान बदलाशी लढण्यात योगदान',
      benefit5: 'शाश्वत उत्पादनांसाठी प्रीमियम बाजारपेठांमध्ये प्रवेश',
      benefit6: 'कर सवलती आणि सरकारी प्रोत्साहन',
      howItWorks: 'हे कसे कार्य करते - संपूर्ण प्रक्रिया',
      step1Title: 'प्रारंभिक चौकशी',
      step1Desc: 'आमच्या प्लॅटफॉर्मद्वारे तुमची स्वारस्य सबमिट करा किंवा कार्बन क्रेडिट एजन्सीशी संपर्क साधा',
      step2Title: 'साइट भेट आणि मूल्यांकन',
      step2Desc: 'तज्ञ टीम पात्रता आणि क्षमतेचे मूल्यांकन करण्यासाठी तुमच्या शेताला भेट देते',
      step3Title: 'माती चाचणी',
      step3Desc: 'सध्याची कार्बन पातळी मोजण्यासाठी सर्वसमावेशक माती विश्लेषण',
      step4Title: 'दस्तऐवजीकरण',
      step4Desc: 'जमीन नोंदींसह आवश्यक कागदपत्रे तयार आणि सबमिट करा',
      step5Title: 'पडताळणी',
      step5Desc: 'तुमच्या शेती पद्धती आणि कार्बन पृथक्करणाचे तृतीय-पक्ष पडताळणी',
      step6Title: 'प्रमाणीकरण',
      step6Desc: 'अधिकृत कार्बन क्रेडिट प्रमाणन प्राप्त करा',
      step7Title: 'कमाई सुरू करा',
      step7Desc: 'पडताळल्या कार्बन पृथक्करणाच्या आधारे क्रेडिट वार्षिक जारी केले जातात',
      eligiblePractices: 'पात्र शेती पद्धती',
      organic: 'सेंद्रिय शेती',
      organicDesc: 'कोणतीही संश्लेषित रसायने नाहीत, नैसर्गिक खते आणि कीटक नियंत्रणावर लक्ष',
      conservation: 'संरक्षण नांगरणी',
      conservationDesc: 'मातीची रचना आणि कार्बन जतन करण्यासाठी किमान माती अडथळा',
      agroforestry: 'कृषी वनीकरण',
      agroforestryDesc: 'कमाल कार्बन कॅप्चरसाठी पिकांसह झाडे एकत्रित करणे',
      integrated: 'एकात्मिक शेती',
      integratedDesc: 'पिके, पशुधन आणि शाश्वत पद्धतींचे संयोजन',
      successStory: 'यशाची कहाणी',
      yourEarnings: 'तुमची अंदाजे कमाई',
      yourLand: 'तुमची जमीन',
      annualCredits: 'वार्षिक क्रेडिट',
      oneYear: '१ वर्षाची कमाई',
      threeYears: '३ वर्षांची कमाई',
      fiveYears: '५ वर्षांची कमाई',
      eligibility: 'पात्रता निकष',
      requiredDocs: 'आवश्यक कागदपत्रे',
      howToApply: 'अर्ज कसा करावा',
      startApplication: 'तुमचा अर्ज सुरू करा',
      getHelp: 'मदत आणि समर्थन मिळवा',
      phoneSupport: 'फोन समर्थन',
      emailSupport: 'ईमेल समर्थन',
      regionalOffice: 'प्रादेशिक कार्यालय',
      faqs: 'वारंवार विचारले जाणारे प्रश्न',
    },
    fieldManagement: {
      title: 'शेत व्यवस्थापन',
      subtitle: 'तुमची शेते आणि पिके व्यवस्थापित करा',
      assignCrop: 'पीक नियुक्त करा',
      selectCrop: 'पीक निवडा',
      cropStage: 'पीक टप्पा',
      expectedHarvest: 'अपेक्षित कापणी',
      clearCrop: 'पीक साफ करा',
      addNewField: 'नवीन शेत जोडा',
      fieldName: 'शेताचे नाव',
      fieldSize: 'शेताचा आकार',
      currentCrop: 'वर्तमान पीक',
      lastUpdated: 'शेवटचे अपडेट',
      save: 'बदल जतन करा',
    },
    disease: {
      title: 'रोग ओळख',
      subtitle: 'एआय-चालित वनस्पती रोग ओळख',
      uploadImage: 'प्रतिमा अपलोड करा',
      takePhoto: 'फोटो घ्या',
      scanLeaf: 'पाने स्कॅन करा',
      analyzing: 'प्रतिमेचे विश्लेषण...',
      detected: 'रोग आढळला',
      severity: 'तीव्रता',
      treatment: 'उपचार',
      prevention: 'प्रतिबंध',
    },
    soil: {
      title: 'माती विश्लेषण',
      subtitle: 'तुमच्या मातीच्या आरोग्याची चाचणी करा',
      testSoil: 'माती चाचणी',
      npkLevels: 'NPK पातळी',
      nitrogen: 'नायट्रोजन',
      phosphorus: 'फॉस्फरस',
      potassium: 'पोटॅशियम',
      phLevel: 'pH पातळी',
      soilType: 'मातीचा प्रकार',
      recommendations: 'शिफारसी',
    },
    fertilizer: {
      title: 'खत शिफारस',
      subtitle: 'वैयक्तिक खत सल्ला मिळवा',
      recommendedPlan: 'शिफारस केलेली योजना',
      quantity: 'प्रमाण',
      timing: 'वेळ',
      cost: 'खर्च',
      totalCost: 'एकूण खर्च',
      basalDose: 'बेसल डोस',
      topDressing: 'टॉप ड्रेसिंग',
      flowering: 'फुलांच्या वेळी',
    },
    settings: {
      title: 'सेटिंग्ज',
      notifications: 'सूचना',
      pushNotifications: 'पुश सूचना',
      weatherAlerts: 'हवामान इशारे',
      cropReminders: 'पीक स्मरणपत्रे',
      marketUpdates: 'बाजार अपडेट',
      languageDisplay: 'भाषा आणि प्रदर्शन',
      darkMode: 'डार्क मोड',
      dataPrivacy: 'डेटा आणि गोपनीयता',
      exportData: 'डेटा निर्यात करा',
      importData: 'डेटा आयात करा',
      clearData: 'सर्व डेटा साफ करा',
      helpSupport: 'मदत आणि समर्थन',
      helpCenter: 'मदत केंद्र',
      aboutApp: 'अॅपबद्दल',
      version: 'आवृत्ती',
    },
    messages: {
      saveSuccess: 'बदल यशस्वीरित्या जतन झाले!',
      saveError: 'बदल जतन करण्यात अयशस्वी',
      deleteSuccess: 'यशस्वीरित्या हटवले!',
      deleteError: 'हटविण्यात अयशस्वी',
      uploadSuccess: 'यशस्वीरित्या अपलोड केले!',
      uploadError: 'अपलोड करण्यात अयशस्वी',
      noDataFound: 'कोणताही डेटा आढळला नाही',
      loadingData: 'डेटा लोड होत आहे...',
      confirmDelete: 'तुम्हाला खात्री आहे की तुम्ही हटवू इच्छिता?',
      cannotUndo: 'ही क्रिया पूर्ववत केली जाऊ शकत नाही',
    },
  },
};