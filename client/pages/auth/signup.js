import React, { useState } from "react";

import { useRouter } from "next/router";

import useRequest from "../../hooks/use-request";

import Input from "../../components/input";

function Signup() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const Router = useRouter();

  const { executeRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: credentials,
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await executeRequest();

    setCredentials({ email: "", password: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <Input
        label="Email Address"
        value={credentials.email}
        handleChange={(e) =>
          setCredentials({
            ...credentials,
            email: e.target.value,
          })
        }
      />
      <Input
        label="Password"
        value={credentials.password}
        handleChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />

      {errors}
      <button className="btn btn-primary ">
        Sign UP
      </button>
    </form>
  );
}

export default Signup;
