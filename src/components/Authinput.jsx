import React from "react";

function AuthInput({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-200 mb-1"
      >
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
