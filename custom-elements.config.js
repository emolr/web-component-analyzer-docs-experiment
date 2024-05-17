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

function escapeMarkdown(text) {
  if (!text) return '';
  const escapeChars = ['\\', '`', '*', '{', '}', '[', ']', '(', ')', '#', '+', '-', '.', '!', '_', '>', '|'];
  return text.split('').map(char => escapeChars.includes(char) ? '\\' + char : char).join('');
}

function getMarkdownTable (data, columns) {
  if (data.length === 0) {
    return '';
  }
  const header = '| ' + columns.map(column => typeof column === 'string' ? column : column.name).join(' | ') + ' |';
  const separator = '| ' + columns.map(() => '---').join(' | ') + ' |';
  
  const rows = data.map(item => '| ' + columns.map(column => {
    const key = typeof column === 'string' ? column : column.name;
    const value = item[key] !== undefined ? item[key] : '';
    return typeof column === 'string' ? escapeMarkdown(value) : escapeMarkdown(column.value ? column.value(item) : '');
  }).join(' | ') + ' |');

  return [header, separator, ...rows].join('\n');
}

function extractCodeBlock(content, language) {
  const regex = new RegExp("```" + language + "[\\s\\S]*?```", "g");
  const matches = content.match(regex);
  if (matches) {
    return matches.map(match => match.replace("```" + language, "").replace("```", "").trim());
  }
  return [];
}

function mapAttributeToPropertyTable(data) {
  return data
    .filter(item => !item.hasOwnProperty('fieldName')) // filter out objects that contain "fieldName"
    .map(item => ({
      kind: 'field',
      name: item.name,
      type: item.type,
      default: item.default,
      description: item.description,
      attribute: item.name,
      expandedType: item.expandedType
    }));
}

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
    expandTypesPlugin(),
    moduleFileExtensionsPlugin(),
    cemInheritancePlugin(),
    customJSDocTagsPlugin({
      tags: {
        example: {
          mappedName: 'examples',
          isArray: true
        },
        usage: {}
      }
    }),
    outputDeclaration({
      out: './docs/elements/*.md',
      clear: false,
      templateFn: async (data) => {
        let content = `
          # ${data.name}
          ${data.description ? data.description : ''}
          ${data.summary ? data.summary : ''}

          ${data.usage ? '## Usage' : ''}
          ${data.usage ? data.usage.description : ''}

          ${data.members.filter(member => member.kind === 'field').length > 0 || data.examples?.length > 0 ? '## Example' : ''}

          ${data.examples?.map(example => {
            return `
              <code-example>
              ${extractCodeBlock(example.description, 'html').length ? `
                ${extractCodeBlock(example.description, 'html').map(html => `
                  <div>
                    ${html}
                  </div>
                `).join('\n')}
              ` : ''}
              ${extractCodeBlock(example.description, 'javascript').length ? `
              ${extractCodeBlock(example.description, 'javascript').map(javascript => `
                <template data-type="script">
                  ${javascript}
                </template>
              `).join('\n')}
            ` : ''}

                ${example.description}

              </code-example>
            `
          }).join('\n')}

          ${data.members.filter(member => member.kind === 'field').map(member => `
            ### ${member.name}
            ${member.description}

            ${member.examples ? member.examples.map(example => {
              return `
                <code-example v-pre>
                ${extractCodeBlock(example.description, 'html').length ? `
                  ${extractCodeBlock(example.description, 'html').map(html => `
                    <div>
                      ${html}
                    </div>
                  `).join('\n')}
                ` : ''}
                ${extractCodeBlock(example.description, 'javascript').length ? `
                ${extractCodeBlock(example.description, 'javascript').map(javascript => `
                  <template data-type="script">
                    ${javascript}
                  </template>
                `).join('\n')}
              ` : ''}

                  ${example.description}

                </code-example>
              `
            }).join('\n') : ''}
          `).join('\n')}

          ${data.members.length > 0 ? '## Properties / Attributes' : ''}
          ${getMarkdownTable([...data.members, ...mapAttributeToPropertyTable(data.attributes)], ['name', 'attribute', {
            name: 'type',
            value: column => {
              return column.expandedType ? column.expandedType.text : column.type?.text;
            }
          }, 'default', 'description'])}

          ${data.slots.length > 0 ? '## CSS Slots' : ''}
          ${getMarkdownTable(data.slots, ['name', 'description'])}

          ${data.events.length > 0 ? '## Events' : ''}
          ${getMarkdownTable(data.events, ['name', 'description', { name: 'type', value: column => column.type?.text }])}

          ${data.cssProperties.length > 0 ? '## CSS Custom Properties' : ''}
          ${getMarkdownTable(data.cssProperties, ['name', 'description', 'default'])}

          ${data.cssParts.length > 0 ? '## CSS Parts' : ''}
          ${getMarkdownTable(data.cssParts, ['name', 'description'])}

        `;

        
        // Remove leading white spaces from each line
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
