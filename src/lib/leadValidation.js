// Shared lead validation — imported by the React forms AND the /api handlers,
// so the rules can never drift between client and server.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strip formatting; drop a leading US country code so "1 (361)..." still counts as 10 digits. */
export function phoneDigits(value) {
    const digits = (value || '').replace(/\D/g, '');
    return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
}

/** Valid NANP number: 10 digits, area code and exchange can't start with 0 or 1. */
export function isValidUSPhone(value) {
    return /^[2-9]\d{2}[2-9]\d{6}$/.test(phoneDigits(value));
}

export function isValidEmail(value) {
    return EMAIL_RE.test((value || '').trim());
}

/** Progressive "(361) 316-5251" formatting for a phone input's onChange. */
export function formatUSPhone(value) {
    const d = phoneDigits(value).slice(0, 10);
    if (d.length === 0) return '';
    if (d.length < 4) return `(${d}`;
    if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** E.164 for CRM delivery, e.g. "+13613165251". Only call on a valid number. */
export function toE164(value) {
    return `+1${phoneDigits(value)}`;
}

/**
 * Validate the fields every lead must have. Returns { name?, email?, phone? }
 * with human-readable messages — empty object means valid.
 */
export function validateLead({ name, email, phone }) {
    const errors = {};
    if ((name || '').trim().length < 2) {
        errors.name = 'Please enter your full name.';
    }
    if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!isValidUSPhone(phone)) {
        errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    return errors;
}
