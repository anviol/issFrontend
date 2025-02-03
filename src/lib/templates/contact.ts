export function createTemplate(data: Record<string, unknown>) {
	const styles = `
        <style>
			* {
				font-size: 16px;
			}
            .table {
                border-collapse: collapse;
            }
            .cell {
				padding: 4px 8px 4px 0;
            }
        </style>
    `;

	let html = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Contact Form Submission</title> ${styles} </head> <body> <table class="table"> `;

	Object.keys(data).map((key) => {
		const value = data[key];
		html += `<tr><td class="cell"><strong>${key}:</strong></td><td class="cell">${value}</td></tr>`;
	});

	html += `</table></body></html>`;
	return html;
}
