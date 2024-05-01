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
import toMarkdownFiles from './plugins/to-markdown-files.js';
// cem plugins
// https://github.com/break-stuff/cem-tools
// https://custom-elements-manifest.open-wc.org/analyzer/plugins/intro/

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
          toMarkdownFiles({
            outDir: './docs',
            clearDir: false,
            tagTemplates: {
              examples: {
                title: 'Examples',
                template: (example) => {
                  return `### ${example.name} \n ${example.description}`;
                },
              }
            }
          }),
        // ...cemToMarkdownReadme({})
    ],
    overrideModuleCreation: ({ts, globs}) => {
        const program = getTsProgram(ts, globs, "tsconfig.json");
        return program
          .getSourceFiles()
          .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
      },
  };
  