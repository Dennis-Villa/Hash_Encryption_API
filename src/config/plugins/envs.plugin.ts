import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    WEB_SERVICE_URL: get('WEB_SERVICE_URL').required().asUrlString(),
    MAX_FILE_SIZE: get('MAX_FILE_SIZE').required().asInt(),
};