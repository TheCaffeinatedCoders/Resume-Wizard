// Import lodash
import _ from 'lodash';
import { readFile } from 'fs/promises';
import { json } from "@sveltejs/kit"

export async function GET() {
	console.log('test-lodash function');
	try {
		const latexTemplate = await readFile('src/lib/templates/test_template.tex', 'utf8');
		let variableMap = { name: 'Calvin', phone: '4259855538' };
		_.templateSettings.interpolate = /\@{([\s\S]+?)}/g;
		let compiled = _.template(latexTemplate);
		let compiledTemplate = compiled(variableMap);
		console.log(compiledTemplate);
        return json(compiledTemplate);
	} catch (error) {
		console.error(error);
	}
}
