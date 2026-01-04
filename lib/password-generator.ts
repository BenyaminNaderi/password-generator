export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

/**
 * Generates a random password based on the provided options
 * @param options - Password generation options
 * @returns Generated password string
 */
export function generatePassword(options: PasswordOptions): string {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  } = options;

  // Build character set based on options
  let charset = "";
  if (includeUppercase) charset += UPPERCASE;
  if (includeLowercase) charset += LOWERCASE;
  if (includeNumbers) charset += NUMBERS;
  if (includeSymbols) charset += SYMBOLS;

  // Validate that at least one option is selected
  if (charset.length === 0) {
    throw new Error("At least one character type must be selected");
  }

  // Validate length
  if (length < 1 || length > 128) {
    throw new Error("Password length must be between 1 and 128");
  }

  // Generate password using crypto.getRandomValues for better security
  const passwordArray = new Array(length);
  const randomValues = new Uint32Array(length);

  // Use crypto API for secure random generation
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(randomValues);
  } else {
    // Fallback for server-side (less secure, but works)
    for (let i = 0; i < length; i++) {
      randomValues[i] = Math.floor(Math.random() * 0xffffffff);
    }
  }

  // Generate password characters
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charset.length;
    passwordArray[i] = charset[randomIndex];
  }

  return passwordArray.join("");
}

/**
 * Calculates password strength based on length and character variety
 * @param password - Password to evaluate
 * @param options - Options used to generate the password
 * @returns Strength score (0-4: weak, 5-7: medium, 8-10: strong)
 */
export function calculatePasswordStrength(
  password: string,
  options: PasswordOptions
): number {
  let strength = 0;

  // Length contribution (max 4 points)
  if (password.length >= 12) strength += 4;
  else if (password.length >= 8) strength += 2;
  else if (password.length >= 6) strength += 1;

  // Character variety contribution (max 6 points)
  let varietyCount = 0;
  if (options.includeUppercase) varietyCount++;
  if (options.includeLowercase) varietyCount++;
  if (options.includeNumbers) varietyCount++;
  if (options.includeSymbols) varietyCount++;

  strength += varietyCount * 1.5;

  return Math.min(10, Math.round(strength));
}

/**
 * Gets strength label and color based on strength score
 * @param strength - Strength score (0-10)
 * @returns Object with label and color class
 */
export function getStrengthInfo(strength: number): {
  label: string;
  color: string;
} {
  if (strength <= 3) {
    return { label: "Weak", color: "bg-red-500" };
  } else if (strength <= 6) {
    return { label: "Medium", color: "bg-yellow-500" };
  } else {
    return { label: "Strong", color: "bg-green-500" };
  }
}
