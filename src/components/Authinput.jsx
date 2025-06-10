import React from 'react';

/**
 * AuthInput component for styled input fields used in authentication forms.
 *
 * @param {object} props - Component props.
 * @param {string} props.id - Unique ID for the input and label.
 * @param {string} props.label - Text for the input label.
 * @param {string} props.type - HTML input type (e.g., 'text', 'email', 'password').
 * @param {string} props.placeholder - Placeholder text for the input.
 * @param {string} props.value - Current value of the input.
 * @param {function} props.onChange - Handler for input value changes.
 * @param {React.ReactNode} [props.icon] - Optional icon to display next to the label.
 * @param {boolean} [props.required=false] - HTML required attribute.
 */
function AuthInput({id, label, type, placeholder, value, onChange, icon, required = false}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
                {icon}
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30
                           focus:border-pink-400 focus:ring-pink-400 text-white
                           placeholder-gray-300 text-sm transition duration-300 ease-in-out
                           input-focus-glow" // Custom class for glow effect
                placeholder={placeholder}
            />
        </div>
    );
}

export default AuthInput;