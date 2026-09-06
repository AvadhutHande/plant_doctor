import { useState } from 'react';
import { Leaf, ArrowRight, CheckCircle2, Calculator, FileText, TrendingUp, Sprout, Users, BookOpen, ClipboardCheck, Phone, Mail, MapPin, IndianRupee, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { useFields } from '../contexts/FieldsContext';
import { useProfile } from '../contexts/ProfileContext';
import { Alert, AlertDescription } from './ui/alert';

interface FieldAwareProps {
  selectedField: {
    name: string;
    crop: string;
  };
}

export default function CarbonCredits({ selectedField }: FieldAwareProps) {
  const { getTotalAreaInGuntha } = useFields();
  const { profile } = useProfile();
  const [selectedPractice, setSelectedPractice] = useState<string>('organic');

  const totalLand = getTotalAreaInGuntha();
  const totalAcres = (totalLand / 40).toFixed(2); // 1 acre = 40 guntha

  // Carbon credit calculation factors (per acre per year)
  const carbonRates = {
    organic: 2.5, // tons CO2/acre/year
    conservation: 2.0,
    agroforestry: 3.5,
    integrated: 3.0,
  };

  const pricePerCredit = 800; // INR per carbon credit (1 credit = 1 ton CO2)

  const calculateEarnings = (practice: string) => {
    const rate = carbonRates[practice as keyof typeof carbonRates] || 2.0;
    const annualCredits = parseFloat(totalAcres) * rate;
    const annualEarnings = annualCredits * pricePerCredit;
    
    return {
      annualCredits: annualCredits.toFixed(2),
      annualEarnings: Math.round(annualEarnings),
      threeYearEarnings: Math.round(annualEarnings * 3),
      fiveYearEarnings: Math.round(annualEarnings * 5),
    };
  };

  const earnings = calculateEarnings(selectedPractice);

  const processes = [
    {
      step: 1,
      title: 'Initial Inquiry',
      description: 'Submit your interest through our platform or contact carbon credit agency',
      duration: '1-2 days',
      icon: FileText,
    },
    {
      step: 2,
      title: 'Site Visit & Assessment',
      description: 'Expert team visits your farm to assess eligibility and potential',
      duration: '1 week',
      icon: Users,
    },
    {
      step: 3,
      title: 'Soil Testing',
      description: 'Comprehensive soil analysis to measure current carbon levels',
      duration: '2-3 weeks',
      icon: ClipboardCheck,
    },
    {
      step: 4,
      title: 'Documentation',
      description: 'Prepare and submit required documents including land records',
      duration: '1-2 weeks',
      icon: FileText,
    },
    {
      step: 5,
      title: 'Verification',
      description: 'Third-party verification of your farming practices and carbon sequestration',
      duration: '4-6 weeks',
      icon: CheckCircle2,
    },
    {
      step: 6,
      title: 'Certification',
      description: 'Receive official carbon credit certification',
      duration: '2-4 weeks',
      icon: Award,
    },
    {
      step: 7,
      title: 'Start Earning',
      description: 'Credits are issued annually based on verified carbon sequestration',
      duration: 'Ongoing',
      icon: TrendingUp,
    },
  ];

  const eligiblePractices = [
    {
      name: 'Organic Farming',
      key: 'organic',
      credits: '2.5 credits/acre/year',
      description: 'No synthetic chemicals, focus on natural fertilizers and pest control',
      icon: Leaf,
      color: 'text-green-600 bg-green-50',
    },
    {
      name: 'Conservation Tillage',
      key: 'conservation',
      credits: '2.0 credits/acre/year',
      description: 'Minimum soil disturbance to preserve soil structure and carbon',
      icon: Sprout,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      name: 'Agroforestry',
      key: 'agroforestry',
      credits: '3.5 credits/acre/year',
      description: 'Integrating trees with crops for maximum carbon capture',
      icon: Sprout,
      color: 'text-teal-600 bg-teal-50',
    },
    {
      name: 'Integrated Farming',
      key: 'integrated',
      credits: '3.0 credits/acre/year',
      description: 'Combination of crops, livestock, and sustainable practices',
      icon: Sprout,
      color: 'text-blue-600 bg-blue-50',
    },
  ];

  const requiredDocuments = [
    '7/12 Extract (Land Records)',
    '8A Extract (Ownership Proof)',
    'Aadhaar Card',
    'PAN Card',
    'Bank Account Details',
    'Passport Size Photos',
    'Soil Test Reports (if available)',
    'Farm Location Map',
  ];

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl text-green-800">Carbon Credits</h1>
        </div>
        <p className="text-gray-600">Earn money while protecting the environment</p>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {selectedField.name} • {selectedField.crop}
        </Badge>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="apply">Apply</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* What are Carbon Credits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-green-600" />
                What are Carbon Credits?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-gray-700">
                Carbon credits are certificates representing the reduction or removal of one ton of carbon dioxide (CO2) from the atmosphere. 
                Farmers can earn these credits by adopting sustainable farming practices that capture and store carbon in the soil.
              </p>
              <div className="space-y-2">
                <p className="font-medium text-green-800">Key Benefits:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Additional income stream from your existing farmland</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Improve soil health and fertility naturally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reduce farming costs through sustainable practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Contribute to fighting climate change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Access to premium markets for sustainable produce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Tax benefits and government incentives</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowRight className="w-5 h-5 text-blue-600" />
                How It Works - Complete Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {processes.map((process, index) => {
                const Icon = process.icon;
                return (
                  <div key={process.step} className="relative">
                    {index < processes.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200" />
                    )}
                    <div className="flex gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{process.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {process.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{process.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Eligible Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sprout className="w-5 h-5 text-green-600" />
                Eligible Farming Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {eligiblePractices.map((practice) => {
                const Icon = practice.icon;
                return (
                  <div
                    key={practice.key}
                    className={`p-4 rounded-lg border-2 ${
                      profile.farmingType.toLowerCase() === practice.key
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${practice.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{practice.name}</h4>
                          <Badge className="bg-green-600 text-white">{practice.credits}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{practice.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Success Story */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-green-600" />
                Success Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                  RM
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Ramesh Mali, Ahmednagar</h4>
                  <p className="text-sm text-gray-600 mb-2">25 Acres • Organic Cotton Farmer</p>
                  <p className="text-sm text-gray-700 mb-2">
                    "I started carbon credit farming 3 years ago. Not only am I earning an additional ₹1.2 lakhs per year, 
                    but my soil quality has improved dramatically. My cotton yield increased by 20% and input costs reduced by 30%."
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-700">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-semibold">₹1.2L/year</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-700">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">20% yield increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">How long does certification take?</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    The complete certification process typically takes 3-4 months from initial inquiry to certification. 
                    However, you can start implementing eligible practices immediately.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm">Do I need to change my entire farming method?</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    No, you can start with gradual changes. Even implementing practices like reduced tillage, 
                    cover cropping, or organic inputs on part of your land can qualify you for carbon credits.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm">Is there any upfront cost?</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Most carbon credit programs have minimal or no upfront costs. Initial assessment and soil testing 
                    are often covered by the certifying agency. You only pay for any changes to your farming practices.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm">Can I sell carbon credits on my own?</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Carbon credits must be verified and certified by accredited agencies. Once certified, 
                    you can sell through carbon credit exchanges or aggregators who handle the transactions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-sm">What if I want to stop the program?</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Most programs have a minimum commitment period (usually 5 years), but you can continue or 
                    discontinue after that. However, sustainable practices often become more profitable over time.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calculator Tab */}
        <TabsContent value="calculator" className="space-y-4 mt-4">
          <Alert>
            <Calculator className="w-4 h-4" />
            <AlertDescription>
              Estimate your potential earnings based on {totalLand} guntha ({totalAcres} acres) of land
            </AlertDescription>
          </Alert>

          {/* Practice Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Your Farming Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eligiblePractices.map((practice) => (
                <button
                  key={practice.key}
                  onClick={() => setSelectedPractice(practice.key)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedPractice === practice.key
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{practice.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{practice.credits}</p>
                    </div>
                    {selectedPractice === practice.key && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Earnings Breakdown */}
          <Card className="bg-gradient-to-br from-green-50 to-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IndianRupee className="w-5 h-5 text-green-600" />
                Your Estimated Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Your Land</p>
                  <p className="text-2xl font-bold text-green-700">{totalAcres}</p>
                  <p className="text-xs text-gray-500">Acres</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Annual Credits</p>
                  <p className="text-2xl font-bold text-blue-700">{earnings.annualCredits}</p>
                  <p className="text-xs text-gray-500">Tons CO2</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">1 Year Earnings</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{earnings.annualEarnings.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>

                <div className="p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">3 Years Earnings</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{earnings.threeYearEarnings.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>

                <div className="p-4 bg-white rounded-lg border-2 border-green-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">5 Years Earnings</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{earnings.fiveYearEarnings.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                <p className="font-medium mb-1">Note:</p>
                <p>Estimates based on ₹{pricePerCredit}/credit. Actual earnings may vary based on market rates, 
                verification results, and implementation quality. Credits are issued annually after verification.</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Beyond Monetary Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Improved Soil Health</p>
                  <p className="text-gray-600">15-30% increase in soil organic matter over 5 years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Reduced Input Costs</p>
                  <p className="text-gray-600">20-40% savings on fertilizers and pesticides</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Premium Market Access</p>
                  <p className="text-gray-600">10-25% price premium for certified sustainable produce</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Water Conservation</p>
                  <p className="text-gray-600">Better water retention and reduced irrigation needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apply Tab */}
        <TabsContent value="apply" className="space-y-4 mt-4">
          {/* Eligibility Criteria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Minimum 2 acres (80 guntha) of agricultural land</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Clear land ownership documents (7/12, 8A)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Willingness to adopt and maintain sustainable practices for minimum 5 years</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Active cultivation in the last 2 years</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Bank account for receiving payments</span>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="font-medium">You are eligible!</p>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Based on your profile, you have {totalLand} guntha ({totalAcres} acres) of land and meet the basic criteria.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-blue-600" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardCheck className="w-5 h-5 text-green-600" />
                How to Apply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Register Interest</p>
                    <p className="text-gray-600 mt-1">Fill the expression of interest form with your basic details and land information</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Gather Documents</p>
                    <p className="text-gray-600 mt-1">Collect all required documents listed above. Get copies certified if needed</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Schedule Site Visit</p>
                    <p className="text-gray-600 mt-1">Our team will contact you within 3-5 days to schedule a farm visit</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Submit Application</p>
                    <p className="text-gray-600 mt-1">Complete the formal application with all documents after initial assessment</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Start Implementation</p>
                    <p className="text-gray-600 mt-1">Begin implementing recommended sustainable practices with our guidance</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Start Your Application
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                Get Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone Support</p>
                  <p className="text-sm text-gray-600">1800-123-4567 (Toll Free)</p>
                  <p className="text-xs text-gray-500 mt-1">Mon-Sat, 9 AM - 6 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Mail className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Support</p>
                  <p className="text-sm text-gray-600">carboncredits@smartfarming.in</p>
                  <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Regional Office</p>
                  <p className="text-sm text-gray-600">Agriculture Department, {profile.village}</p>
                  <p className="text-xs text-gray-500 mt-1">Visit for in-person assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <button className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-shadow flex items-center justify-between">
                <span className="text-gray-700">Download Carbon Credit Brochure</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-shadow flex items-center justify-between">
                <span className="text-gray-700">Watch Video Tutorial (Hindi)</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-shadow flex items-center justify-between">
                <span className="text-gray-700">Find Nearby Training Center</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-shadow flex items-center justify-between">
                <span className="text-gray-700">Connect with Certified Farmers</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
