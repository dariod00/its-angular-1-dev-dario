import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drink } from 'src/app/_models/drink.model';
import { ApiService } from 'src/app/_service/api.service'

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
})
export class DrinkComponent implements OnInit {
  //dichiarazione variabili
  drink!: Drink;
  // al costruttore passo il metodo http e le rotte
  constructor(private activatedRoute: ActivatedRoute) { }
  // alla creazione del componente prendo l'id del drink, faccio la chiamata api
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ drink }) => {
      this.drink = drink;
    })
  }
}
