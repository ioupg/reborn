export default { 
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          useESM: true,
        }]
      },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
 }