import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes().subscribe( resp => {
      this.heroes = resp;
      this.loading = false;
    } );
  }

  deleteHeroe(heroe: HeroeModel, i: number){
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${ heroe.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( resp => {
        if (resp.value) {
          this.heroes.splice(i, 1);
          this.heroesService.deleteHeroe( heroe.id ).subscribe();
        }
    });
  }
}
