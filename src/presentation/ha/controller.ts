import { IdentificationService } from '../services/algorithm.service';

export class IdentificationController {

    constructor(
        private readonly identificationService = new IdentificationService(),
    ) {};
}