import {
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTypeDefinition,
  generateTypeHelper
} from '../generators/code-snippet-generators';
import { generateExportSection } from '../helpers/complete-icon-set.helper';
import { writeFile } from '../helpers/file-helpers';
import { Logger } from '../helpers/logger';
import { callAndMonitor, callAndMonitorAsync } from '../helpers/monitor';
import { ConstantsConversionOptions } from '../options/conversion-options/constant-conversion-options';

import { filesProcessor, SvgDefinition } from './shared.converter';

const getSvgConstants = (svgDefinitions): string => {
  const svgConstants = svgDefinitions.map(svgDefinition =>
    generateSvgConstant(svgDefinition.variableName, svgDefinition.typeName, svgDefinition.data)
  );
  return svgConstants.join('');
};

export const convertToConstants = async (conversionOptions: ConstantsConversionOptions): Promise<void> => {
  const { outputDirectory, fileName, interfaceName, exportCompleteIconSet, completeIconSetName } = conversionOptions;
  let exportAllStatement = '';

  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files'
  );

  if (svgDefinitions.length) {
    const svgContants = callAndMonitor<string>(getSvgConstants.bind({}, svgDefinitions), 'Generate SVG constants');
    const typeDefinition = callAndMonitor<string>(
      generateTypeDefinition.bind({}, conversionOptions, svgDefinitions),
      'Generate type definitions'
    );
    const interfaceDefinition = callAndMonitor<string>(
      generateInterfaceDefinition.bind({}, conversionOptions),
      'Generate Interface Definition'
    );

    if (exportCompleteIconSet) {
      exportAllStatement = callAndMonitor<string>(
        generateExportSection.bind({}, svgDefinitions, completeIconSetName),
        'Exporting all constants'
      );
    }

    const typeHelper = callAndMonitor<string>(generateTypeHelper.bind({}, interfaceName), 'Generate Type Helper');
    const fileContent = `${svgContants}${typeDefinition}${interfaceDefinition}${typeHelper}${exportAllStatement}`;
    await callAndMonitorAsync<void>(
      writeFile.bind({}, outputDirectory, fileName, fileContent),
      `Writing files to ${outputDirectory}`
    );
    Logger.generationSuccess(outputDirectory);
  }
};
