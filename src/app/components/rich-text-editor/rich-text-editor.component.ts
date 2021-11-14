import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Paragraph from 'editorjs-paragraph-with-alignment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import EditorJS from '@editorjs/editorjs';
import { debounceTime, skip } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const editorjsConfig = {
  autofocus: true,
  holder: 'editorjs',
  tools: {
    marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M'
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true
    },
    header: {
      class: Header,
      inlineToolbar: [
        'link', 'bold', 'italic'
      ]
    },
    list: {
      class: List,
      inlineToolbar: [
        'link', 'bold'
      ]
    },
    embed: {
      class: Embed,
      inlineToolbar: false,
      config: {
        services: {
          youtube: true,
          coub: true
        }
      }
    }
  }
}

const RICH_TEXT_VALUE_ACCESOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichTextEditorComponent),
  multi: true
}

@UntilDestroy()
@Component({
  selector: 'rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [RICH_TEXT_VALUE_ACCESOR]
})
export class RichTextEditorComponent implements OnInit, ControlValueAccessor {
  editor: EditorJS;
  editorObserver: MutationObserver;

  @Input()
  value: string;

  @Input()
  placeholder?: string;

  disabled: boolean;
  onChange = (_: any) => { };
  onTouch = () => { };

  constructor() { }

  commitValue(event: any) {
    this.onChange(event.target.value);
  }

  ngOnInit() {
  }

  saveEditorData(): void {
    this.editor.save().then((outputData) => {
      this.value = JSON.stringify(outputData, null, 2);
      this.onChange(this.value);
    })
  }

  ngOnDestroy(): void {
    this.editorObserver.disconnect();
  }

  detectEditorChanges(): Observable<any> {
    return new Observable(observer => {

      const editorDom = document.querySelector('#editorjs');
      const config = { attributes: true, childList: true, subtree: true };

      this.editorObserver = new MutationObserver((mutation) => {
        observer.next(mutation);
      })

      this.editorObserver.observe(editorDom, config);

    })
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }

    const data = this.value ? JSON.parse(this.value) : '';
    this.editor = new EditorJS(
      {
        ...editorjsConfig,
        placeholder: this.placeholder,
        data
      }
    );

    this.detectEditorChanges().pipe(
      debounceTime(200),
      skip(1),
      untilDestroyed(this)
    ).subscribe(data => {
      this.editor.save().then((outputData) => {
        this.value = JSON.stringify(outputData, null, 2);
        this.onChange(this.value);
      });
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

}
