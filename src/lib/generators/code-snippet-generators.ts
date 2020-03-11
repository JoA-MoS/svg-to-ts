import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';
import kebapCase from 'lodash.kebabcase';

export enum Delimiter {
  CAMEL = 'CAMEL',
  KEBAB = 'KEBAB',
  SNAKE = 'SNAKE'
}

export const generateInterfaceDefinition = (interfaceName: string, typeName: string) => {
  return `export interface ${interfaceName}{
        name: ${typeName};
        data: string;}`;
};

export const generateTypeDefinition = (typeName: string): string => {
  return `
    /*Do not edit this file - this file is generated by svg-to-ts*/
    
    export type ${typeName} = 
  `;
};

export const generateSvgConstant = (
  variableName: string,
  interfaceName: string,
  filenameWithoutEnding: string,
  data: string
): string => {
  return `export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${data}'
            };`;
};

export const generateSvgConstantWithImport = (
  variableName: string,
  filenameWithoutEnding: string,
  interfaceName: string,
  modelFileName: string,
  data: string
): string => {
  return `
    import {${interfaceName}} from './${modelFileName}';
  
    export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${data}'
            };`;
};

export const generateSvgStandaloneFile = (
  variableName: string,
  interfaceName: string,
  filenameWithoutEnding: string,
  data: string
): string => {
  return `export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${data}'
            };`;
};

export const generateExportStatement = (fileName: string, generateIconsFolderName: string) =>
  `export * from './${generateIconsFolderName}/${fileName}';`;

export const generateTypeName = (filenameWithoutEnding, delimiter: Delimiter): string => {
  if (delimiter === Delimiter.CAMEL) {
    return `${camelCase(filenameWithoutEnding)}`;
  }
  if (delimiter === Delimiter.KEBAB) {
    return `${kebapCase(filenameWithoutEnding)}`;
  }
  return `${snakeCase(filenameWithoutEnding)}`;
};

export const generateVariableName = (prefix: string, filenameWithoutEnding): string => {
  return `${prefix}${capitalize(camelCase(filenameWithoutEnding))}`;
};

const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
