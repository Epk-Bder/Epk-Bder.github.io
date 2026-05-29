const button = document.getElementById("convert")
const code = document.getElementById("output")
const copy = document.getElementById("copy")
const textarea = document.getElementById("entry")

function fixScript(text) {

    const ret = text

        .split(/\r?\n/)
        .map(line => line.split('--')[0])
        .filter(line => line.trim())

        .map(line => {
            const trimmedLine = line.trim();

            const hasFunctionDef = trimmedLine.includes("function ");
            const hasFunctionCon = trimmedLine.includes("function(");
            const hasElse = trimmedLine.includes("else");
            const hasWhile = trimmedLine.includes("while");
            const hasThen = trimmedLine.endsWith("then");


            if (hasFunctionDef || hasThen || hasFunctionCon || hasElse || hasWhile) {
                return line;
            }

            return line + ";";
        })
        .join("\n");

    return ret
}

button.onclick = () => {
    const text = entry.value

    const res = fixScript(text)

    code.textContent = res
}

copy.onclick = () => {
    const text = code.textContent;

    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}


