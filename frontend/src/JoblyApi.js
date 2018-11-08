import axios from 'axios';

const BASE_URL = "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, params = {}, verb = "get") {
    // for now, hardcode a token for user "testuser"
    let _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
      "3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDE1NjQ2Nzl9.LYDHSkl81gEm" +
      "7jfHv9wJhzD4ndpuBkSzBan8Nirb6UY";

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async authUser({ username, password }) {
    const res = await this.request(`login`, { username, password }, 'post');
    return res;
  }

  static async getUser(username, _token) {
    const res = await this.request(`users/${username}`, { _token });
    return res.user;
  }

  static async createUser({ username, password, first_name, last_name, email }) {
    const res = await this.request(`users`, { username, password, first_name, last_name, email }, 'post')
    return res;
  }

  /** get a list of companies */
  static async getCompanies(search) {
    let res = await this.request(`companies`, { search });
    return res.companies;
  }

  /** get a company by handle */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** get a list of jobs */
  static async getJobs(search) {
    let res = await this.request(`jobs`, { search });
    return res.jobs;
  }

  /** get a specific jobs */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }
}

export default JoblyApi;