import fs from 'fs';
import path from 'path';

export function isGlobPattern(path) {
    return /[\*\?\[\]\{\}\!\@]/.test(path);
}


export function outputDeclaration(options = { out: './markdown/*.md', clear: false, templateFn: (data) => JSON.stringify(data, null, 2)}) {
    return {
        // Make sure to always give your plugin a name! This helps when debugging
        name: 'output-declaration',
        packageLinkPhase({ customElementsManifest }) {
            const baseDir = path.dirname(options.out);
            const declarations = customElementsManifest.modules.flatMap(module => module.declarations).filter(declaration => declaration.customElement);

            // Ensure the output directory exists
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir, { recursive: true });
            }

            // Clear the directory if clearDir option is true
            if (options.clear) {
                console.log('Clearing directory', baseDir)
                const files = fs.readdirSync(baseDir);
                for (const file of files) {
                    fs.unlinkSync(path.join(baseDir, file));
                }
            }
            
            declarations.forEach(async declaration => {
                const formattedContent = await options.templateFn(declaration);
                const outputPathWithReplacedWildcards = options.out.replaceAll(
                    "*",
                    declaration.tagName,
                );

                fs.writeFileSync(outputPathWithReplacedWildcards, formattedContent);
            });
        },
    }
}

export default outputDeclaration;