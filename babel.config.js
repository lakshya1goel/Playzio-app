module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@assets': './assets',
          '@components': './src/presentation/component',
          '@screens': './src/presentation/screen',
          '@navigation': './src/navigation',
          '@type': './src/type.ts',
          '@store': './src/store',
        },
      },
    ],
    [
      'module:react-native-dotenv', 
      {
        'envName': 'APP_ENV',
        'moduleName': '@env',
        'path': '.env',
      },
    ],
  ],
};
