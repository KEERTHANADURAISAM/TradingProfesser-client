import React from 'react';
import { Shield, Lock, Eye, FileText, AlertCircle, Mail, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-semibold">Your Privacy Matters</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          
          <p className="text-gray-400 text-sm">
            Last Updated: December 21, 2025
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Welcome to Trading Professor. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Personal Information</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  When you register for our courses or contact us, we may collect:
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Name and contact details (email, phone number)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Trading experience level</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Communication preferences</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Automatically Collected Data</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We automatically collect device information, browser type, IP address, and browsing behavior to improve our services and user experience.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide and maintain our educational services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Send course updates, educational content, and newsletters</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Improve and personalize your learning experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Process registrations and communicate with you</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Analyze website usage to enhance our platform</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Data Security</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We strive to use commercially acceptable means to protect your data.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Your Rights</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-4 border border-blue-500/30">
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                You have the right to:
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Access your personal data</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Correct inaccurate information</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Request data deletion</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Withdraw consent anytime</span>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Purpose Disclaimer */}
          <section className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-2 border-orange-500/40 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-3">
              <AlertCircle className="w-7 h-7 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Important Educational Disclaimer</h2>
                <div className="space-y-3 text-gray-200 text-sm leading-relaxed">
                  <p className="font-semibold text-orange-300">
                    STRICTLY FOR EDUCATIONAL PURPOSES ONLY
                  </p>
                  <p>
                    <strong>Trading Professor</strong> provides educational content and information about trading and financial markets. We do NOT provide financial advice, investment recommendations, or trading signals.
                  </p>
                  <p>
                    All strategies, materials, and discussions in our courses are provided solely for <strong>educational and informational purposes</strong>. They should not be interpreted as investment, trading, or financial advice.
                  </p>
                  <p className="text-orange-200 font-semibold">
                    ⚠️ Trading and investing involve substantial risk, including the possible loss of principal. Past performance is NOT indicative of future results.
                  </p>
                  <p>
                    Every participant is responsible for their own financial decisions. You should carefully consider your financial situation and consult with a qualified financial advisor before making any investment decisions.
                  </p>
                  <p className="text-sm text-gray-300 italic">
                    By using our services, you acknowledge that the instructors and organizers are not licensed financial advisors and expressly disclaim any liability for losses or damages incurred from the information shared.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl font-bold text-white">Cookies & Tracking</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Third-Party Links</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Our website may contain links to external sites. We are not responsible for the privacy practices or content of these third-party websites.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <strong className="text-blue-300">Website:</strong> https://tradingprofessor.netlify.app/
              </p>
              <p className="text-gray-300">
                <strong className="text-blue-300">WhatsApp:</strong> +91 9363238386
              </p>
              <p className="text-gray-400 text-xs mt-3">
                Available: 3:30 PM - 8:00 PM for queries
              </p>
            </div>
          </section>

          {/* Updates */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Policy Updates</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services constitutes acceptance of any changes.
            </p>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            By using Trading Professor, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;