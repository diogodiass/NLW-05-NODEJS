import {Repository, EntityRepository, Entity} from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting)
class SettingRepository extends Repository<Setting> {}

export {SettingRepository}