import { useState } from 'react';
import { ArrowLeft, FileText, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { NavigableProps } from '../types';

interface GovernmentSchemesProps extends NavigableProps {}

const schemes = [
  {
    name: 'PM-KISAN',
    fullName: 'Pradhan Mantri Kisan Samman Nidhi',
    benefit: '₹6,000 per year',
    description: 'Direct income support to all farmer families',
    eligibility: [
      'All landholding farmer families',
      'Small and marginal farmers get priority',
      'Valid Aadhaar card required'
    ],
    documents: [
      'Aadhaar Card',
      'Land ownership documents',
      'Bank account details',
      'Mobile number'
    ],
    steps: [
      'Visit PM-KISAN portal or nearest CSC',
      'Fill registration form with Aadhaar',
      'Submit land records and bank details',
      'Get confirmation SMS',
      'Receive ₹2,000 every 4 months'
    ],
    category: 'Income Support',
    status: 'Eligible'
  },
  {
    name: 'PMFBY',
    fullName: 'Pradhan Mantri Fasal Bima Yojana',
    benefit: 'Crop insurance coverage',
    description: 'Comprehensive crop insurance against natural calamities',
    eligibility: [
      'All farmers growing notified crops',
      'Both loanee and non-loanee farmers',
      'Must enroll before sowing/planting'
    ],
    documents: [
      'Aadhaar Card',
      'Land documents',
      'Bank account details',
      'Sowing certificate'
    ],
    steps: [
      'Visit CSC, bank, or insurance company',
      'Fill application form',
      'Pay premium (2% for Kharif crops)',
      'Submit sowing certificate',
      'Get insurance policy copy'
    ],
    category: 'Insurance',
    status: 'Eligible'
  },
  {
    name: 'Soil Health Card',
    fullName: 'Soil Health Card Scheme',
    benefit: 'Free soil testing',
    description: 'Get detailed soil health report and recommendations',
    eligibility: [
      'All farmers',
      'One card per land holding',
      'Updated every 2-3 years'
    ],
    documents: [
      'Aadhaar Card',
      'Land records',
      'Mobile number'
    ],
    steps: [
      'Visit nearest Krishi Vigyan Kendra (KVK)',
      'Submit soil sample from your field',
      'Provide land details',
      'Receive Soil Health Card in 15-30 days',
      'Get fertilizer recommendations'
    ],
    category: 'Advisory',
    status: 'Eligible'
  },
  {
    name: 'KCC',
    fullName: 'Kisan Credit Card',
    benefit: 'Credit up to ₹3 lakh',
    description: 'Easy crop loans at subsidized interest rates',
    eligibility: [
      'Individual/joint farmers',
      'Tenant farmers and sharecroppers',
      'Self Help Groups'
    ],
    documents: [
      'Aadhaar Card',
      'Land documents',
      'Passport size photos',
      'Income proof'
    ],
    steps: [
      'Visit nearest bank branch',
      'Fill KCC application form',
      'Submit required documents',
      'Bank verification of documents',
      'Get KCC with credit limit'
    ],
    category: 'Credit',
    status: 'Apply Now'
  }
];

export default function GovernmentSchemes({ onBack }: GovernmentSchemesProps) {
  const [selectedScheme, setSelectedScheme] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-orange-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-orange-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Government Schemes</h1>
            <p className="text-sm text-orange-100">Subsidies & Benefits</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-90">Eligible Schemes</p>
                <p className="text-3xl mt-1">{schemes.length}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Potential Benefit</p>
                <p className="text-3xl mt-1">₹6K+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schemes List */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-800">Available Schemes</h2>
          
          {schemes.map((scheme, index) => (
            <Card 
              key={index}
              className="shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedScheme(selectedScheme === index ? null : index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{scheme.name}</CardTitle>
                      <p className="text-xs text-gray-600 mt-1">{scheme.fullName}</p>
                      <p className="text-sm text-green-700 mt-1">{scheme.benefit}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={
                      scheme.status === 'Eligible' ? 'bg-green-600' : 'bg-blue-600'
                    }>
                      {scheme.status}
                    </Badge>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedScheme === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              </CardHeader>

              {selectedScheme === index && (
                <CardContent className="space-y-4 border-t border-gray-200 pt-4">
                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-700">{scheme.description}</p>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h4 className="text-sm text-gray-800 mb-2">Eligibility Criteria</h4>
                    <div className="space-y-1">
                      {scheme.eligibility.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h4 className="text-sm text-gray-800 mb-2">Required Documents</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {scheme.documents.map((doc, idx) => (
                        <div key={idx} className="p-2 bg-blue-50 rounded text-xs text-gray-700">
                          📄 {doc}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Steps */}
                  <div>
                    <h4 className="text-sm text-gray-800 mb-2">How to Apply</h4>
                    <div className="space-y-2">
                      {scheme.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-2">
                          <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-gray-700 flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700 gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Apply Online
                    </Button>
                    <Button variant="outline" className="flex-1 border-orange-300 text-orange-700">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="border-blue-300 bg-blue-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">📞</span>
              <div>
                <p className="text-gray-800">Kisan Call Center</p>
                <p className="text-blue-700">1800-180-1551 (Toll Free)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">🏢</span>
              <div>
                <p className="text-gray-800">Visit nearest CSC or Krishi Vigyan Kendra</p>
                <p className="text-xs text-gray-600">They will help you with applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
