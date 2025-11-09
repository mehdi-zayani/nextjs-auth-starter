export default function HomePage() {
  return (
    <div className="max-w-xl w-full text-center space-y-6">
      <h1 className="text-5xl font-extrabold tracking-tight">Welcome to NextJS Auth Starter</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        A clean, minimal starter with TailwindCSS, dark mode, and ready for authentication.
      </p>
      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
        Get Started
      </button>
    </div>
  );
}
