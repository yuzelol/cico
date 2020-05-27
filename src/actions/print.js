const Print = () => {

    let results = document.querySelector('.app-search-view').children
    let formatted = [`<tr style="border: none; height: 42px">
                        <td style="width: 60%; text-align: left">Property</td>
                        <td>Available since</td><td>Complete by</td>
                    </tr>`]

    for (let item of results) {
        const data = Object.assign({}, item.dataset)
        console.log(data.available)
        if(data.available === 'false') break
        if(!data.name) {
            formatted.push('<tr style="height: 24px; border: none"><td colspan="3"></td></tr>')
            continue
        }
        formatted.push(`<tr style="${data.priority === "true" ? 'font-weight: bold' : ''}">
                            <td style="text-align: left">${data.name}</td> 
                            <td>${new Date(data.availablesince).toLocaleString('en-GB').slice(0, 10)}</td>
                            <td>${new Date(data.completeby).toLocaleString('en-GB').slice(0, 10)}</td>
                        </tr>`)
    }

    let printView = window.open('', 'PRINT', `
        width=880,
        height=680,
        top=120,
        left=${window.outerWidth / 2 - (880 / 2)}`
    )

    printView.document.write(`
        <head>
            <style>
                *{
                    font-family: sans-serif;
                }
                @page {
                    margin-top: 0.65cm;
                    margin-bottom: 0.65cm;
                    margin-left: 0.65cm;
                    margin-right: 0.65cm;
                }
                body{
                    padding: 14px;
                }
                table, tr, td {
                    padding: 8px 12px;
                    border: 1px solid black;
                    border-collapse: collapse;
                    font-size: 0.95em;
                }
                table, td {
                    border: none;
                    text-align: right;
                }
            </style>
        </head>
    `);

    printView.document.write(`<body>`);
    printView.document.write(`<h3>${document.querySelector('.app-header-company').innerHTML}</h3>`);
    printView.document.write(`<h2>${document.querySelector('.app-header-location').textContent}</h2>`);
    printView.document.write('<table style="width: 100%">');
    printView.document.write(formatted.join(''))
    printView.document.write('</table>');
    printView.document.write(`</body>`);

    printView.print();
    printView.close();

}

export default Print