import { Component, OnInit } from '@angular/core';
import { Piste } from 'src/core/model/piste';
import { CrudsService } from 'src/core/services/cruds.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public pistes: Piste[];
  public search: string;
  constructor(private clubService: CrudsService) { }

  ngOnInit(): void {
    this.clubService.getAll("").subscribe({
      next: (params) => {
        this.pistes = params;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  delete(c: Piste) {
    let i = this.pistes.indexOf(c);
    this.clubService.delete("", c.numPiste).subscribe(
      () => { this.pistes.splice(i, 1) }
    );
  }
}
