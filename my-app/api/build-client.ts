import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from "next";

export default () => {

  return axios.create({
    baseURL: 'http://localhost:7000',
  });
};