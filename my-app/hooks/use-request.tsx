import axios, { AxiosInstance } from 'axios';
import { useState } from 'react';
import { Methods } from '../types/request.type'

interface RequestOptions {
  url: string;
  method: Methods;
  body?: object;
  onSuccess?: (data: any) => void;
  onClose?: () => void;
}

interface ErrorResponse {
  message: string;
}

export default function useRequest({
  url,
  method,
  body,
  onSuccess,
  onClose
}: RequestOptions) {
  const [errors, setErrors] = useState<JSX.Element | null>(null);
  const baseURL = 'http://localhost:7000';

  const doRequest = async (props: object = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](baseURL + url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
        if (onClose) {
          onClose();
        }
      }

      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data.errors) {
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {err.response.data.errors.map((error: ErrorResponse, index: number) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              <li>{err.message}</li>
            </ul>
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
}