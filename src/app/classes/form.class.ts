import { HostListener, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  FormArray,
  ValidatorFn,
  ValidationErrors,
  Validators,
  AsyncValidatorFn,
} from '@angular/forms';
import { delay } from 'rxjs/operators';
import { SubscriptionHelper } from './subscriptions-helper.class';
import { Injectable } from '@angular/core';
import { KnxForm } from './interfaces/helper.interface';

export interface IFormFileError {
  size?: string;
  filetype?: string;
  filename?: string;
  image?: {
    width?: string;
    height?: string;
    aspectRatio?: string;
  };
}

export interface FormFileControl {
  file: File | null;
  filename: string | null;
  filetype: string | null;
  path: string | null;
  readAsDataURL: ArrayBuffer | string | null;
  fileRead: ProgressEvent<FileReader> | null;
  size: number | null;
  downloadUrl: string | null;
}
export interface IFormFile {
  control: FormGroup;
  isUploading: boolean;
  newFile: boolean;
  percentage?: number;
  onload?: (instance: IFormFile, ev: ProgressEvent<FileReader>) => void;
  error?: IFormFileError;
}

@Injectable()
export class KnxReactiveForm extends SubscriptionHelper implements KnxForm {
  form!: FormGroup;
  isSubmitted = false;
  isSubmitting = false;
  isEdited = false;
  beforeEditData: any;
  isEditForm = false;
  // selectedFiles: FileList;
  imageErrors: any;
  isUploading = false;
  isDeleting = false;
  _arrayField: { [key: string]: number[] } = {};
  arrayFbField: { [key: string]: <T>(data?: T) => AbstractControl } = {};
  selectedFiles: { [key: string]: IFormFile } = {};

