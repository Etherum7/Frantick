import axios from "axios";

import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}) => {
  const [errors, setErrors] = useState(null);

  const executeRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      const errors = err.response.data.errors;
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {errors.map((error) => (
              <li key={uuidv4()}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { executeRequest, errors };
};

export default useRequest;
