export interface GeminiTextPart {
  text: string;
}

export interface GeminiContent {
  parts: GeminiTextPart[];
  role: string; // "model" ou "user"
}

export interface GeminiModel {
  name: string;
  displayName: string;
  description: string;
  version: string;
}

export interface ListModelsResponse {
  models: GeminiModel[];
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