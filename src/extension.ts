import * as vscode from "vscode";

const blockElements = new Set([
	"address",
	"article",
	"aside",
	"blockquote",
	"canvas",
	"dd",
	"div",
	"dl",
	"dt",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hr",
	"li",
	"main",
	"nav",
	"ol",
	"p",
	"pre",
	"section",
	"table",
	"tfoot",
	"ul",
	"video",
]);

const inlineElements = new Set([
	"a",
	"abbr",
	"acronym",
	"b",
	"bdo",
	"big",
	"br",
	"button",
	"cite",
	"code",
	"dfn",
	"em",
	"i",
	"img",
	"input",
	"kbd",
	"label",
	"mark",
	"q",
	"samp",
	"script",
	"select",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"textarea",
	"time",
	"u",
	"var",
]);

export function activate(context: vscode.ExtensionContext) {
	// Listener para detectar cambios en la selección del editor
	const disposable = vscode.window.onDidChangeTextEditorSelection((event) => {
		const editor = vscode.window.activeTextEditor;

		if (!editor || editor.document.languageId !== "html") {
			return;
		}

		const document = editor.document;
		const selection = editor.selection;
		const selectedText = document.getText(selection).trim();

		if (!selectedText) {
			return;
		}
		// Verificar si el texto seleccionado es una etiqueta HTML
		const tag = selectedText.replace(/[<>/]/g, ""); // Limpiar <, >, /

		if (!tag) {
			return;
		}

		let elementType = "";
		if (blockElements.has(tag)) {
			elementType = "Block-level element";
		} else if (inlineElements.has(tag)) {
			elementType = "Inline-level element";
		}

		if (elementType) {
			vscode.window.showInformationMessage(`${tag.toUpperCase()} is a ${elementType}.`);
		}
		// Agregar el disposable correctamente al contexto de suscripciones
		context.subscriptions.push(disposable);
	});
}

export function deactivate() {}
