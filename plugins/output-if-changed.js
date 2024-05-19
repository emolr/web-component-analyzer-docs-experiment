import fs from 'fs';

export function outputIfChanged(options = { out: './custom-elements.json'}) {
    return {
        // Make sure to always give your plugin a name! This helps when debugging
        name: 'output-declaration',
        packageLinkPhase({ customElementsManifest }) {
            // Write file if the file does not exist or if the contents of the file are different
            if (!fs.existsSync(options.out) || fs.readFileSync(options.out, 'utf8') !== JSON.stringify(customElementsManifest, null, 2)) {
                console.log(
                    `Writing declaration to ${options.out}`
                )
                fs.writeFileSync(options.out, JSON.stringify(customElementsManifest, null, 2));
        }
        },
    }
}

export default outputIfChanged;