import { Link } from "react-router-dom";

const List = ({ items }) => {
  return (
    <div className="row m-2">
      {items.map((item) => {
        const name = item.repos_url.split("/")[4];
        return (
          <div key={item._id} class="col-lg-3 col-md-6 mb-4 mb-lg-5">
            <div class="card rounded shadow-sm border-0">
              <div class="card-body p-0">
                <Link to={name}>
                  <div class="bg-info px-5 py-4 text-center card-img-top">
                    <img
                      src={item.avatar_url}
                      width="100"
                      class="rounded-circle mb-2 img-thumbnail d-block mx-auto"
                    />

                    <h5 class="text-white mb-0">{item.name}</h5>
                  </div>
                </Link>
                <div class="p-4 d-flex justify-content-center">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <h5 class="font-weight-bold mb-0 d-block">
                        {item.followers}
                      </h5>
                      <small class="text-muted">
                        <i class="fa fa-picture-o mr-1 text-info"></i>
                        Followers
                      </small>
                    </li>
                    <li class="list-inline-item">
                      <h5 class="font-weight-bold mb-0 d-block">
                        {item.public_repos}
                      </h5>
                      <small class="text-muted">
                        <i class="fa fa-user-circle-o mr-1 text-info"></i>
                        Repos
                      </small>
                    </li>
                    <li class="list-inline-item">
                      <h5 class="font-weight-bold mb-0 d-block">
                        {item.public_gists}
                      </h5>
                      <small class="text-muted">
                        <i class="fa fa-picture-o mr-1 text-info"></i>Gists
                      </small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
