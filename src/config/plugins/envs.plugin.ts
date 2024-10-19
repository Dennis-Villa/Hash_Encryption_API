import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    MAX_FILE_SIZE: get('MAX_FILE_SIZE').required().asInt(),
};