import { Character } from "@services/mongodb/models";

export interface MyCharacterResult {
    unique_id: number;
    name: string;
    image: string;
    description: string;
    percentage: number;
    good?: Character;
    bad?: Character;
}