import { inject, injectable } from 'tsyringe'
import { GetSpentsRepository } from '../Domain/GetSpentsRepository'
import { SpentsData } from '../Domain/SpentsData'
import { SpentService } from '../Domain/SpentService'
import { SpentsRepositoriesEnum } from '../Domain/SpentsRepositoriesEnum'
import { SpentsDataRepositoryAppJson } from '../Infra/Json/SpentsDataRepositoryAppJson'
@injectable()
export class SpentServiceImpl implements SpentService {
    constructor(
        @inject(SpentsRepositoriesEnum.APP_REPOSITORY) private spentsDataRepositoryJson: SpentsDataRepositoryAppJson,
        @inject(SpentsRepositoriesEnum.SPENTS_REPOSITORY) private getSpentsRepository: GetSpentsRepository
    ) {}

    private getSpent(data: SpentsData): Promise<SpentsData[]> {
        const spent = this.getSpentsRepository.getSpents(data)

        return spent
    }

    async export(data: SpentsData) {
        const spentsToSave = []
        const spents = await this.getSpent(data)
    
        spentsToSave.push(spents)
        await this.spentsDataRepositoryJson.save(spentsToSave)
    }
}
