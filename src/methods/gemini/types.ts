export interface GeminiTextPart {
  text: string;
}

export interface GeminiContent {
  parts: GeminiTextPart[];
  role: string; // "model" ou "user"
}

export interface GeminiCandidate {
  content: GeminiContent;
  finishReason: string;
  index: number;
  safetyRatings: any[]; 
}

export interface GeminiApiResponse {
  candidates: GeminiCandidate[];
}