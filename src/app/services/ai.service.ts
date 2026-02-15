// src/app/services/ai.service.ts

import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private ai: GoogleGenAI;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: environment.apiKey
    });
  }

  async getExplanation(requirementText: string): Promise<string> {
    this.isLoadingSubject.next(true);
    
    try {
      const prompt = `You are a cybersecurity expert specializing in OWASP ASVS.

Explain this security requirement in detail:
"${requirementText}"

Provide:
1. What it means - Clear explanation
2. Why it's important - Security risks
3. How to implement - Practical steps
4. Example - Code or config example
5. Tools - Verification tools

Format your response in Markdown.`;

      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      this.isLoadingSubject.next(false);
      console.log('✅ AI Explanation received from Gemini');
      return response.text || "No response generated.";
      
    } catch (error: any) {
      this.isLoadingSubject.next(false);
      console.error('❌ Gemini Error:', error);
      return `**Error:** ${error.message || 'Unable to connect to AI'}`;
    }
  }

  async getBestPractices(requirementText: string): Promise<string> {
    this.isLoadingSubject.next(true);
    
    try {
      const prompt = `As a security expert, provide best practices for implementing this OWASP ASVS requirement:

"${requirementText}"

Include:
- Industry standard best practices
- Common mistakes to avoid
- Real-world examples

Format in Markdown.`;

      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      this.isLoadingSubject.next(false);
      return response.text || "No response generated.";
      
    } catch (error: any) {
      this.isLoadingSubject.next(false);
      return `**Error:** ${error.message}`;
    }
  }

  async getCodeExample(requirementText: string, language: string = 'C#'): Promise<string> {
    this.isLoadingSubject.next(true);
    
    try {
      const prompt = `Provide a ${language} code example demonstrating this security requirement:

"${requirementText}"

Include:
- Complete code example
- Before/After comparison
- Comments explaining security measures

Format in Markdown with code blocks.`;

      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      this.isLoadingSubject.next(false);
      return response.text || "No response generated.";
      
    } catch (error: any) {
      this.isLoadingSubject.next(false);
      return `**Error:** ${error.message}`;
    }
  }

  async getTestingGuidance(requirementText: string): Promise<string> {
    this.isLoadingSubject.next(true);
    
    try {
      const prompt = `Provide testing guidance for this security requirement:

"${requirementText}"

Include:
- Manual testing steps
- Automated testing approaches
- Recommended tools
- Test cases

Format in Markdown.`;

      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      this.isLoadingSubject.next(false);
      return response.text || "No response generated.";
      
    } catch (error: any) {
      this.isLoadingSubject.next(false);
      return `**Error:** ${error.message}`;
    }
  }
}