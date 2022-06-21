import { WithId, Document } from "mongodb";

export interface Character extends WithId<Document> {
  unique_id?: number;
  name?: string;
  image?: string;
  description?: string;
  good?: number;
  bad?: number;
}
