/* eslint-disable react/prop-types */
// Placeholder for custom components
// Add any reusable UI components here

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
