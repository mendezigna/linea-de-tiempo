import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimelineMedia } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-media-field',
  templateUrl: './media-field.component.html',
  styleUrls: ['./media-field.component.css']
})
export class MediaFieldComponent implements OnInit {

  @Input('parentForm') parentForm : FormGroup = this.fb.group({})

  @Input('data') data : TimelineMedia | undefined

  mediaControl!: FormGroup
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.mediaControl = this.fb.group({
      url: [this.data?.url],
      caption: [this.data?.caption],
      credit: [this.data?.credit],
      thumbnail: [this.data?.thumbnail],
      alt: [this.data?.alt],
      title: [this.data?.title],
      link: [this.data?.link],
      link_target: [this.data?.link_target],
    });
    (this.parentForm.get('slide')! as FormGroup).addControl('media',this.mediaControl)
  }

}
