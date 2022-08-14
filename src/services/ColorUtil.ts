export default function isDarkColor(color: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    if (result == null) {
        return false;
    }

    var rgb = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }

    let hsp = Math.sqrt(
        0.299 * (rgb.r * rgb.r) + 
        0.587 * (rgb.g * rgb.g) +
        0.114 * (rgb.b * rgb.b)
    );

    return hsp <= 127.5;
}