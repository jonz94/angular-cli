/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { executeDevServer } from '../../index';
import { executeOnceAndFetch } from '../execute-fetch';
import { describeServeBuilder } from '../jasmine-helpers';
import { BASE_OPTIONS, DEV_SERVER_BUILDER_INFO } from '../setup';

describeServeBuilder(executeDevServer, DEV_SERVER_BUILDER_INFO, (harness, setupTarget) => {
  describe('Behavior: "browser builder assets"', () => {
    it('serves a project JavaScript asset unmodified', async () => {
      const javascriptFileContent = '/* a comment */const foo = `bar`;\n\n\n';
      await harness.writeFile('src/extra.js', javascriptFileContent);

      setupTarget(harness, {
        assets: ['src/extra.js'],
        optimization: {
          scripts: true,
        },
      });

      harness.useTarget('serve', {
        ...BASE_OPTIONS,
      });

      const { result, response } = await executeOnceAndFetch(harness, 'extra.js');

      expect(result?.success).toBeTrue();
      expect(await response?.text()).toBe(javascriptFileContent);
    });
  });
});
