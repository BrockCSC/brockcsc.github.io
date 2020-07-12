export class Food {
  $key: string;
  name: string;
  price: number;
  section: string = 'Drink' || 'Food' || 'Other' || 'Combo';
}
