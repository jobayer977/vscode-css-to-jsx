import * as postcssJs from 'postcss-js';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import postcss from 'postcss';
import transform from 'css-to-react-native';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		'css-to-jsx.convertToRNStyles',
		() => {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; // No open text editor
			}
			// Get the selected text
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
	// convert to convertToJSS
	let disposable2 = vscode.commands.registerCommand(
		'css-to-jsx.convertToJSS',
		() => {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; // No open text editor
			}
			// Get the selected text
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
// this method is called when your extension is deactivated
export function deactivate() {}
