import { Component, OnInit } from '@angular/core';
import { AddDialogComponent, DataDialog } from './dialogs/add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
  ) {
    
  }
  ngOnInit(): void {
  }

add() {
  this.dialog.open<AddDialogComponent, DataDialog>(AddDialogComponent, {
    width: '450px',
  })
    .afterClosed().subscribe();

}

}
