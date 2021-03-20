import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KnxReactiveForm } from 'src/app/classes/form.class';

@Component({
  selector: 'tu-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: []
})
export class ContactPageComponent extends KnxReactiveForm {

  constructor(readonly fb: FormBuilder,
    readonly cd: ChangeDetectorRef,
  ) {
    super(fb, cd);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullname: [null, []],
      email: [null, []],
      contact: [null, []],
      topic: [null, []],
      subject: [null, []],
      message: [null, []],
    })
  }
}
