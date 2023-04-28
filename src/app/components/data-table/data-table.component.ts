
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, of, pluck, switchMap } from 'rxjs';
import { AddDialogComponent, DataDialog } from 'src/app/dialogs/add-dialog/add-dialog.component';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})


export class DataTableComponent implements OnInit {
  shareData: any[] = [];
  @ViewChild('SearchInput', { static: true }) movieSearchInput: ElementRef | undefined;
  constructor(private data: DataService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getData();
  }


  ngAfterViewInit(): void {
    fromEvent(this.movieSearchInput?.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // Time in milliseconds between key events
      , debounceTime(100)
      // If previous query is diffent from current   
      , distinctUntilChanged()
    ).subscribe(
      (text: string) => {
        this.search(text)
      });
  }

  search(text: string) {
    if (text != '') {
      let result = this.shareData.filter((res: any) => {
        return res.name.includes(text, res.name.lastIndexOf("."))
      })
      this.shareData = result;
    } else {
      this.getData()
    }
  }


  getData() {
    this.data.share.subscribe((data) => {
      this.shareData = data
    })
  }


  deleteItem(id: number) {
    this.data.deleteItem(id);
  }

  Edit(item: any) {
    console.log("object", item)
    this.dialog.open<AddDialogComponent, DataDialog>(AddDialogComponent, {
      width: '450px',
      data: {
        data: item
      }
    }).afterClosed().subscribe();
  }



}


