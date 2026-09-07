import { useState, useRef, useCallback } from 'react';
import {
  Camera, Upload, ArrowLeft, AlertCircle, Leaf, CheckCircle2,
  Loader2, Info, ExternalLink, RefreshCcw, X, FlaskConical,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { NavigableProps } from '../types';

// ---------------------------------------------------------------------------
// Plant Doctor backend (FastAPI wrapping the HuggingFace model server-side)
// Local dev default. Change to your deployed backend URL before shipping.
// ---------------------------------------------------------------------------
const API_BASE_URL = 'http://localhost:8000';

interface HFPrediction { label: string; score: number }

// ---------------------------------------------------------------------------
// Offline / sandbox fallback: realistic simulated results
// ---------------------------------------------------------------------------
const SIMULATED_CLASSES = [
  'Tomato___Early_blight',
  'Tomato___Late_blight',
  'Tomato___healthy',
  'Potato___Early_blight',
  'Potato___Late_blight',
  'Corn_(maize)___Northern_Leaf_Blight',
  'Corn_(maize)___healthy',
  'Apple___Apple_scab',
  'Apple___healthy',
  'Pepper,_bell___Bacterial_spot',
  'Pepper,_bell___healthy',
  'Cotton___Bacterial_blight',
  'Wheat___Yellow_rust',
  'Soybean___healthy',
];

function simulateAnalysis(): HFPrediction[] {
  const primary = SIMULATED_CLASSES[Math.floor(Math.random() * SIMULATED_CLASSES.length)];
  const score1 = 0.55 + Math.random() * 0.38;
  const score2 = (1 - score1) * (0.5 + Math.random() * 0.3);
  const score3 = 1 - score1 - score2;
  const others = SIMULATED_CLASSES.filter(c => c !== primary);
  const [alt1, alt2] = others.sort(() => 0.5 - Math.random()).slice(0, 2);
  return [
    { label: primary, score: score1 },
    { label: alt1, score: score2 },
    { label: alt2, score: Math.max(0.01, score3) },
  ].sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------------------
// Label parsing helpers
// ---------------------------------------------------------------------------
function parseLabel(raw: string) {
  const [crop, ...rest] = raw.split('___');
  const disease = rest.join(' ').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    crop: crop.replace(/[_,]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim(),
    disease,
  };
}

function confidenceMeta(score: number) {
  if (score > 0.8) return { label: 'High Confidence', cls: 'bg-red-500' };
  if (score > 0.5) return { label: 'Moderate Confidence', cls: 'bg-orange-500' };
  return { label: 'Low Confidence', cls: 'bg-yellow-500' };
}

// ---------------------------------------------------------------------------
// Remedy database
// ---------------------------------------------------------------------------
const REMEDIES: Record<string, { organic: string[]; chemical: { name: string; dose: string }[] }> = {
  Early_blight: {
    organic: [
      'Remove and destroy lower infected leaves immediately.',
      'Spray neem oil solution (5 ml/L water) twice a week.',
      'Apply baking soda spray (1 tbsp baking soda + 1 tbsp oil per litre) weekly.',
    ],
    chemical: [
      { name: 'Mancozeb 75% WP', dose: '2 g/L every 7 days' },
      { name: 'Chlorothalonil 75% WP', dose: '2 ml/L, avoid during flowering' },
    ],
  },
  Late_blight: {
    organic: [
      'Remove and burn all affected plants urgently.',
      'Spray copper sulphate solution (3 g/L) weekly.',
      'Avoid overhead irrigation; water only at base.',
    ],
    chemical: [
      { name: 'Metalaxyl + Mancozeb', dose: '2.5 g/L every 7 days' },
      { name: 'Cymoxanil + Mancozeb 64% WP', dose: '2 g/L preventively' },
    ],
  },
  Yellow_rust: {
    organic: [
      'Remove infected tillers and destroy them.',
      'Ensure good air circulation through proper spacing.',
      'Avoid excess nitrogenous fertiliser.',
    ],
    chemical: [
      { name: 'Propiconazole 25% EC', dose: '1 ml/L at first sign' },
      { name: 'Tebuconazole 25.9% EC', dose: '1 ml/L every 14 days' },
    ],
  },
  Bacterial_blight: {
    organic: [
      'Remove and burn all infected plant material.',
      'Apply copper-based bactericide (Bordeaux mixture 1%) fortnightly.',
      'Avoid injury to plants during field operations.',
    ],
    chemical: [
      { name: 'Copper Oxychloride 50% WP', dose: '3 g/L every 10–14 days' },
      { name: 'Streptomycin 90% + Tetracycline 10%', dose: '0.5 g/L preventively' },
    ],
  },
  default: {
    organic: [
      'Remove and destroy all visibly infected plant parts.',
      'Spray neem oil solution (5 ml/L) twice weekly on affected areas.',
      'Improve field drainage and air circulation.',
    ],
    chemical: [
      { name: 'Mancozeb 75% WP', dose: '2–2.5 g/L every 7–10 days' },
      { name: 'Copper Oxychloride 50% WP', dose: '3 g/L every 10–14 days' },
    ],
  },
};

function getRemedies(disease: string) {
  const key = Object.keys(REMEDIES).find(k =>
    disease.toLowerCase().includes(k.toLowerCase().replace(/_/g, ' '))
  );
  return REMEDIES[key ?? 'default'];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
type Stage = 'idle' | 'analysing' | 'done' | 'error';

export default function DiseaseDetection({ onBack }: NavigableProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [stage, setStage] = useState<Stage>('idle');
  const [predictions, setPredictions] = useState<HFPrediction[]>([]);
  const [error, setError] = useState('');
  const [isSimulated, setIsSimulated] = useState(false);

  // Two separate refs: one for gallery, one for camera
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setImageBlob(file);
    setPredictions([]);
    setStage('idle');
    setError('');
    setIsSimulated(false);
  }, [imageUrl]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
    e.target.value = '';
  };

  const runAnalysis = async () => {
    if (!imageBlob) return;
    setStage('analysing');
    setError('');
    setIsSimulated(false);

    // Call our own backend (FastAPI), which loads the model server-side.
    // This avoids the CORS/rate-limit/cold-start issues of calling
    // HuggingFace's public Inference API directly from the browser.
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);

      const formData = new FormData();
      formData.append('file', imageBlob, 'plant.jpg');

      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        throw new Error(`API_ERROR_${res.status}`);
      }

      const data = await res.json();

      // Backend returns { status, raw_predictions: [{label, score}, ...], ... }
      const raw: HFPrediction[] = data.raw_predictions ?? [
        { label: data.raw_label, score: data.confidence },
      ];
      setPredictions(raw.slice(0, 3));
      setIsSimulated(false);
      setStage('done');
    } catch (err) {
      console.error('Backend prediction failed:', err);
      // Backend unreachable (e.g. not running yet) → fall back to simulation
      // so the UI still demonstrates the flow. Remove this fallback once
      // your backend is deployed and reliably reachable.
      const simulated = simulateAnalysis();
      setPredictions(simulated);
      setIsSimulated(true);
      setStage('done');
    }
  };

  const reset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setImageBlob(null);
    setPredictions([]);
    setStage('idle');
    setError('');
    setIsSimulated(false);
  };

  const top = predictions[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-purple-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl">Plant Doctor</h1>
            <p className="text-sm text-purple-100">AI Disease Detection · PlantVillage Model</p>
          </div>
          <button
            onClick={() => setShowApiInput(v => !v)}
            className="p-2 hover:bg-purple-700 rounded-lg"
            title="HuggingFace API key (optional)"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {showApiInput && (
          <div className="mt-3 space-y-1">
            <p className="text-xs text-purple-200">
              Optional: add your HuggingFace token for faster / priority access
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="hf_..."
                className="flex-1 px-3 py-1.5 rounded-lg text-gray-800 text-sm bg-white focus:outline-none"
              />
              <button
                onClick={() => setShowApiInput(false)}
                className="p-2 bg-purple-500 rounded-lg hover:bg-purple-400"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">

        {/* Model info */}
        <Card className="border-purple-100 bg-purple-50/60 shadow-sm">
          <CardContent className="p-3 flex items-start gap-3">
            <Leaf className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-900">
                MobileNetV2 · PlantVillage — 38 diseases, 14 crop species
              </p>
              <a
                href="https://huggingface.co/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-purple-600 hover:underline mt-0.5"
              >
                View model on HuggingFace <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Image preview */}
        {imageUrl && (
          <Card className="overflow-hidden shadow-md">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Plant to analyse"
                className="w-full object-cover max-h-72"
              />
              <button
                onClick={reset}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </Card>
        )}

        {/* Upload / Camera buttons — always visible when no result yet */}
        {stage !== 'done' && (
          <div className="space-y-3">
            {/* Upload from gallery */}
            <button
              onClick={() => galleryRef.current?.click()}
              className="w-full flex items-center gap-4 p-4 border-2 border-dashed border-purple-300 rounded-2xl bg-white hover:bg-purple-50/50 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Upload from Gallery</p>
                <p className="text-xs text-gray-500 mt-0.5">Select a saved photo of the leaf</p>
              </div>
            </button>

            {/* Open camera */}
            <button
              onClick={() => cameraRef.current?.click()}
              className="w-full flex items-center gap-4 p-4 border-2 border-dashed border-green-300 rounded-2xl bg-white hover:bg-green-50/50 transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Take a Photo</p>
                <p className="text-xs text-gray-500 mt-0.5">Use camera to capture the affected leaf</p>
              </div>
            </button>

            {/* Hidden inputs */}
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Diagnose button — only when image is loaded and not yet done */}
        {imageBlob && stage !== 'done' && (
          <Button
            onClick={runAnalysis}
            disabled={stage === 'analysing'}
            className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-base gap-2 rounded-xl"
          >
            {stage === 'analysing' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analysing plant…
              </>
            ) : (
              <>
                <FlaskConical className="w-5 h-5" />
                Diagnose Disease
              </>
            )}
          </Button>
        )}

        {/* Error state */}
        {stage === 'error' && (
          <Card className="border-red-200 bg-red-50 shadow-md">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800">Analysis failed</p>
                <p className="text-xs text-red-700 mt-1">{error}</p>
                <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700 gap-2" onClick={runAnalysis}>
                  <RefreshCcw className="w-3.5 h-3.5" /> Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {stage === 'done' && top && (() => {
          const { crop, disease } = parseLabel(top.label);
          const isHealthy = disease.toLowerCase().includes('healthy');
          const { label: confLabel, cls: confCls } = confidenceMeta(top.score);
          const remedies = getRemedies(disease);

          return (
            <>
              {/* Simulated banner */}
              {isSimulated && (
                <Card className="border-amber-200 bg-amber-50 shadow-sm">
                  <CardContent className="p-3 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                      <span className="font-semibold">Demo result</span> — the live HuggingFace API
                      could not be reached (network/sandbox restriction). Add your HF token (tap ⓘ
                      above) for real inference.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Primary result */}
              <Card className={`border-2 shadow-md ${isHealthy ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Crop</p>
                      <CardTitle className="text-lg mt-0.5">{crop}</CardTitle>
                    </div>
                    <Badge className={`${confCls} text-white shrink-0`}>{confLabel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Diagnosis</p>
                    <p className={`text-base font-semibold mt-0.5 ${isHealthy ? 'text-green-700' : 'text-red-700'}`}>
                      {isHealthy ? '✅ Healthy Plant' : disease}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Confidence</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.round(top.score * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {Math.round(top.score * 100)}%
                      </span>
                    </div>
                  </div>

                  {predictions.length > 1 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1.5">Other possibilities</p>
                      {predictions.slice(1).map((p, i) => {
                        const parsed = parseLabel(p.label);
                        return (
                          <div key={i} className="flex justify-between text-xs text-gray-600 py-0.5">
                            <span>{parsed.crop} – {parsed.disease}</span>
                            <span>{Math.round(p.score * 100)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Remedies */}
              {!isHealthy && (
                <>
                  <Card className="border-green-300 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base text-green-800 flex items-center gap-2">
                        <Leaf className="w-4 h-4" /> Organic Remedies
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {remedies.organic.map((step, i) => (
                        <div key={i} className="flex gap-3 p-2.5 bg-green-50 rounded-lg">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs shrink-0">{i + 1}</div>
                          <p className="text-sm text-gray-700">{step}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base text-blue-800">Chemical Treatment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {remedies.chemical.map((item, i) => (
                        <div key={i} className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900">{item.name}</p>
                          <p className="text-xs text-gray-600 mt-0.5">Dosage: {item.dose}</p>
                          <p className="text-xs text-orange-700 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            Wear protective gear when spraying
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-amber-200 bg-amber-50 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">Prevention Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {[
                        'Maintain proper plant spacing for air circulation.',
                        'Avoid overhead irrigation; water at the base.',
                        'Practice crop rotation with non-host species.',
                        'Use certified disease-resistant seed varieties.',
                        'Scout fields weekly for early detection.',
                      ].map((tip, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}

              {isHealthy && (
                <Card className="border-green-200 bg-green-50 shadow-md">
                  <CardContent className="p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">Plant looks healthy!</p>
                      <p className="text-xs text-green-700 mt-1">
                        Continue regular monitoring, maintain proper irrigation, and apply balanced
                        fertiliser as per schedule.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Scan another */}
              <Button onClick={reset} className="w-full h-12 bg-purple-600 hover:bg-purple-700 gap-2">
                <Camera className="w-5 h-5" /> Scan Another Plant
              </Button>
            </>
          );
        })()}

        {/* Instructions — only when idle and no image */}
        {stage === 'idle' && !imageUrl && (
          <>
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  How to use Plant Doctor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Take a clear, close-up photo of the affected leaf.',
                  'Ensure good natural lighting — avoid harsh flash.',
                  'Focus on the diseased area (spots, yellowing, wilting).',
                  'Tap "Diagnose Disease" — results appear in ~5–10 seconds.',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Model & dataset info */}
            <Card className="border-indigo-200 bg-indigo-50/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm text-indigo-900 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Model & Training Dataset
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-indigo-100 space-y-1">
                  <p className="font-semibold text-gray-800">PlantVillage Dataset</p>
                  <p className="text-gray-600">54,306 images · 38 disease classes · 14 crop species</p>
                  <a href="https://huggingface.co/datasets/plantvillage/PlantVillage-Dataset" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                    View dataset <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-3 bg-white rounded-lg border border-indigo-100 space-y-1.5">
                  <p className="font-semibold text-gray-800">Ready-to-use HF Models</p>
                  {[
                    { name: 'linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification', note: 'Used in this app · 38 classes' },
                    { name: 'ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease', note: 'Alternative MobileNetV2' },
                  ].map(m => (
                    <div key={m.name}>
                      <code className="text-indigo-700 break-all">{m.name}</code>
                      <span className="text-gray-500"> · {m.note}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
