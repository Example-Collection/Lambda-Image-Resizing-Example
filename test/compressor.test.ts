import * as fs from 'fs';
import * as path from 'path';
import { compress } from "../src/helloWorld/compressor.service"

describe('compressor test', () => {
    test.each`
        width    | height
        ${800}   | ${600}
    `
    ('compress should success', async ({width, height}) => {
        const filename = 'assets/test.png';
        const filepath = path.join(__dirname, filename)
        const bits = fs.readFileSync(filepath);
                
        const compressed = await compress(bits, { width, height });

        expect(width).toEqual(compressed.info.width);
        expect(height).toEqual(compressed.info.height);
    })
})