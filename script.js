
        // Button functionalities
        document.getElementById("bold").addEventListener("click", () => {
            document.execCommand("bold");
        });

        document.getElementById("italic").addEventListener("click", () => {
            document.execCommand("italic");
        });

        document.getElementById("increase-font").addEventListener("click", () => {
            document.execCommand("increaseFontSize");
        });

        document.getElementById("decrease-font").addEventListener("click", () => {
            document.execCommand("decreaseFontSize");
        });

        document.getElementById("color-picker").addEventListener("input", (e) => {
            document.execCommand("foreColor", false, e.target.value);
        });

        // Add Row
        document.getElementById("add-row").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            const row = table.insertRow(-1);
            const rowIndex = table.rows.length - 1;
            const th = document.createElement("th");
            th.textContent = rowIndex;
            row.appendChild(th);
            for (let i = 1; i < table.rows[0].cells.length; i++) {
                const cell = row.insertCell(i);
                cell.contentEditable = "true";
            }
        });

        // Add Column
        document.getElementById("add-column").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            const headerRow = table.rows[0];
            const colIndex = headerRow.cells.length;
            const th = document.createElement("th");
            th.textContent = String.fromCharCode(64 + colIndex);
            headerRow.appendChild(th);
            for (let i = 1; i < table.rows.length; i++) {
                const cell = table.rows[i].insertCell(-1);
                cell.contentEditable = "true";
            }
        });

        // Delete Row
        document.getElementById("delete-row").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            if (table.rows.length > 2) {
                table.deleteRow(-1);
            }
        });

        // Delete Column
        document.getElementById("delete-column").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            if (table.rows[0].cells.length > 2) {
                for (let i = 0; i < table.rows.length; i++) {
                    table.rows[i].deleteCell(-1);
                }
            }
        });

        // Operations (SUM, SUBTRACT, AVERAGE, COUNT, PRODUCT, MEDIAN)
        document.getElementById("sum").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            let result = 0;
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const value = parseFloat(table.rows[r].cells[c].textContent);
                    if (!isNaN(value)) {
                        result += value;
                    }
                }
            }
            document.getElementById("result-value").textContent = result;
        });

        document.getElementById("subtract").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            let result = 0;
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const value = parseFloat(table.rows[r].cells[c].textContent);
                    if (!isNaN(value)) {
                        result -= value;
                    }
                }
            }
            document.getElementById("result-value").textContent = result;
        });

        document.getElementById("average").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            let total = 0, count = 0;
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const value = parseFloat(table.rows[r].cells[c].textContent);
                    if (!isNaN(value)) {
                        total += value;
                        count++;
                    }
                }
            }
            const average = count > 0 ? total / count : 0;
            document.getElementById("result-value").textContent = average;
        });

        // TRIM
        document.getElementById("trim").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const cell = table.rows[r].cells[c];
                    cell.textContent = cell.textContent.trim();
                }
            }
        });

        // UPPER
        document.getElementById("upper").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const cell = table.rows[r].cells[c];
                    cell.textContent = cell.textContent.toUpperCase();
                }
            }
        });

        // LOWER
        document.getElementById("lower").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const cell = table.rows[r].cells[c];
                    cell.textContent = cell.textContent.toLowerCase();
                }
            }
        });

        // REMOVE DUPLICATES
        document.getElementById("remove-duplicates").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            const seen = new Set();
            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const cell = table.rows[r].cells[c];
                    if (seen.has(cell.textContent.trim())) {
                        cell.textContent = "";
                    } else {
                        seen.add(cell.textContent.trim());
                    }
                }
            }
        });

        // FIND & REPLACE
        document.getElementById("find-replace").addEventListener("click", () => {
            const findValue = prompt("Enter value to find:");
            const replaceValue = prompt("Enter value to replace with:");
            const table = document.getElementById("spreadsheet");

            for (let r = 1; r < table.rows.length; r++) {
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    const cell = table.rows[r].cells[c];
                    if (cell.textContent.includes(findValue)) {
                        cell.textContent = cell.textContent.replace(new RegExp(findValue, 'g'), replaceValue);
                    }
                }
            }
        });

        // Save Spreadsheet as JSON
        document.getElementById("save").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            const data = [];
            for (let r = 1; r < table.rows.length; r++) {
                const row = [];
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    row.push(table.rows[r].cells[c].textContent.trim());
                }
                data.push(row);
            }
            const json = JSON.stringify(data);
            const blob = new Blob([json], { type: 'application/json' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "spreadsheet.json";
            link.click();
        });

        // Load Spreadsheet from JSON
        document.getElementById("load").addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";
            input.addEventListener("change", (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const data = JSON.parse(e.target.result);
                        const table = document.getElementById("spreadsheet");
                        while (table.rows.length > 1) {
                            table.deleteRow(1);
                        }
                        data.forEach((rowData, rowIndex) => {
                            const row = table.insertRow(-1);
                            rowData.forEach((cellData, cellIndex) => {
                                const cell = row.insertCell(cellIndex);
                                cell.textContent = cellData;
                                cell.contentEditable = "true";
                            });
                        });
                    };
                    reader.readAsText(file);
                }
            });
            input.click();
        });

        // Create Chart
        document.getElementById("create-chart").addEventListener("click", () => {
            const table = document.getElementById("spreadsheet");
            const labels = [];
            const data = [];
            for (let c = 1; c < table.rows[0].cells.length; c++) {
                labels.push(table.rows[0].cells[c].textContent);
            }
            for (let r = 1; r < table.rows.length; r++) {
                const columnData = [];
                for (let c = 1; c < table.rows[r].cells.length; c++) {
                    columnData.push(parseFloat(table.rows[r].cells[c].textContent) || 0);
                }
                data.push(columnData);
            }

            const chartData = {
                labels: labels,
                datasets: data.map((dataSet, index) => ({
                    label: labels[index],
                    data: dataSet,
                    borderColor: `hsl(${(index * 100) % 360}, 100%, 50%)`,
                    fill: false
                }))
            };

            const ctx = document.getElementById("chart").getContext("2d");
            new Chart(ctx, {
                type: 'line',
                data: chartData
            });
        });
    