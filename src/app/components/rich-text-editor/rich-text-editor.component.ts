import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const RICH_TEXT_VALUE_ACCESOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichTextEditorComponent),
  multi: true
}

@Component({
  selector: 'rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [RICH_TEXT_VALUE_ACCESOR]
})
export class RichTextEditorComponent implements OnInit, ControlValueAccessor {
  @Input()
  value: string;
  disabled: boolean;
  onChange = (_: any) => { };
  onTouch = () => { };

  constructor() { }

  commitValue(event: any) {
    this.onChange(event.target.value);
  }

  ngOnInit() {
  }

  onInput(value: string) {
    this.value = value;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
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
