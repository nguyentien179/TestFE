// src/components/AuthInput.jsx
export default function AuthInput({ label, type, value, onChange, name }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
