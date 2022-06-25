import { Character } from "./Chracter";


export interface MyCharacterResult {
    unique_id: number;
    name: string;
    image: string;
    description: string;
    percentage: number;
    good?: Character;
    bad?: Character;
}