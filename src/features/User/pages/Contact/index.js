import Icons from "../../../../components/Icons";
import "./Contact.scss";
function Contact(params) {
  return (
    <div className="contact">
      <div className="untree_co-section">
        <div className="container">
          <div className="block">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-8 pb-4">
                

                <form>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label className="text-black" for="fname">
                          First name
                        </label>
                        <input type="text" className="form-control" id="fname" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="text-black" for="lname">
                          Last name
                        </label>
                        <input type="text" className="form-control" id="lname" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-black" for="email">
                      Email address
                    </label>
                    <input type="email" className="form-control" id="email" />
                  </div>

                  <div className="form-group mb-5">
                    <label className="text-black" for="message">
                      Message
                    </label>
                    <textarea
                      name=""
                      className="form-control"
                      id="message"
                      cols="30"
                      rows="5"
                    ></textarea>
                  </div>

                  <button className="btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
