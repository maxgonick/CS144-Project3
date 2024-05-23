function hexToBrightness(hex) {
    // Remove the leading '#' if present
    hex = hex.replace('#', '');
  
    // Convert the hexadecimal string to RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate the brightness using the formula:
    // Brightness = (0.2126 * R + 0.7152 * G + 0.0722 * B) / 255
    const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    if (typeof brightness == NaN) return 1;
    return brightness;
  }

module.exports = hexToBrightness;