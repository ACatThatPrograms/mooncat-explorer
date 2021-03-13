export function copyToClipboard(text) {
    let textElement = document.createElement("input")
    textElement.value = text
    document.body.append(textElement)
    textElement.select()
    document.execCommand("copy")
    textElement.remove()
}