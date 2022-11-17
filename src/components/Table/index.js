import "./Table.scss";

function Table(params) {
  return (
    <div class="table-common container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Deshmukh</td>
                      <td>Prohaska</td>
                      <td>@Genelia</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Deshmukh</td>
                      <td>Gaylord</td>
                      <td>@Ritesh</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sanghani</td>
                      <td>Gusikowski</td>
                      <td>@Govinda</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Roshan</td>
                      <td>Rogahn</td>
                      <td>@Hritik</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Joshi</td>
                      <td>Hickle</td>
                      <td>@Maruti</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Nigam</td>
                      <td>Eichmann</td>
                      <td>@Sonu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