  constructor(readonly fb: FormBuilder, readonly cd: ChangeDetectorRef) {
    super();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isEdited) {
      $event.returnValue = true;
    }
  }

  get formSubmitDisabled() {
    return this.isSubmitting || this.form.invalid;
  }

  formSubmitInnerHtml(value: string) {
    return this.isSubmitting ? '<div uk-spinner></div>' : value;
  }

  initForm(): void {
    if (this.getSubscription('form-value-change')) {
      this.unsubscribe('form-value-change');
    }
    this.beforeEditData = this.form.value;
    this.subscribe(
      'form-value-change',
      this.form.valueChanges
        .pipe(delay(10))
        .subscribe((data) => this.formValueChanges(data))
    );
  }

  setValue(field: string, value: any) {
    this.form.controls[field].setValue(value);
  }

  formValueChanges(data: any) {
    this.isEdited = true;
  }

  addFieldValueChanges(field: string, event: (data: any) => void) {
    this.subscribe(
      `form-field-${field}-value-change`,
      this.field(field)
        .valueChanges.pipe(delay(10))
        .subscribe((data) => event(data))
    );
  }

  destroyFormHelper(): void {
    // if (Object.keys(this.fieldValueChangeSubscription).length > 0) {
    //   for (let s of Object.values(this.fieldValueChangeSubscription)) {
    //     if (s) s.unsubscribe();
    //   }
    // }
    this.unsubscribeAll();
  }

  onResetClick(event: any) {
    this.resetFormToOld();
  }

  fieldValidatorError(field: string): boolean {
    return this.field(field).touched && !this.field(field).valid;
  }

  fieldValidatorSuccess(field: string): boolean {
    return this.field(field).touched && this.field(field).valid;
  }

  fieldValid(field: string) {
    const f = this.field(field);
    return !(!f.valid && f.touched);
  }

  groupFieldValid(group: string, field: string) {
    const f = this.groupFields(group).controls[field];
    return !(!f.valid && f.touched);
  }

  refGroupFieldValid(group: FormGroup | AbstractControl, field: string) {
    const f = (group as FormGroup).controls[field];
    return !(!f.valid && f.touched);
  }

  arrayFieldValid(arrayField: string, id: number) {
    const array = (this.field(arrayField) as FormArray).at(id);
    return !(!array.valid && array.touched);
  }

  groupArrayFieldValid(arrayField: string, id: number, groupField: string) {
    const array = (this.field(arrayField) as FormArray).at(id) as FormGroup;
    return !(
      !array.controls[groupField].valid && array.controls[groupField].touched
    );
  }

  field(field: string): AbstractControl {
    return this.form.controls[field];
  }

  groupFields(field: string): FormGroup {
    return this.field(field) as FormGroup;
  }

  arrayFields(field: string): FormArray {
    return this.field(field) as FormArray;
  }

  groupField(groupField: string, field: string): AbstractControl {
    return (this.field(groupField) as FormGroup).get(field)!;
  }

  refGroupField(group: FormGroup | AbstractControl, field: string) {
    return (group as FormGroup).controls[field];
  }

  arrayField(arrayField: string, id: number): AbstractControl {
    return (this.field(arrayField) as FormArray).at(id);
  }

  groupArrayField(
    arrayField: string,
    id: number,
    groupField: string
  ): AbstractControl {
    return ((this.field(arrayField) as FormArray).at(id) as FormGroup).controls[
      groupField
    ];
  }

  groupArrayFields(arrayField: string, id: number): FormGroup {
    return (this.field(arrayField) as FormArray).at(id) as FormGroup;
  }

  resetFormToOld() {
    this.form.setValue(this.beforeEditData);
    this.form.markAsUntouched();
    this.isEdited = false;
  }

  setNotEdited() {
    setTimeout(() => {
      this.isEdited = false;
    }, 500);
  }

  addFileField(
    key: string,
    ev: IFormFile,
    value: FormFileControl = {
      file: null,
      filename: null,
      filetype: null,
      readAsDataURL: null,
      fileRead: null,
      path: null,
      size: null,
      downloadUrl: null,
    }
  ) {
    this.selectedFiles[key] = ev;
    this.selectedFiles[key].control.addControl(
      key,
      this.fb.group({
        file: [value.file || null, []],
        filename: [value.filename || null, []],
        filetype: [value.filetype || null, []],
        readAsDataURL: [value.readAsDataURL || null, []],
        path: [value.path || null, []],
        size: [value.size || null, []],
        downloadUrl: [value.downloadUrl || null, []],
      })
    );
    this.selectedFiles[key].control = this.selectedFiles[key].control.controls[
      key
    ] as FormGroup;
    // console.log(key, this.selectedFiles[key]);
  }

  fileField(key: string): FormFileControl {
    if (!this.selectedFiles[key]) {
      throw Error(`[${key}] {fileField} file field not found.`);
    }
    return this.selectedFiles[key].control.value as FormFileControl;
  }

  fileFieldHasValue(key: string): boolean {
    if (!this.selectedFiles[key]) {
      throw Error(`[${key}] {fileFieldData} file field not found.`);
    }
    if (this.selectedFiles[key].newFile && this.fileField(key).readAsDataURL) {
      return true;
    }
    if (this.fileField(key).downloadUrl) {
      return true;
    }
    return false;
  }

  fileFieldData(key: string) {
    if (!this.selectedFiles[key]) {
      throw Error(`[${key}] {fileFieldData} file field not found.`);
    }
    if (this.selectedFiles[key].newFile && this.fileField(key).readAsDataURL) {
      return this.fileField(key).readAsDataURL;
    }
    if (this.fileField(key).downloadUrl) {
      return this.fileField(key).downloadUrl;
    }
    return 'assets/img/placeholder.png';
  }

  onFileChange(key: string, files: any) {
    if (!this.selectedFiles[key]) {
      throw Error(`[${key}] {onFileChange} file field not found.`);
    }
    if (!files || files.length === 0) {
      return;
    }
    if (!this.selectedFiles[key] || !this.selectedFiles[key].control) {
      return;
    }
    const [file] = files;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        // console.log(key, file);
        // console.log(key, this.selectedFiles[key]);
        this.selectedFiles[key].control.patchValue({
          file,
          filename: file.name,
          filetype: file.type,
          readAsDataURL: ev.target!.result,
          fileRead: ev,
          size: file.size,
        });
        this.selectedFiles[key].newFile = true;
        if (this.selectedFiles[key].onload) {
          this.selectedFiles[key].onload!(this.selectedFiles[key], ev);
        }

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  fileFieldClear(key: string) {
    if (!this.selectedFiles[key]) {
      throw Error(`[${key}] {onFileChange} file field not found.`);
    }
    if (!this.selectedFiles[key] || !this.selectedFiles[key].control) {
      return;
    }
    this.selectedFiles[key].control.patchValue({
      file: null,
      filename: null,
      filetype: null,
      readAsDataURL: null,
      fileRead: null,
      size: null,
      downloadUrl: null,
    });
    this.selectedFiles[key].newFile = false;
    if (this.selectedFiles[key].onload) {
      this.selectedFiles[key].onload!(this.selectedFiles[key], null as any);
    }

    // need to run CD since file load runs outside of zone
    this.cd.markForCheck();
  }

  detectFile(key: string, event: any): void {
    this.selectedFiles = event.target.files;
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    if (!this.selectedFiles[key]) {
      // this.selectedFiles[key] = {
      //     file: event.target.files[0],
      // };
    }
    // this.selectedFiles[key].file = event.target.files[0];
    // if (this.selectedFiles[key].file && this.selectedFiles[key].onload) {
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      this.selectedFiles[key].onload!(this.selectedFiles[key], ev);
      // --const imgResult = ev.target.result;
      // --const image = new Image();
      // Set the Base64 string return from FileReader as source.
      // --image.src = imgResult.toString();

      // Validate the File Height and Width.
      // --image.onload = () => {
      //   this.coverError = (image.width !== 1280 || image.height !== 960 || event.target.files[0].size > 1048576);
      //   if (this.coverError) {
      //     this.coverErrorMsg = '<ol>';
      //     if (image.width !== 1280) {
      //       this.coverErrorMsg += `<li>Image width is not equal to 1280px. (Found: ${image.width}px)</li>`;
      //     }
      //     if (image.height !== 960) {
      //       this.coverErrorMsg += `<li>Image height is not equal to 960px. (Found: ${image.height}px)</li>`;
      //     }
      //     if (event.target.files[0].size > 1048576) {
      //       this.coverErrorMsg += `<li>Image size is greater than 1MB. (Found: ${this.formatBytes(event.target.files[0].size)})</li>`;
      //     }
      //     this.coverErrorMsg += '</ol>';
      //   }
      // --};
    };
    // reader.readAsDataURL(this.selectedFiles[key].file);
    // }
  }

  formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  async onSubmit(data: any): Promise<void> {}

  onDelete() {
    this.unsubscribe('form-value-change');
  }

  setArrayValue<T>(field: string, array: T[]) {
    this._arrayField[field] = [];
    for (const a of array) {
      this.addArrayElement(field, this.arrayFbField[field](a));
    }
  }

  addArrayElement(field: string, data: AbstractControl) {
    const array = this.field(field) as FormArray;
    this._arrayField[field].push(array.length);
    array.push(data);
  }

  removeArrayElement(field: string, id: number) {
    console.log(field);
    console.log(id);

    const array = this.field(field) as FormArray;
    this._arrayField[field].splice(id, 1);
    array.removeAt(id);
  }
}

