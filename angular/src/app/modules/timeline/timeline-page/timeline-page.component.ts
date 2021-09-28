import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Timeline, Entry } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';
import { EntryDialogComponent } from '../entry/entry-dialog/entry-dialog.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.css']
})
export class TimelinePageComponent implements OnInit {

  timeline: Timeline = new Timeline();
  id: String = "";
  noExiste: Boolean = false;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,private route: ActivatedRoute, private router : Router, private timelineDeTiempoService: TimelineService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    if(!this.id){
      this.router.navigate(['/categories'])
    }
    this.timelineDeTiempoService.getTimeline(this.id).subscribe({
      next: (data) => {
        this.timeline = data as Timeline
      },
      error: (error) => {
        console.log("Hi")
        this.noExiste = true
        this.router.navigate(['/categories'])
      }
    })
  }
  
  eliminarLinea(): void{}

  editarLinea(): void {
    
  }

  newEntry(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: {entry: new Entry(), title: "New Entry"}
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      if (result){
        this.timeline.entries.push(result)
      }
    });
  }

  addEntry() {
    this.timeline.entries.push(new Entry())
  }

  deleteEntry(entry : Entry){
    this.timeline.entries.splice(this.timeline.entries.indexOf(entry), 1)
  }

  modifyEntry(entry : Entry){
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: {entry, title: "Modify Entry"},
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      if(result){
        entry.date = result.date
        entry.text = result.text
        entry.title = result.title
      }
    });
  }

  guardarCambios(){
    this.timelineDeTiempoService.guardarCambios(this.timeline).subscribe({
      next: (result) => {
        this._snackBar.open('Cambios Guardados con exito', 'cerrar', {duration: 3000});
      },
      error: (err) => {
        console.log(err)
        this._snackBar.open('Ocurrio un error', 'cerrar',{duration: 3000});
      } 
    })
  }
}
