import * as postcssJs from 'postcss-js';
import * as vscode from 'vscode';

import postcss from 'postcss';
import transform from 'css-to-react-native';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		'css-to-rn.convertToRNStyles',
		() => {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			let selection = editor.selection;
			let text: any = editor.document.getText(selection);
			try {
				const output = postcssJs.objectify(postcss.parse(text));
				const result: any = Object.keys(output).map((rules) => [
					rules,
					output[rules],
				]);
				editor.edit((editBuilder) => {
					editBuilder.replace(
						selection,
						JSON.stringify(transform(result), null, 2)
					);
				});
			} catch (e) {
				vscode.window.showErrorMessage('Invalid CSS');
			}
		}
	);
	let disposable2 = vscode.commands.registerCommand(
		'css-to-rn.convertToJSS',
		() => {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			let selection = editor.selection;
			let text: any = editor.document.getText(selection);
			try {
				const output = postcssJs.objectify(postcss.parse(text));
				editor.edit((editBuilder) => {
					editBuilder.replace(selection, JSON.stringify(output, null, 2));
				});
			} catch (e) {
				vscode.window.showErrorMessage('Invalid CSS');
			}
		}
	);
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}
export function deactivate() {}
