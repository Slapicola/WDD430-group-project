import { registerUser } from "@/app/lib/actions";

export default function RegisterPage() {
  return (
    <form action={registerUser} className="container-default py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

      <input name="name" placeholder="Name" className="input mb-4 w-full" />
      <input name="email" placeholder="Email" className="input mb-4 w-full" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input mb-4 w-full"
      />

      <button className="btn-primary w-full">Create Account</button>
      <div className="mt-6 text-center text-sm text-gray-600">
        <span>Already have an account? </span>
        <a
          href="/login"
          className="font-semibold text-[var(--color-primary)] hover:underline"
        >
          Login
        </a>
      </div>
    </form>
  );
}
