import React, { useState } from "react";

import Input from "../../components/input";

import { useRouter } from "next/router";
import useRequest from "../../hooks/use-request";

function SignIn() {
  const Router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { executeRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: credentials,
    onSuccess: () => Router.push("/"),
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await executeRequest();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
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
      <button className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
}

export default SignIn;
