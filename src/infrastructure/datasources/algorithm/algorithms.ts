/**
 * @openapi
 * components:
 *   schemas:
 *     Algorithm:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           readOnly: true
 *         keyType: 
 *           type: string
 *           readOnly: true
 *         cipherType:
 *           type: string
 *           readOnly: true
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