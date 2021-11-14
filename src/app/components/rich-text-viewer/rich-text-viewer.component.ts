import { Component, Input, OnInit } from '@angular/core';
import * as editorjsHtml from 'editorjs-html';

@Component({
  selector: 'rich-text-viewer',
  templateUrl: './rich-text-viewer.component.html',
  styleUrls: ['./rich-text-viewer.component.scss']
})
export class RichTextViewerComponent implements OnInit {
  @Input()
  content: string;

  htmlContent: string = '';

  constructor() { }

  ngOnInit() {
    const parser = editorjsHtml();
    const json = JSON.parse(this.content);
    this.htmlContent = parser.parse(json);
  }
}
