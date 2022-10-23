
//function to format data with respect to the dataType and decimal places specified in metric definition
export function dataFormating(value, metricDefinition) {
    let formatedData = "";
    switch (metricDefinition.dataType) {
        case "Money":
            formatedData = `$${value.toFixed(metricDefinition.decimalPlaces)}`
            break;
        case "Percent":
            formatedData = `${(value * 100).toFixed(metricDefinition.decimalPlaces)}%`
            break;
        case "Number":
            formatedData = value.toFixed(metricDefinition.decimalPlaces)
            break;

        default:
            break;
    }

    return formatedData;
}

//function to post request and get data in return according to the search parameters specified in request body.
export async function postRequest(url, requestBody) {
    const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    return response.json()

}

//method to fetch the metric definitions from the API
export async function getData(url) {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache"
    });
    return response.json();
}