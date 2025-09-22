import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Award,
  Calendar,
  MessageCircle,
  ChevronRight,
  Gift,
  ChevronUp,
  ChevronDown,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TradingCourseModules = () => {
 
const navigate = useNavigate();
const handleEnroll = (course) => {
  console.log('Course clicked:', course);
  console.log('Course name:', course.name);
  console.log('Navigating to:', `/register?courseName=${encodeURIComponent(course.name)}`);
  
  navigate(`/register?courseName=${encodeURIComponent(course.name)}`);
};


// watsapp

 const whatsappNumber = "919363238386";
  const message = "Hi Trading Professor! I'm interested in learning about your trading course and would like to know more about your trading learning approach. Could you please share the details?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const [expandedTopics, setExpandedTopics] = useState({}); // track per phase

  const toggleTopics = (id) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const phases = [
    {
      id: 1,
      name: "Foundation Phase",
      subtitle: "Basic to Intermediate",
      price: "₹19,999",
      originalPrice: "₹25,999",
      duration: "2 Days Online",
      sessions: "2.5 Hours/Day",
      level: "Beginner to Intermediate",
        color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-purple-600/10",
      borderColor: "border-blue-500/30",
      features: [
        "Basic Market Understanding",
       "Technical Analysis Basics",
        "Risk Management Principles",
        "Entry & Exit Strategies",
        "Psychology of Trading",
       ],
      topics: [
        "Market Basics & Terminology",
        "Foundation Of Market",
        "Trend Analysis",
        "Strike Selection",
        "Greeks Understanding",
        ],
      bonuses: [
        "1 Month TP Premium Group Access",
        "Live Sessions",
        "Invite a Friend, Unlock 1 Month of TP Premium Group Access – On Us!"
      ]
    },
    {
      id: 2,
      name: "Advanced Phase",
      subtitle: "Professional Trading",
      price: "₹34,999",
      originalPrice: "₹45,999",
      duration: "3 Days Online",
      sessions: "2.5 Hours/Day", 
      level: "Intermediate to Advanced",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-600/10",
      borderColor: "border-purple-500/30",
      popular: true,
      features: [
        "Advanced Technical Analysis",
        "Manipulation Finding Strategies",
        "Time-Based Formulas",
        "Psychology",
      ],
      topics: [
        "Insight Based Formula",
        "Point Variation Strategies",
        "Manipulation Finding Strategies",
        "Roll Of Emotion",
        "Psychology",
      ],
      bonuses: [
        "2 Month TP Premium Group  Access",
        "Live Sessions",
      "Invite a Friend, Unlock 2 Month of TP Premium Group Access – On Us!",
        "Free Combination Website Paid Version"
      ]
    },
    {
      id: 3,
      name: "Master Phase",
      subtitle: "Expert Level Trading",
      price: "₹57,999",
      originalPrice: "₹75,999",
      duration: "4 Days Online",
      sessions: "2.5 Hours/Day",
      level: "Advanced to Expert",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-red-600/10",
      borderColor: "border-orange-500/30",
      features: [
        "Secret Trading Formulas",
        "Institution-Level Strategies",
        "Market Manipulation Insights",
        "Advanced Options Tricks",
        "Algorithmic Trading Basics",
        "Risk-Free Strategies",
        "Consistent Profit Methods"
      ],
      topics: [
       
        "Timing-Based Formula",
        "Option Trick",
        "Stock Option",
        "Stopless Smith",
        "Change Of Mindset"
      ],
      bonuses: [
         "3 Months TP Premium Group Access",
         "Live Sessions",
         "Advanced Trend Analysis Software Free",
         "Invite a Friend, Unlock 3 Month of TP Premium Group Access – On Us!"
      ]
    },
  ];

  // const allPhasesPackage = {
    //   name: "Complete Master Package",
  //   subtitle: "All 3 Phases + Bonuses",
  //   price: "₹89,999",
  //   originalPrice: "₹1,12,997",
  //   savings: "₹22,998",
  //   duration: "5 Days Online",
  //   sessions: "2.5 Hours/Day",
  //   level: "Beginner to Expert",
  //   color: "from-emerald-500 to-cyan-600",
  //   features: [
  //     "All Phase 1, 2 & 3 Content",
  //     "6 Month Premium TP Group Access",
  //     "Live sessions",
  //     "Adavnced Trend Analysis Software",
  //     "Free Combination Website Paid Version",
  //     "Invite a Friend, Unlock 4 Month of Exclusive Group Access – On Us!"
      
  //   ]  };
 const allPhasesPackageFree = {
    id: 4,
    name: "Beginner to Pro Trader",
    subtitle: "Master the art of professional trading with our comprehensive course",
    price: "₹18,999",
    originalPrice: "₹18,999",
    duration: "1 Month Online Classes",
    sessions: "2.5 Hours/Day",
    level: "Beginner to Pro",
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-purple-600/10",
    borderColor: "border-blue-500/30",
    topics: [
      "Market Basics & Terminology",
      "Foundation Of Market",
      "Trend Analysis",
      "Strike Selection",
      "Greeks Understanding",
      "Insight Based Formula",
      "Point Variation Strategies",
      "Manipulation Finding Strategies",
      "Roll Of Emotion",
      "Psychology",
      "Timing-Based Formula",
      "Option Trick",
      "Stock Option",
      "Stopless Smith",
      "Change Of Mindset"
    ],
    features: [
      "1 Month Premium TP Group Access",
      "Live sessions - 1 MONTH",
      "Advanced Trend Analysis Software Paid Version",
      "Free Combination Website Paid Version",
    ]
  };


  // Function to extract and highlight "Free" from the name
const renderNameWithHighlightedFree = (name) => {
    return (
      <span>
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Beginner to Pro
        </span>{' '}
        Trader
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 py-12 px-4 mt-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-semibold">Trading Professor Courses</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Master Trading with Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
              Secret Formulas
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn the secret formations and timing strategies that professional traders use. 
            From basics to advanced techniques, become a profitable trader with our proven methods.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">350+</div>
              <div className="text-gray-400">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>

       

        {/* Individual Phases */}
   {/* <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
  {phases.map((phase, index) => (
    <div
      key={phase.id}
      className={`${phase.bgColor} backdrop-blur-sm border ${phase.borderColor} rounded-2xl p-6 relative transition-all duration-300 hover:transform hover:scale-105 ${
        phase.popular ? 'ring-2 ring-purple-500' : ''
      } max-w-md mx-auto min-h-[700px] flex flex-col`}
    >
      {phase.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          MOST POPULAR
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{phase.name}</h3>
        <p className="text-gray-300">{phase.subtitle}</p>

        <div className="flex items-baseline justify-center space-x-2 mt-4">
          <span className="text-3xl font-bold text-white">{phase.price}</span>
          <span className="text-lg text-gray-400 line-through">{phase.originalPrice}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mt-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{phase.duration}</span>
          </div>

          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{phase.sessions}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6 flex-grow">
        <div>
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Course Topics
          </h4>

          <div className="space-y-2 transition-all duration-300 ease-in-out mb-6">
            {/* Show topics based on expansion state */}
            {/* {(expandedTopics[phase.id] 
              ? (phase.topics || []) 
              : (phase.topics || []).slice(0, 4)
            ).map((topic, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{topic}</span>
              </div>
            ))}

            {/* Show expand/collapse button if more than 4 topics */}
            {/* {(phase.topics || []).length > 4 && (
              <button
                onClick={() => toggleTopics(phase.id)}
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline focus:outline-none transition-colors duration-200 flex items-center space-x-1"
              >
                {expandedTopics[phase.id] ? (
                  <>
                    <span>Show less topics</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>+ {(phase.topics || []).length - 4} more topics</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <Gift className="w-4 h-4 mr-2" />
            Bonus Features
          </h4>
          <div className="space-y-2">
            {(phase.bonuses || []).map((bonus, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{bonus}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */} 

      {/* <button
    onClick={() => handleEnroll(phase)}
  className={`w-full bg-gradient-to-r ${phase.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 mt-auto`}
>
        <span>Enroll Phase {phase.id}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  ))}
</div>  */}
{/* All Phases Package */}
{/* <div className="mb-12">
  <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-600/10 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-2 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
      BEST VALUE
    </div>
    
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mt-8 sm:mt-4 lg:mt-0">
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{allPhasesPackage.name}</h3>
        <p className="text-emerald-300 text-base sm:text-lg mb-4">{allPhasesPackage.subtitle}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4 mb-6 gap-2 sm:gap-0">
          <span className="text-3xl sm:text-4xl font-bold text-white">{allPhasesPackage.price}</span>
          <span className="text-xl sm:text-2xl text-gray-400 line-through">{allPhasesPackage.originalPrice}</span>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block w-fit">
            Save {allPhasesPackage.savings}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300 mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{allPhasesPackage.duration}</span>
            <span>{allPhasesPackageFree.sessions}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            <span>{allPhasesPackage.level}</span>
          </div>
        </div>

        <button
  onClick={() => handleEnroll(allPhasesPackage)}
  
          className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          Enroll Complete Package
        </button>
      </div>

      <div className="space-y-3 mt-6 lg:mt-0">
        {allPhasesPackage.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div> */}

{/* Free Package */}
 <div className="mb-12 bg-gray-900 p-2 sm:p-4 lg:p-8">
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-3 sm:p-6 lg:p-8 relative overflow-hidden max-w-6xl mx-auto">
        
        {/* Badge */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold text-center">
          <span className="block sm:hidden">PRO TRADER</span>
          <span className="hidden sm:block">BEST STRATEGIES</span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start mt-6 sm:mt-4 lg:mt-0">
          
          {/* Left Side - Header + Topics */}
          <div>
            {/* Header Section */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
              {renderNameWithHighlightedFree(allPhasesPackageFree.name)}
            </h3>
            <p className="text-blue-300 text-sm sm:text-base lg:text-lg mb-4">{allPhasesPackageFree.subtitle}</p>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4 mb-4 sm:mb-6 gap-2 sm:gap-0">
              <span className="text-lg sm:text-xl font-bold text-white">{allPhasesPackageFree.price}</span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span>{allPhasesPackageFree.duration}</span>
                <span>{allPhasesPackageFree.sessions}</span>
              </div>
            </div>

            {/* Course Topics */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-3 sm:mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                Course Topics
              </h4>
              <div className="space-y-2 sm:space-y-3 max-h-60 sm:max-h-80 overflow-y-auto pr-1 sm:pr-2">
                {allPhasesPackageFree.topics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-slate-800/30 border-l-3 sm:border-l-4 border-blue-400 hover:border-purple-400 transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-2 hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-purple-500/10"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      index % 2 === 0 ? 'bg-blue-400' : 'bg-purple-400'
                    }`}></div>
                    <span className="text-gray-300 text-xs sm:text-sm lg:text-base group-hover:text-white transition-colors leading-tight">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollment Button */}
            <button
              onClick={() => handleEnroll(allPhasesPackageFree)}
              className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              <span>Student Enroll Phase</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </button>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-3 mt-4 sm:mt-6 lg:mt-0">
            <h4 className="text-base sm:text-lg font-semibold text-purple-300 mb-4 sm:mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
              What You Get
            </h4>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="group flex items-start space-x-3 sm:space-x-4 p-3 sm:p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div>
                  <span className="text-white font-medium text-xs sm:text-sm lg:text-base block mb-1">
                    1 Month Premium TP Group Access
                  </span>
                  <span className="text-gray-400 text-xs">Exclusive trading community</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 sm:space-x-4 p-3 sm:p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                <div>
                  <span className="text-white font-medium text-xs sm:text-sm lg:text-base block mb-1">
                    Live sessions - 1 Month
                  </span>
                  <span className="text-gray-400 text-xs">Interactive learning experience</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 sm:space-x-4 p-3 sm:p-5 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                </svg>
                <div>
                  <span className="text-white font-medium text-xs sm:text-sm lg:text-base block mb-1">
                    Advanced Trend Analysis Software Paid Version
                  </span>
                  <span className="text-gray-400 text-xs">Professional trading tools</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 sm:space-x-4 p-3 sm:p-5 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/5 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0 mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <div>
                  <span className="text-white font-medium text-xs sm:text-sm lg:text-base block mb-1">
                    Free Combination Website Paid Version
                  </span>
                  <span className="text-gray-400 text-xs">Premium website access</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-slate-800/30 rounded-lg border border-slate-600/30">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-300 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                  </svg>
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Class Schedule */}
   <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12">   
      <h3 className="text-3xl font-bold text-white mb-6 text-center">Upcoming Class Schedule</h3>    
      <div className="flex justify-center">     
        <div className="w-full max-w-6xl">       
          {/* August Classes */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 ">        
            <div className="flex justify-center mb-4">   
              <div className="flex items-center space-x-3">     
                <Calendar className="w-6 h-6 text-blue-400" />     
                <h4 className="text-xl font-semibold text-white">October Online Classes</h4>   
              </div> 
            </div>         
            <div className="flex flex-col items-center space-y-2 text-gray-300">   
              <p><strong>Dates:</strong>   OCTOBER - 27, 28, 29,30</p>   
              <p><strong>Duration:</strong> 4 Days</p>   
              <p><strong>Timing:</strong> 2.5 Hours per Day</p>   
              <p><strong>Mode:</strong> Live Online Sessions</p> 
            </div>        
          </div>

          {/* September Classes
          <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-xl p-6">        
            <div className="flex justify-center mb-4">   
              <div className="flex items-center space-x-3">     
                <Calendar className="w-6 h-6 text-green-400" />     
                <h4 className="text-xl font-semibold text-white">September Online Classes</h4>   
              </div> 
            </div>         
            <div className="flex flex-col items-center space-y-2 text-gray-300">   
              <p><strong>Dates:</strong> September 1, 2, 3, 4, 5</p>   
              <p><strong>Duration:</strong> 5 Days</p>   
              <p><strong>Timing:</strong> 2.5 Hours per Day</p>   
              <p><strong>Mode:</strong> Live Online Sessions</p> 
            </div>        
          </div> */}

          {/* October Classes
          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6">        
            <div className="flex justify-center mb-4">   
              <div className="flex items-center space-x-3">     
                <Calendar className="w-6 h-6 text-orange-400" />     
                <h4 className="text-xl font-semibold text-white">October Online Classes</h4>   
              </div> 
            </div>         
            <div className="flex flex-col items-center space-y-2 text-gray-300">   
              <p><strong>Dates:</strong> October 7, 8, 9, 10, 11</p>   
              <p><strong>Duration:</strong> 3 Days</p>   
              <p><strong>Timing:</strong> 2.5 Hours per Day</p>   
              <p><strong>Mode:</strong> Live Online Sessions</p> 
            </div>        
          </div> */}
        </div>   
      </div> 
    </div>

        {/* Contact & Support */}
        <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Need Help? Contact Us</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a                
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"               
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"             
        > 
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp: +91 9363238386</span>
            </a>
            <p className="text-gray-400">Available 3.30 PM - 8 PM for doubts & queries</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
          <p className="text-gray-400 text-sm leading-relaxed">
            <strong>Disclaimer:</strong> Our Investors Are The Most Important person To Us... However The Strategies, Material , Discussions In This Trading Class Are Provided Solely Educational And Informational Purposes Only. They should not be interpreted as investment, trading, or financial advice, nor as recommendations to buy or sell any financial instrument.Trading and investing And Portfolio Management Services (PMS) in the Stock market involve substantial risk, including the possible loss of principal. Past performance, strategies, or demonstrations discussed in this class may not be indicative of future results. Every participant is responsible for their own financial decisions and should consult with a qualified financial advisor before engaging in any trading or investment activity.The instructors and organizers of this class are not licensed financial advisors and expressly disclaim any liability for any losses or damages incurred as a result of the information shared herein. Participation in this class does not create a client relationship with the instructors or the organization.By participating in this class, you acknowledge and accept these terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradingCourseModules;







