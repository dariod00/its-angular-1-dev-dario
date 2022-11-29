import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  // dichiarazione variabili
  drinks: any = [];
  drinkName: string = "";

  ingredients: any = [];
  ingredientName: string = "";

  // al costruttore passo il servizio api
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // alla creazione del componente viene effettuata la chiamata api
    this.apiService.getIngredientsByList()
      .subscribe((res: any) => {
        this.ingredients = res.drinks
        // console.log(this.ingredients);
      })
  }

  // al click ricevo i drink dalla chiamata api
  getDrinksByClick(): void {
    // ricerca drink solo tramite una lettera
    if (this.drinkName !== '') {
      if (this.drinkName.length === 1) {
        this.apiService.searchCocktailByFirstLetter(this.drinkName)
          .subscribe((res: any) => {
            console.log(res);
            this.drinks = res.drinks
          })

      } else {
        // ricerca drink per nome intero
        this.apiService.searchCocktailByName(this.drinkName)
          .subscribe((res: any) => {
            this.drinks = res.drinks
          })
      }
    }
    else {

      // ricerca drink per ingrediente selezionato dalla select
      this.apiService.searchByIngredient(this.ingredientName)
        .subscribe((res: any) => {
          // console.log(res);
          this.drinks = res.drinks
        })
    }
  }
}
