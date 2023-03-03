import { Filter } from "../../../Commom/Filter/Filter";
import { SpentsData } from "./SpentsData";

export interface GetSpentsRepository {
    getSpents(filter?: Filter, params?: number): Promise<SpentsData[]>
}