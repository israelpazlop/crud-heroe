import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor( private heroesSerivice: HeroesService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    //On edit i get the activatedRoute and get the param, this is to edit
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesSerivice.gerHeroeById(id).subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
      });
    }
  }

  save( form: NgForm){
    if (form.invalid) {
      console.log('Form not valid');
      return;
    }

    Swal.fire(
      'Wait',
      'Saving information',
      'info',
    );

    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
     peticion = this.heroesSerivice.updateHeroe(this.heroe);
    }else{
     peticion = this.heroesSerivice.createHeroe( this.heroe );
    }

    peticion.subscribe(resp => {
      Swal.fire(
        this.heroe.name,
        'Updated success',
        'success'
      );
    });

  }

}
