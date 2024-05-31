import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Piste } from 'src/core/model/piste';
import { CrudsService } from 'src/core/services/cruds.service';

@Component({
  selector: 'app-my-new-component',
  templateUrl: './my-new-component.component.html',
  styleUrls: ['./my-new-component.component.css']
})
export class MyNewComponentComponent implements OnInit {

  public form: FormGroup;
  public action: String;
  public club: Piste;

  constructor(private formBuilder: FormBuilder,
    private clubService: CrudsService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      namePiste: ['', [Validators.required]],
      color: ['', [Validators.required]],
      length: ['', [Validators.required]],
      slope: ['', [Validators.required]]
    });
    let id = this.currentRoute.snapshot.params['id'];
    if (id != null) {
      this.action = 'Update';
      this.clubService.getById("", id).subscribe(
        (object: Piste) => this.club = object
      )
    } else {
      this.action = 'Add';
      this.club = new Piste();
    }
  }
  submit() {
    if (this.action == 'Add') {
      this.clubService.add("", this.club).subscribe(
        () => { this.router.navigate(['/']) }
      );
    }
    else if (this.action == 'Update') {
      this.clubService.update("", this.club).subscribe(
        () => this.router.navigate(['/'])
      )
    }
    else {
      this.router.navigate(['/']);
    }
  }

}
