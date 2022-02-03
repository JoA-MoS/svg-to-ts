import { generateCompleteIconSetContent } from './complete-icon-set.helper';
import { unformatedString } from './test-helpers';

describe('Complete Iconset-helper', () => {
  it('should import all the values and export them as an array', () => {
    let completeIconSetName = 'all-icons';
    const fileNamesWithDefinitions = [
      { variableName: 'foo', prefix: 'sampleIcon', filenameWithoutEnding: 'foo' },
      { variableName: 'bar', prefix: 'sampleIcon', filenameWithoutEnding: 'bar' },
      { variableName: 'baz', prefix: 'sampleIcon', filenameWithoutEnding: 'baz' }
    ] as any;
    const expectedContent = `
    import {foo} from './sampleIcon-foo.icon';
    import {bar} from './sampleIcon-bar.icon';
    import {baz} from './sampleIcon-baz.icon';
            
    export const allIcons = [foo, bar, baz];`;

    const generatedContent = generateCompleteIconSetContent(fileNamesWithDefinitions, completeIconSetName);
    expect(unformatedString(expectedContent)).toEqual(unformatedString(generatedContent));
  });
});
