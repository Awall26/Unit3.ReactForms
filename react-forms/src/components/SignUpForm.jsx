import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    // const regex = new RegExp(
    //   "^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s])$"
    // );
    const regex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    console.log(regex.test(password), password);
    if (!regex.test(password)) {
      setError(
        "Password must be: At least 8 characters long, Contains at least one digit, Contains at least one lowercase letter, Contains at least one uppercase letter, Contains at least one special character, No whitespace allowed"
      );
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();

      console.log(result);

      if (response.ok) {
        setUsername("");
        setPassword("");

        setToken(result.token);
      } else {
        setError(`Would ya look at that. It ain't workin' ${JSON.message}`);
      }
    } catch (error) {
      setError(`Please fill out form`);
    }
  }

  return (
    <section className="signup">
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input className="submit" type="submit" />
      </form>
    </section>
  );
}
