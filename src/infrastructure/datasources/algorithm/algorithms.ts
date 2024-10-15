
export const AlgorithmsSpecifications = [
    {
        name: 'md5',
        keyType: 'ASYMMETRIC',
        cypherType: [ 'SIGNATURE' ],
    },
    {
        name: 'sha1',
        keyType: 'ASYMMETRIC',
        cypherType: [ 'SIGNATURE' ],
    },
    {
        name: 'RSA',
        keyType: 'ASYMMETRIC',
        cypherType: [ 'PUBKEY', 'SIGNATURE' ],
    },
    {
        name: 'EdDSA',
        keyType: 'ASYMMETRIC',
        cypherType: [ 'PUBKEY', 'SIGNATURE' ],
    },
    {
        name: 'Blowfish',
        keyType: 'SYMMETRIC',
        cypherType: [ 'BLOCK' ],
    },
    {
        name: 'AES',
        keyType: 'SYMMETRIC',
        cypherType: [ 'BLOCK' ],
    },
    {
        name: 'ChaCha',
        keyType: 'SYMMETRIC',
        cypherType: [ 'STREAM' ],
    },
    {
        name: 'RC4',
        keyType: 'SYMMETRIC',
        cypherType: [ 'STREAM' ],
    },
];