import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./Details";
import List from "./List";

function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/:page">
            {" "}
            <Details />
          </Route>
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("followers");
  const [count, setCount] = useState("");

  useEffect(() => {
    const getContributors = async () => {
      const res = await fetch(
        `http://${serverIp}:${PORT}/contributors/sort/${sort}/page/0/limit/30`
      );
      const data = await res.json();
      setItems(data);
    };
    const getCount = async () => {
      const res = await fetch(`http://${serverIp}:${PORT}/contributors/count`);
      const data = await res.json();
      setCount(data);
    };

    getCount();
    getContributors();
  }, [sort]);

  const fetchContributors = async (currentPage, sort) => {
    const res = await fetch(
      `http://${serverIp}:${PORT}/contributors/sort/${sort}/page/${currentPage}/limit/30`
    );
    const data = await res.json();
    setItems(data);
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected;
    fetchContributors(currentPage, sort);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    fetchContributors(0, sort);
  };
  const Home = () => {};
  return (
    <div className="container">
      <div className="row">
        <h2>Angular Repositories Contributors</h2>
      </div>
      <div className="nav w-100">
        <div className="row d-flex justify-content-between w-100">
          <div className="col">
            <strong>Sort People By:</strong>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={handleSort}
            >
              <option value="followers">Followers</option>
              <option value="public_repos">Public Repositories</option>
              <option value="public_gists">Public Gists</option>
            </select>
          </div>
          <div className="col">
            <p>
              Total Number of Contributors:{" "}
              <strong>
                <i>{count}</i>
              </strong>
            </p>
          </div>
        </div>
      </div>

      <List items={items} />

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={count / 30 - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-link"}
        nextClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
