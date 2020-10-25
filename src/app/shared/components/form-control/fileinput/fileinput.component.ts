import { Component, OnInit, ViewChild, ElementRef, OnDestroy, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileDetail } from 'app/shared/models/filedetail.model';

@Component({
  selector: 'shared-fileinput',
  templateUrl: './fileinput.component.html',
  styleUrls: ['./fileinput.component.css'],
  providers: [     
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => FileInputComponent),
      multi: true     
    }   
  ]
})
export class FileInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('fileinput')
  fileInputElement: ElementRef<any>;

  @ViewChild('customFileInput')
  fileLabelElement: ElementRef<any>;

  @Input() files: FileDetail[] = [];
  @Input() multiple: boolean = false;
  @Input() fileTypes: string[] = [];

  onChanged = (files: File[] | File) => {};
  onTouched = () => {};

  disabled: boolean = false;
  uploadFiles: File[] = [];
  fileName: string = 'Choose File';

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  writeValue(value: any) {
    if (value == null)
      this.uploadFiles = [];
    else 
      this.uploadFiles = value;

    this.updateFileName();
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleChange(event: any) {
    this.onTouched();
    const fileList: FileList = event.target.files;
    if (fileList.length == 0)
      return;

    let newFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newFiles.push(fileList[i]);
    }

    // if not multiple, just take first file
    if (!this.multiple)
      newFiles = [newFiles[0]];
  
    this.saveFiles(newFiles);
    this.updateFileName();
    this.onChanged(this.uploadFiles); 
  }

  viewFile(index: number) {      
    var fileURL = URL.createObjectURL(this.uploadFiles[index]);
    window.open(fileURL);
  }

  removeFile(index: number) {
    this.onTouched();
    this.files.splice(index, 1);
    this.updateFileName();
    this.onChanged(this.uploadFiles);
  }

  removeUploadFile(index: number) {
    this.onTouched();
    this.uploadFiles.splice(index, 1);
    this.updateFileName();
    this.onChanged(this.uploadFiles);
  }
  
  saveFiles(newFiles: File[]) {
    const newFileNames = newFiles.map(x => x.name);
    // remove duplicates for uploadFiles
    for (let i = 0; i < this.uploadFiles.length; i++) {
      if (newFileNames.includes(this.uploadFiles[i].name)) {
        this.uploadFiles.splice(i, 1);
      }
    }

    // remove duplicates for files
    for (let i = 0; i < this.files.length; i++) {
      if (newFileNames.includes(this.files[i].name)) {
        this.files.splice(i, 1);
      }
    }

    // insert new files
    this.uploadFiles = this.uploadFiles.concat(newFiles);
  }

  updateFileName() {
    const total = this.uploadFiles.length + this.files.length;
    let fileName = '';

    if (this.uploadFiles.length !== 0) {
      fileName = this.uploadFiles[0].name;
    } else if (this.files.length !== 0) {
      fileName = this.files[0].name;
    }

    if (total === 0)
      this.fileName = 'Choose File';
    else
      this.fileName = total > 1 ? total + ' selected' : fileName;
  }

  trackByFn(index: number) {
    return index;
  }
}