interface FrmControl {
  [key: string]: AbstractControl;
}

export interface KnxImageCompressOptions {
  /** @default Number.POSITIVE_INFINITY */
  maxSizeMB?: number;
  /** @default undefined */
  maxWidthOrHeight?: number;
  /** @default false */
  useWebWorker?: boolean;
  /** @default 10 */
  maxIteration?: number;
  /** Default to be the exif orientation from the image file */
  exifOrientation?: number;
  /** A function takes one progress argument (progress from 0 to 100) */
  onProgress?: (progress: number) => void;
  /** Default to be the original mime type from the image file */
  fileType?: string;
}

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}
function isImageFile(type: string): boolean {
  const pattern = /^[image\/]*/g;
  return pattern.test(type);
}

export class KnxFileValidators {
  static minSize(min: number): ValidatorFn {
    return ((control: FormGroup): ValidationErrors | null => {
      const formVal: FormFileControl = control.value;

      if (isEmptyInputValue(formVal.file) || isEmptyInputValue(formVal.size)) {
        return null; // don't validate empty values to allow optional controls
      }

      const value = formVal.size;
      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value!) && value! < min
        ? { minSize: { min, actual: value } }
        : null;
    }) as ValidatorFn;
  }

  static maxSize(max: number): ValidatorFn {
    return ((control: FormGroup): ValidationErrors | null => {
      const formVal: FormFileControl = control.value;

      if (isEmptyInputValue(formVal.file) || isEmptyInputValue(formVal.size)) {
        return null; // don't validate empty values to allow optional controls
      }

      const value = formVal.size;
      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value!) && value! > max
        ? { maxSize: { max, actual: value } }
        : null;
    }) as ValidatorFn;
  }

  static fileIsImage(control: AbstractControl): ValidationErrors | null {
    const formVal: FormFileControl = control.value;

    if (
      isEmptyInputValue(formVal.file) ||
      isEmptyInputValue(formVal.filetype)
    ) {
      return null; // don't validate empty values to allow optional controls
    }

    return isImageFile(formVal.filetype!) ? { fileIsImage: true } : null;
  }

  static minImageWidth(min: number): AsyncValidatorFn {
    return (async (control: FormGroup): Promise<ValidationErrors | null> => {
      const formVal: FormFileControl = control.value;

      if (
        isEmptyInputValue(formVal.file!) ||
        !isImageFile(formVal.filetype!) ||
        !formVal.fileRead!
      ) {
        return null; // don't validate empty values to allow optional controls
      }

      const imageMin = new Promise((resolve) => {
        const image = new Image();
        image.src = formVal.readAsDataURL!.toString();
        image.onload = () => {
          resolve(
            !isNaN(image.width) && image.width < min
              ? { minImageWidth: { min, actual: image.width } }
              : null
          );
        };
      });

      return imageMin as any;
    }) as AsyncValidatorFn;
  }

  static maxImageWidth(max: number): AsyncValidatorFn {
    return (async (control: FormGroup): Promise<ValidationErrors | null> => {
      const formVal: FormFileControl = control.value;

      if (
        isEmptyInputValue(formVal.file) ||
        !isImageFile(formVal.filetype!) ||
        !formVal.fileRead
      ) {
        return null; // don't validate empty values to allow optional controls
      }

      const imageMax = new Promise((resolve) => {
        const image = new Image();
        image.src = formVal.readAsDataURL!.toString();
        image.onload = () => {
          resolve(
            !isNaN(image.width) && image.width > max
              ? { maxImageWidth: { max, actual: image.width } }
              : null
          );
        };
      });

      return imageMax as any;
    }) as AsyncValidatorFn;
  }

  static minImageHeight(min: number): AsyncValidatorFn {
    return (async (control: FormGroup): Promise<ValidationErrors | null> => {
      const formVal: FormFileControl = control.value;

      if (
        isEmptyInputValue(formVal.file) ||
        !isImageFile(formVal.filetype!) ||
        !formVal.fileRead
      ) {
        return null; // don't validate empty values to allow optional controls
      }

      const imageMin = new Promise((resolve) => {
        const image = new Image();
        image.src = formVal.readAsDataURL!.toString();
        image.onload = () => {
          resolve(
            !isNaN(image.height) && image.height < min
              ? { minImageHeight: { min, actual: image.height } }
              : null
          );
        };
      });

      return imageMin as any;
    }) as AsyncValidatorFn;
  }

  static maxImageHeight(max: number): AsyncValidatorFn {
    return (async (control: FormGroup): Promise<ValidationErrors | null> => {
      const formVal: FormFileControl = control.value;

      if (
        isEmptyInputValue(formVal.file) ||
        !isImageFile(formVal.filetype!) ||
        !formVal.fileRead
      ) {
        return null; // don't validate empty values to allow optional controls
      }

      const imageMax = new Promise((resolve) => {
        const image = new Image();
        image.src = formVal.readAsDataURL!.toString();
        image.onload = () => {
          resolve(
            !isNaN(image.height) && image.height > max
              ? { maxImageHeight: { max, actual: image.height } }
              : null
          );
        };
      });

      return imageMax as any;
    }) as AsyncValidatorFn;
  }

  static requiredType(pattern: string | RegExp): ValidatorFn {
    if (!pattern) { return Validators.nullValidator; }
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';

      if (pattern.charAt(0) !== '^') { regexStr += "^"; }

      regexStr += pattern;

      if (pattern.charAt(pattern.length - 1) !== '$') { regexStr += "$"; }

      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return ((control: FormGroup): ValidationErrors | null => {
      const formVal: FormFileControl = control.value;
      if (isEmptyInputValue(formVal.file) || isEmptyInputValue(formVal.size)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: string = formVal.filetype!;
      return regex.test(value)
        ? null
        : { pattern: { requiredPattern: regexStr, actualValue: value } };
    }) as AsyncValidatorFn;
  }
}
