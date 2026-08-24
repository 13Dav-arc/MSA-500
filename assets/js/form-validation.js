/**
 * MindStormer Global Academy (MSA-500)
 * Accessible Interactive Client-Side Form Validation Engine
 * WCAG 2.1 AA Compliant (Dynamic ARIA, Live Announcements, Password Checklists)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MSAFormValidation = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const PasswordRules = {
    length: (val) => typeof val === 'string' && val.length >= 8,
    upper: (val) => typeof val === 'string' && /[A-Z]/.test(val),
    num: (val) => typeof val === 'string' && /[0-9]/.test(val),
    spec: (val) => typeof val === 'string' && /[*,-,#,@,!,$,%,&_+=<>?/{}\[\]~^]/.test(val)
  };

  function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  function validatePassword(password) {
    const val = password || '';
    const length = PasswordRules.length(val);
    const upper = PasswordRules.upper(val);
    const num = PasswordRules.num(val);
    const spec = PasswordRules.spec(val);

    return {
      isValid: length && upper && num && spec,
      rules: { length, upper, num, spec }
    };
  }

  function validateRequired(val) {
    return typeof val === 'string' && val.trim().length > 0;
  }

  function validateField(input) {
    if (!input) return { valid: true, error: '' };

    const type = input.getAttribute('type') || input.tagName.toLowerCase();
    const val = input.value || '';
    const isRequired = input.hasAttribute('required') || input.getAttribute('aria-required') === 'true';

    if (isRequired && !validateRequired(val)) {
      const fieldName = getFieldLabel(input);
      return { valid: false, error: `${fieldName} is required.` };
    }

    if (val.trim().length > 0) {
      if (type === 'email' || input.name === 'email') {
        if (!validateEmail(val)) {
          return { valid: false, error: 'Please enter a valid email address (e.g. user@domain.com).' };
        }
      }

      if (type === 'password' && input.getAttribute('data-validate-strength') !== 'false') {
        const result = validatePassword(val);
        if (!result.isValid && input.hasAttribute('data-enforce-rules')) {
          return { valid: false, error: 'Password does not meet all security requirements.' };
        }
      }
    }

    return { valid: true, error: '' };
  }

  function getFieldLabel(input) {
    if (!input) return 'This field';
    const id = input.id;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label && label.textContent) {
        return label.textContent.replace(/[*:]/g, '').trim();
      }
    }
    const ariaLabel = input.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;
    const placeholder = input.getAttribute('placeholder');
    if (placeholder) return placeholder;
    return input.name || 'This field';
  }

  function updateFieldAriaState(input, isValid, errorMessage) {
    if (!input) return;

    input.setAttribute('aria-invalid', isValid ? 'false' : 'true');

    let errorEl = document.getElementById(`${input.id || input.name}-error`);
    if (!isValid && errorMessage) {
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.id = `${input.id || input.name}-error`;
        errorEl.className = 'msa-field-error text-xs font-bold text-red-600 mt-1 flex items-center gap-1.5 transition-all';
        errorEl.setAttribute('role', 'alert');
        errorEl.setAttribute('aria-live', 'polite');
        input.parentNode.appendChild(errorEl);
      }
      errorEl.innerHTML = `<span aria-hidden="true">⚠️</span> <span>${errorMessage}</span>`;
      input.setAttribute('aria-describedby', errorEl.id);
      input.classList.add('border-red-500', 'focus:border-red-600');
      input.classList.remove('border-emerald-500', 'border-blue-500');
    } else {
      if (errorEl) {
        errorEl.remove();
      }
      input.removeAttribute('aria-describedby');
      input.classList.remove('border-red-500', 'focus:border-red-600');
    }
  }

  function announceToScreenReader(message, priority = 'polite') {
    if (typeof document === 'undefined') return;
    let announcer = document.getElementById('msa-live-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'msa-live-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }

  function updatePasswordChecklist(input, checklistContainer) {
    if (!input || !checklistContainer) return;
    const val = input.value || '';
    const res = validatePassword(val);

    const ruleElements = {
      length: checklistContainer.querySelector('#rule-length'),
      upper: checklistContainer.querySelector('#rule-upper'),
      num: checklistContainer.querySelector('#rule-num'),
      spec: checklistContainer.querySelector('#rule-spec')
    };

    let allPassed = true;
    for (const [key, passed] of Object.entries(res.rules)) {
      const el = ruleElements[key];
      if (!el) continue;
      if (!passed) allPassed = false;

      const icon = el.querySelector('.status-icon') || el.querySelector('span');
      if (passed) {
        el.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-300 transition-colors';
        if (icon) icon.textContent = '✓';
      } else {
        el.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold border border-slate-200 transition-colors';
        if (icon) icon.textContent = '○';
      }
    }

    if (val.length > 0 && allPassed) {
      announceToScreenReader('All password security requirements have been met.', 'polite');
    }
  }

  function initFormValidation(formSelector = 'form') {
    if (typeof document === 'undefined') return;

    const forms = document.querySelectorAll(formSelector);
    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, select, textarea');

      inputs.forEach((input) => {
        if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') return;

        input.addEventListener('blur', () => {
          const res = validateField(input);
          updateFieldAriaState(input, res.valid, res.error);
        });

        input.addEventListener('input', () => {
          if (input.getAttribute('aria-invalid') === 'true') {
            const res = validateField(input);
            if (res.valid) {
              updateFieldAriaState(input, true, '');
            }
          }
        });

        if (input.type === 'password') {
          const checklist = form.querySelector('[role="region"][aria-label*="Password"], #password-rules, #guardian-password-rules');
          if (checklist) {
            input.addEventListener('input', () => {
              updatePasswordChecklist(input, checklist);
            });
          }
        }
      });

      form.addEventListener('submit', (e) => {
        let firstInvalid = null;
        let invalidCount = 0;

        inputs.forEach((input) => {
          if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') return;
          const res = validateField(input);
          updateFieldAriaState(input, res.valid, res.error);

          if (!res.valid) {
            invalidCount++;
            if (!firstInvalid) firstInvalid = input;
          }
        });

        if (invalidCount > 0) {
          e.preventDefault();
          e.stopPropagation();
          const announcement = `Please correct ${invalidCount} ${invalidCount === 1 ? 'error' : 'errors'} on this form before proceeding.`;
          announceToScreenReader(announcement, 'assertive');

          if (firstInvalid) {
            firstInvalid.focus();
          }
          return false;
        }
      });
    });

    const toggleBtns = document.querySelectorAll('[data-toggle-password]');
    toggleBtns.forEach((btn) => {
      if (btn.dataset.initialized) return;
      btn.dataset.initialized = 'true';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-toggle-password');
        const input = document.getElementById(targetId) || document.querySelector(`input[name="${targetId}"]`);
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
          btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
          btn.classList.toggle('text-blue-600', isPassword && btn.closest('.msa-login-card, #signup'));
          btn.classList.toggle('text-emerald-600', isPassword && btn.closest('.msa-parent-card, [action*="parent"]'));
          
          // Swap SVG between Eye and Eye-Slash
          if (isPassword) {
            btn.innerHTML = `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            `;
          } else {
            btn.innerHTML = `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            `;
          }

          announceToScreenReader(isPassword ? 'Password text visible' : 'Password hidden', 'polite');
        }
      });
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initFormValidation());
    } else {
      initFormValidation();
    }
  }

  return {
    PasswordRules,
    validateEmail,
    validatePassword,
    validateRequired,
    validateField,
    updateFieldAriaState,
    updatePasswordChecklist,
    initFormValidation,
    announceToScreenReader
  };
}));
