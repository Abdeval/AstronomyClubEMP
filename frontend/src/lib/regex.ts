
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const firstNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;  // Allows letters, accents, spaces, and hyphens
export const lastNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;  // Same as firstNameRegex
export const passwordRegex = /^.{5,}$/;  // Minimum length of 5 characters (allows any characters)
export const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;  // Supports optional country code and 10-digit phone number
