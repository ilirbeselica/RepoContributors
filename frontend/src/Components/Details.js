import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./details.css";

const Details = () => {
  const location = useLocation();
  const name = location.pathname.replace("/", "");
  const [details, setDetails] = useState({});
  const [repos, setRepos] = useState([]);

  const getDetails = async () => {
    const res = await fetch(
      `http://${serverIp}:${PORT}/contributors/getUserData/${name}/`
    );
    const data = await res.json();
    setDetails(data);
  };

  const getRepos = async () => {
    const res = await fetch(
      `http://${serverIp}:${PORT}/contributors/getUserRepos/${name}/`
    );
    const data = await res.json();
    setRepos(data);
  };

  useEffect(() => {
    getDetails();
    getRepos();
  }, []);

  return (
    <div class="container d-flex justify-content-center align-items-center">
      <div class="card">
        <div class="upper">
          <img
            src="https://i.imgur.com/Qtrsrk5.jpg"
            class="img-fluid"
            width="100%"
          />{" "}
        </div>
        <div class="user text-center">
          <div class="profile">
            <img src={details.avatar_url} class="rounded-circle" width="80" />
          </div>
        </div>
        <div class="mt-5 text-center">
          <h4 class="mb-0">{details.name}</h4>
          <span class="text-muted d-block mb-2">{details.location}</span>{" "}
          <a
            href={details.html_url}
            class="btn btn-secondary btn-lg active"
            role="button"
            aria-pressed="true"
          >
            Visit Profile
          </a>
          <div class="d-flex justify-content-between align-items-center mt-4 px-4">
            <div class="list-group">
              <h3>List of Repositories</h3>
              {repos.map((item) => {
                return (
                  <a
                    href={item.html_url}
                    class="list-group-item list-group-item-action"
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
