// src/app/pipes/markdown.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    
    try {
      // تحويل Markdown إلى HTML
      const html = marked.parse(value);
      // تأمين HTML من XSS attacks
      return this.sanitizer.sanitize(1, html) || '';
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return value;
    }
  }
}