const config = {
    preset: 'ts-jest/presets/default-esm',
    displayName: 'EA-CDR-E2E',
    testRunner: 'jest-circus',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
  
    testMatch: [
      //'**/tests/release1-E2E-testSuite/Common-Related-APIs/*.ts',
      //'**/tests/release1-E2E-testSuite/Energy-Related-APIs/get-energy-accounts.ts',
      //'**/tests/release1-testSuite/AEMO-Related-APIs/*.ts',
      //'**/tests/release2-E2E-testSuite/Common-Related-APIs/*.ts',
      //'**/tests/release2-E2E-testSuite/Energy-Related-APIs/get-energy-accounts.ts',
      //'**/tests/release2-E2E-testSuite/AEMO-Related-APIs/get-der.ts',
      '**/tests/release3-E2E-testSuite/Common-Related-APIs/*.ts',
      '**/tests/release3-E2E-testSuite/Energy-Related-APIs/*.ts',
      '**/tests/release3-E2E-testSuite/AEMO-Related-APIs/*.ts',
      '**/tests/release4-E2E-testSuite/Common-Related-APIs/*.ts',
      '**/tests/release4-E2E-testSuite/Energy-Related-APIs/*.ts',
      '**/tests/release4-E2E-testSuite/AEMO-Related-APIs/*.ts',
      '**/tests/release4-E2E-testSuite/Negative-Testcases/*.ts',
    ],
    testTimeout: 3000000,
    reporters: [
      'default',
      'jest-skipped-reporter',
      [
        'jest-stare',
        {
          resultDir: './dist/htmlReports/jest-html',
          resultHtml: 'e2e.html',
          reportTitle: 'CDRE2ETests',
          log: true,
          reportSummary: true,
        },
      ],
      [
        'jest-email-reporter',
        {
          from: 'nik.sodavaram@energyaustralia.com.au',
          to: 'vinayak.phulari@energyaustralia.com.au',
          subject: 'Daily E2E Test Automation Suite Results',
          reportIfSuccess: false,
        },
      ],
      [
        'jest-junit',
        {
          suiteName: 'CDR E2E Tests',
          outputDirectory: './dist/xmlReports',
          outputName: 'jest-junit.xml',
        },
      ],
      [
        'jest-html-reporter',
        {
          append: false,
          dateFormat: 'yyy-mm-dd HH:MM:ss',
          includeConsoleLog: true,
          includeFailureMsg: true,
          includeSuiteFailure: true,
          outputPath: './dist/htmlReports/test_html_results/test-report.html',
          pageTitle: 'HTML Test Report',
        },
      ],
      [
        'jest-html-reporters',
        {
          publicPath: './dist/htmlReports/e2e_html_results',
          filename: 'e2e-html-report',
          darkTheme: true,
          includeConsoleLog: true,
          pageTitle: 'E2E Test Report',
          testCommand: 'yarn test:e2e',
          expand: true,
          openReport: true,
        },
      ],
      [
        'jest-slow-test-reporter',
        {
          numTests: 10,
          warnOnSlowerThan: 300,
          color: true,
        },
      ],
      [
        '@jest-performance-reporter/core',
        {
          errorAfterMs: 1000,
          warnAfterMs: 500,
          logLevel: 'warn',
          maxItems: 5,
          jsonReportPath: './dist/performance-report.json',
          csvReportPath: './dist/performance-report.csv',
        },
      ],
    ],
    coverageDirectory: './dist/coverage',
    coverageReporters: ['text', 'cobertura'],
    coverageThreshold: {
      global: {
        branches: 40,
        functions: 60,
        lines: 65,
        statements: 65,
      },
    },
    setupFilesAfterEnv: [
      './jest.setup.js',
      'jest-extended/all',
      'jest-expect-message',
      'jest-chain',
      'expect-more',
      'just-clone',
    ],
    notify: true,
  };
  
  module.exports = config;
  