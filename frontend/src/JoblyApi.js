import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, params = {}, verb = "get") {
    // for now, hardcode a token for user "testuser"
    let _token = localStorage.getItem("token")

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

  /** GET request to login route to request an auth token */
  static async authUser({ username, password }) {
    try {
      const res = await this.request(`login`, { username, password }, 'post');
      return res;
    } catch (err) {
      return { errors: err };
    }
  }

  /** GET request to /users/:username with token to request user details */
  static async getUser(username, _token) {
    try {
      const res = await this.request(`users/${username}`, { _token });
      return res.user;
    } catch (err) {
      return { errors: err }
    }
  }

  /** POST request to /users  */
  static async createUser({ username, password, first_name, last_name, email }) {
    try {
      const res = await this.request(`users`, { username, password, first_name, last_name, email }, 'post')
      return res;
    } catch (err) {
      return { errors: err };
    }
  }

  /** PATCH request to /users  */
  static async updateUser({ username, password, first_name, last_name, email }) {
    try {
      const res = await this.request(`users/${username}`, { password, first_name, last_name, email }, 'patch')
      return res;
    } catch (err) {
      return { errors: err };
    }
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

  /** apply for a job by it's id */
  static async applyForJob(id) {
    let res = await this.request(`jobs/${id}/apply`, {}, 'post');
    return res
  }

  /** get list of jobs user has applied to */
  static async getApplications({ username }) {
    let res = await this.request(`users/${username}/jobs-applied-to`);
    return res.jobsAppliedTo;
  }
}

export default JoblyApi;