import { Character } from "./Chracter";


export interface MyCharacterResult {
    unique_id: number;
    name: string;
    subname: string;
    ment: string;
    image: string;
    description: string;
    good?: Character;
    goodment?: string;
    bad?: Character;
    badment?: string;
    main_color: string;
}