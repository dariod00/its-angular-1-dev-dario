import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Drink } from '../_models/drink.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // search
  // lookup
  // list
  // filter
  constructor(private httpClient: HttpClient) { }

  // searchByFirstLetter

  searchCocktailByFirstLetter(firstLetter: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + firstLetter)
  }

  // searchByName

  searchCocktailByName(query: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + query)
  }

  searchByIngredient(ingredient: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient)
  }

  getIngredientsByList() {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  }

  lookupDrinkById(id: string) {
    return this.httpClient
      .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
      .pipe(map((response: any) => {

        const drink: Drink = response.drinks[0] as Drink;
        drink.ingredients = [];
        drink.instructions = [];
        Object.keys(drink).forEach((key) => {
          const keyName = key as keyof typeof drink;

          if (key.startsWith('strIngredient') && drink[keyName]) {
            const index = key.replace('strIngredient', '');
            const keyMeasure = 'strMeasure' + index as keyof typeof drink;
            console.log(index);
            drink.ingredients.push({
              name: drink[keyName],
              measure: drink[keyMeasure]
            });
          }
          if (key.startsWith('strInstructions') && drink[keyName]) {
            let lang = key.replace('strInstructions', '');
            if (!lang) {
              lang = 'EN';
            }
            drink.instructions[lang] = drink[keyName]
          }
        });
        return drink;
      }))
  }

}
