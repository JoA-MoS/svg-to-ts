import { Delimiter } from '../generators/code-snippet-generators';
import { Logger } from '../helpers/logger';
import { collectCommandLineOptions } from './command-line-collector';
import { collectConfigurationOptions } from './config-collector';

export enum ConversionType {
  OBJECT = 'object',
  CONSTANTS = 'constants',
  FILES = 'files'
}

export interface CommonConversionOptions {
  srcFiles: string[];
  outputDirectory: string;
  svgoConfig: any;
  delimiter: Delimiter;
  verbose: boolean;
}

export interface ObjectConversionOptions extends CommonConversionOptions {
  conversionType: ConversionType.OBJECT;
  fileName: string;
  objectName: string;
}

export interface ConstantsConversionOptions extends CommonConversionOptions {
  conversionType: ConversionType.CONSTANTS;
  fileName: string;
  typeName: string;
  enumName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  generateEnum: boolean;
  exportCompleteIconSet?: boolean;
  prefix: string;
  interfaceName: string;
}

export interface FileConversionOptions extends CommonConversionOptions {
  conversionType: ConversionType.FILES;
  typeName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  generateEnum: boolean;
  exportCompleteIconSet?: boolean;
  prefix: string;
  interfaceName: string;
  enumName: string;
  modelFileName: string;
  additionalModelOutputPath: string | null;
  iconsFolderName: string;
  compileSources: boolean;
  barrelFileName: string;
}

export const getOptions = async (): Promise<
  | FileConversionOptions
  | ConstantsConversionOptions
  | ObjectConversionOptions
  | Array<ConstantsConversionOptions | FileConversionOptions | ObjectConversionOptions>
> => {
  const configOptions = await collectConfigurationOptions();

  if (configOptions) {
    return configOptions;
  }
  Logger.verboseInfo(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return collectCommandLineOptions();
};
