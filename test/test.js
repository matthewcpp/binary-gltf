import {BinaryGltf} from "/dist/index.js";

function testResult(status, text) {
    const testResultStatus = document.getElementById("test_result_status");
    const testResultText = document.getElementById("test_result_text");

    testResultStatus.innerHTML = status;
    testResultStatus.classList.add(status.toLowerCase());
    testResultText.innerHTML = text;
}

async function testFile() {
    const url = document.getElementById("url").value;

    console.log(url);

    try {
        const response = await fetch(url);

        if (!response.ok)
            testResult("FAILURE", `Error fetching model: ${response.status}`);

        const arrayBuffer = await response.arrayBuffer();

        const binaryGltf = BinaryGltf.parse(arrayBuffer);
        testResult("SUCCESS", "");

        const output = document.getElementById("output");
        output.style.display = "inline-block";

        const textarea = document.getElementById("json");
        textarea.value = JSON.stringify(binaryGltf.json, null, 2);

        const binary = document.getElementById("binary");
        binary.value = `offset: ${binaryGltf.binary.byteOffset}\nlength:${binaryGltf.binary.byteLength}`;

    } catch (e) {
        testResult("FAILURE", e.toString());
    }
}

const loadButton = document.getElementById("load_button");
loadButton.onclick = testFile;