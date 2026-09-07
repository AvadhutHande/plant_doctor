import { useState } from 'react';
import { AlertTriangle, Bug, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

/**
 * Test Component for Error Boundary
 * Use this to verify error boundary is working correctly
 * 
 * To test:
 * 1. Add this component to a route temporarily
 * 2. Click "Trigger Error" button
 * 3. Error boundary should catch it and show fallback UI
 * 4. Click "Reload Page" or "Go to Dashboard" to recover
 */

export default function ErrorBoundaryTest() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    // This will be caught by the nearest Error Boundary
    throw new Error('Test error thrown intentionally to test Error Boundary!');
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl text-green-800">Error Boundary Test</h1>
        <p className="text-gray-600">
          This page is for testing the error boundary functionality
        </p>
      </div>

      {/* Instructions Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Bug className="w-5 h-5" />
            How to Test Error Boundary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>Click the "Trigger Error" button below</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>The app should catch the error and show a fallback UI</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>You can click "Error Details" to see the error message</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">4.</span>
              <span>Use "Reload Page" or "Go to Dashboard" to recover</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Success Indicator */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                Error Boundary is Active
              </p>
              <p className="text-sm text-green-700">
                This component is wrapped in an error boundary and protected
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Button */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Trigger Test Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            This will throw a JavaScript error to test if the error boundary catches it properly.
          </p>

          <button
            onClick={() => setShouldThrowError(true)}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Bug className="w-4 h-4" />
            Trigger Error (Test Error Boundary)
          </button>

          <p className="text-xs text-gray-500">
            Note: This is safe - the error boundary will catch it and prevent the app from crashing.
          </p>
        </CardContent>
      </Card>

      {/* Additional Test Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">Other Test Scenarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              What Gets Caught:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 pl-4">
              <li>• JavaScript errors in component render methods</li>
              <li>• Errors in lifecycle methods (useEffect, etc.)</li>
              <li>• Errors in event handlers (if re-thrown)</li>
              <li>• Errors in child components</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              What Doesn't Get Caught:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 pl-4">
              <li>• Errors in event handlers (unless re-thrown)</li>
              <li>• Asynchronous errors (setTimeout, promises)</li>
              <li>• Server-side rendering errors</li>
              <li>• Errors in the error boundary itself</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          Error boundary status: <span className="font-semibold text-green-600">Active & Ready</span>
        </p>
      </div>
    </div>
  );
}
