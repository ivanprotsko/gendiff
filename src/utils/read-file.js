import fs from 'fs';

export default (file) => fs.readFileSync(file, 'utf8', (err) => { if (err) { console.error(err); } });
