import { configure } from "axios-hooks";
import LRU from "lru-cache";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://fakestoreapi.com",
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });
