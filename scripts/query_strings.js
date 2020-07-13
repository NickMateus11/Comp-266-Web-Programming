
export function getParameterByName(name) {
    const regex = new RegExp(name + '=(\\w+)'); // Will extract the value from ex: 'name=Value'
    const results = regex.exec(window.location.search);
    if (!results) return null; // Regex failed to match anything
    if (!results[1]) return ''; // The name of the parameter did not exist
    return decodeURIComponent(results[1].replace(/\+/g, ' ')); // Replace '+' with ' '
}