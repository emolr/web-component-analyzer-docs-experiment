// https://github.com/bennypowers/cem-plugins/tree/main/plugins/cem-plugin-jsdoc-example
// import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';
// https://github.com/break-stuff/cem-tools/tree/main/packages/expanded-types#readme
import { getTsProgram, expandTypesPlugin } from "cem-plugin-expanded-types";
// https://www.npmjs.com/package/@blockquote/cem-to-markdown-readme
import { cemToMarkdownReadme } from '@blockquote/cem-to-markdown-readme';
//https://github.com/bennypowers/cem-plugins/tree/main/plugins/cem-plugin-module-file-extensions
import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
// https://github.com/break-stuff/cem-inheritance-example
import { cemInheritancePlugin } from "custom-elements-manifest-inheritance";
// https://www.npmjs.com/package/cem-plugin-custom-jsdoc-tags
// import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";
import { customJSDocTagsPlugin } from './plugins/custom-tags.js';
// import toMarkdownFiles from './plugins/to-markdown-files.js';
import { outputDeclaration } from './plugins/output-declaration.js';
// cem plugins
// https://github.com/break-stuff/cem-tools
// https://custom-elements-manifest.open-wc.org/analyzer/plugins/intro/

import { format } from 'prettier';

// Custom Elements Manifest Config

// Configuration for the CEM tool that generates a custom-element.json file
// for use in tools like storybook and code editors among others.

// Documentation: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/

export default {
  globs: ["**/src/**/*.ts"],
  exclude: [
    "**/*.d.ts",
    "**/stories/**",
    "**/test/**",
    "**/*.stories.*",
    "node_modules/*",
  ],
  outdir: ".",
  litelement: true,
  packagejson: false,
  plugins: [
    // jsdocExamplePlugin(),
    expandTypesPlugin(),
    moduleFileExtensionsPlugin(),
    cemInheritancePlugin(),
    customJSDocTagsPlugin({
      tags: {
        example: {
          mappedName: 'examples',
          isArray: true,
        }
      }
    }),
    outputDeclaration({
      out: './docs/elements/*.md',
      clear: true,
      templateFn: async (data) => {
        let content = `
          # ${data.name}

          ${data.description}

          ${data.members.filter(member => member.kind === 'field').length > 0 ? '## Properties' : ''}
          ${data.members.filter(member => member.kind === 'field').map(member => `
            ## ${member.name}
            ${member.description}

            ${member.examples ? member.examples.map(example => {
              return `
                <code-example>

                  ${example.description}

                </code-example>
              `
            }).join('\n') : ''}
          `).join('\n')}
        `
        // Remove leading whitespaces from each line
        content = content.split('\n').map(line => line.trimStart()).join('\n');

        // Remove multiple empty lines
        content = content.replace(/\n{3,}/g, '\n\n');

        const formattedContent = await format(content, { parser: 'markdown' });

        return formattedContent;
      },
    })

  ],
  overrideModuleCreation: ({ ts, globs }) => {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
};
