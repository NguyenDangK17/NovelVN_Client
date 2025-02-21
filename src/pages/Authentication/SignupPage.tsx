import React, { useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { validateSignupForm } from "../../utils/validation";

const BACKGROUND_IMAGE_URL =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5fb7d836-1124-43d9-937c-f365d9aeaa8b/dhq7vqm-9a9b72c8-0ecd-4410-9f34-f56496711bb9.png/v1/fill/w_1920,h_1080,q_80,strp/changli_wuthering_waves_by_muztnafi_dhq7vqm-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzVmYjdkODM2LTExMjQtNDNkOS05MzdjLWYzNjVkOWFlYWE4YlwvZGhxN3ZxbS05YTliNzJjOC0wZWNkLTQ0MTAtOWYzNC1mNTY0OTY3MTFiYjkucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EIiXXuETBlG4AJwi8A4KFxgWpooSpjjtlaKFeAVsTi0";
const LOGO_URL = "https://mangadex.org/img/brand/mangadex-logo.svg";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { isValid, newErrors } = validateSignupForm({
        username,
        email,
        password,
        confirmPassword,
      });

      if (!isValid) {
        setErrors(newErrors);
        return;
      }

      try {
        const response = await axios.post(`${API_URL}/auth/register`, {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          window.location.replace("/login");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message;

          if (errorMessage.includes("Email")) {
            setErrors((prev) => ({ ...prev, email: errorMessage }));
          } else if (errorMessage.includes("Username")) {
            setErrors((prev) => ({ ...prev, username: errorMessage }));
          }
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Signup failed. Please try again.",
          }));
        }
      }
    },
    [username, email, password, confirmPassword]
  );

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
    >
      <div className="flex items-center justify-center mb-6">
        <img className="w-12 h-12 mr-2" src={LOGO_URL} alt="logo" />
        <span
          className="text-3xl font-bold text-white hover:cursor-pointer"
          onClick={() => window.location.replace("/")}
        >
          NovelVN
        </span>
      </div>

      <div className="w-full bg-[#212328] max-w-lg shadow border-t-4 border-primary-500">
        <div className="space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
            Create your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
            <FormInput
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
              error={errors.username}
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
            />
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              error={errors.confirmPassword}
            />

            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}

            <button
              type="submit"
              className="w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign up
            </button>
            <p className="text-sm font-light text-gray-500 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-white">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className={`bg-[#3d414a] text-white rounded-lg block w-full p-2.5 ${
        error
          ? "border-2 border-red-500"
          : "focus:ring-primary-600 focus:border-primary-600"
      }`}
      value={value}
      onChange={onChange}
      required
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default SignupPage;
