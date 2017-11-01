import {Afbeelding} from "./afbeelding";

export class Materiaal {
  $key;
  aantal: number;
  afbeelding: Afbeelding;
  naam: string;
  status: string;
  omschrijving: string;
  aanmaakDatum: string;
  tags: string[];
}
