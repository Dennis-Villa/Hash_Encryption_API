/**
 * @openapi
 * components:
 *   schemas:
 *     Algorithm:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *         keyType: 
 *           type: string
 *         cipherType:
 *           type: string
 *       example:
 *          name: md5
 *          keyType: ASYMMETRIC
 *          cipherType: SIGNATURE
 *         
 */

export const AlgorithmsSpecifications = [
    {
        name: 'md5',
        keyType: 'ASYMMETRIC',
        cipherType: [ 'SIGNATURE' ],
    },
    {
        name: 'sha1',
        keyType: 'ASYMMETRIC',
        cipherType: [ 'SIGNATURE' ],
    },
    {
        name: 'RSA',
        keyType: 'ASYMMETRIC',
        cipherType: [ 'PUBKEY', 'SIGNATURE' ],
    },
    {
        name: 'EdDSA',
        keyType: 'ASYMMETRIC',
        cipherType: [ 'PUBKEY', 'SIGNATURE' ],
    },
    {
        name: 'Blowfish',
        keyType: 'SYMMETRIC',
        cipherType: [ 'BLOCK' ],
    },
    {
        name: 'AES',
        keyType: 'SYMMETRIC',
        cipherType: [ 'BLOCK' ],
    },
    {
        name: 'ChaCha',
        keyType: 'SYMMETRIC',
        cipherType: [ 'STREAM' ],
    },
    {
        name: 'RC4',
        keyType: 'SYMMETRIC',
        cipherType: [ 'STREAM' ],
    },
];