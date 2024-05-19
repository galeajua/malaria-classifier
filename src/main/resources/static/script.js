let fileToUpload = null

function doFetch(e) {
    e.preventDefault();
    const formData = new FormData()
    for (const name in fileToUpload) {
        formData.append("image", fileToUpload[name]);
    }
    fetch('/api/v1/malariaCellClassifier/getSimpleClassification', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        const {className, probability} = getHighestConfidence(data)
        let formattedPercentage = null
        const percentage = probability * 100
        const percentageString = percentage.toString();
        const decimalIndex = percentageString.indexOf('.');
        if (decimalIndex === -1) {
            console.log(`${percentageString}.00`);
        } else {
            formattedPercentage = percentageString.substring(0, decimalIndex + 3);
        }
        const res = document.createElement('tr')
        res.innerHTML = `
            <td>${className}</td>
            <td class="text-end">${formattedPercentage}%</td>
        `
        const contentTable = document.getElementById('resultTable')
        contentTable.appendChild(res)
        console.log(className, '\n')
        console.log(probability)
    })
}

function getHighestConfidence(data) {
    const max = Math.max(...data.map(val => val['probability']))
    const pair = data.filter(entry => entry['probability'] === max)[0]
    const className = pair['className']
    const probability = pair['probability']
    return {className, probability}
}

function getResult(files) {
    console.log('helloo')
    console.log(files)
    fileToUpload = files

    if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgPreview = document.getElementById('imagePreview');
            const preview = document.getElementById('preview');
            imgPreview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(files[0]);
    }
}


