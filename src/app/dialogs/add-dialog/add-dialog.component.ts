
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import * as uuid from 'uuid';
export interface DataDialog {
  data?: any
}
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog) {

    if (this.data != null) {
      this.patchValue();
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddForm = this.fb.group(
    {
      id: this.fb.control(uuid.v4(), Validators.required),
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
    }
  );
  submitForm() {
    if (this.data == null) {
      if (this.AddForm.value) {
        this.dataService.data.push(this.AddForm.value)
      }
    } else {
      this.dataService.data.filter((e: any) => {
        if (e.id === this.data.data.id) {
          console.log("objcdect", this.data.data.id, e.id)
          e.name = this.AddForm.get('name')?.value;
          e.description = this.AddForm.get('description')?.value;

        }
      })
    }
    this.onNoClick()
  }
  patchValue() {
    this.AddForm.patchValue({
      id: this.data.data.id,
      name: this.data.data.name,
      description: this.data.data.description,

    })
  }

}
