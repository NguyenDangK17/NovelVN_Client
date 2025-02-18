import React from "react";

const SignupPage: React.FC = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5fb7d836-1124-43d9-937c-f365d9aeaa8b/dhq7vqm-9a9b72c8-0ecd-4410-9f34-f56496711bb9.png/v1/fill/w_1920,h_1080,q_80,strp/changli_wuthering_waves_by_muztnafi_dhq7vqm-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzVmYjdkODM2LTExMjQtNDNkOS05MzdjLWYzNjVkOWFlYWE4YlwvZGhxN3ZxbS05YTliNzJjOC0wZWNkLTQ0MTAtOWYzNC1mNTY0OTY3MTFiYjkucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EIiXXuETBlG4AJwi8A4KFxgWpooSpjjtlaKFeAVsTi0')",
      }}
    >
      <div className="flex items-center justify-center mb-6">
        <img
          className="w-12 h-12 mr-2"
          src="https://mangadex.org/img/brand/mangadex-logo.svg"
          alt="logo"
        />
        <span
          className="text-3xl font-bold text-white hover:cursor-pointer"
          onClick={() => window.location.replace("/")}
        >
          NovelVN
        </span>
      </div>
      <div className="w-full bg-[#212328] max-w-lg shadow border-t-4 border-primary-500">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
            Create your account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-[#3d414a] text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-[#3d414a] text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-[#3d414a] text-white rounded-lg focus:border-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="bg-[#3d414a] text-white rounded-lg focus:border-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
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

export default SignupPage;
